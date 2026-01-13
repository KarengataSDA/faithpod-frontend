import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Role } from 'src/app/shared/models/role';
import { CacheService } from './cache.service';
import { LocalStorageService } from './local-storage.service';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);
  private localStorageService = inject(LocalStorageService);
  private tenantService = inject(TenantService);

  /**
   * Get dynamic base URL from tenant service
   */
  get baseUrl(): string {
    return this.tenantService.getApiUrl();
  }
  private readonly CACHE_KEY = 'roles';
  private readonly STORAGE_KEY = 'roles';
  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes for reference data

  getAll(forceRefresh: boolean = false): Observable<Role[]> {
    // If forceRefresh is true, skip cache and fetch from server
    if (forceRefresh) {
      this.invalidateCache();
    }

    // Try localStorage first for reference data (skip if forceRefresh)
    if (!forceRefresh) {
      const cached = this.localStorageService.get<Role[]>(this.STORAGE_KEY);
      if (cached && Array.isArray(cached)) {
        return new Observable(observer => {
          observer.next(cached);
          observer.complete();
        });
      }
    }

    // Use service-level cache with localStorage backup
    return this.cacheService.get(
      this.CACHE_KEY,
      this.http.get<Role[] | { data: Role[] }>(this.baseUrl + '/roles').pipe(
        tap(response => {
          const data = Array.isArray(response) ? response : (response as any)?.data || [];
          this.localStorageService.set(this.STORAGE_KEY, data, { ttl: this.CACHE_TTL });
        }),
        map(response => Array.isArray(response) ? response : (response as any)?.data || [])
      ),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  get(id: number, forceRefresh: boolean = false): Observable<Role> {
    const cacheKey = `${this.CACHE_KEY}_${id}`;

    // If forceRefresh is true, clear this specific role's cache
    if (forceRefresh) {
      this.cacheService.clear(cacheKey);
    }

    return this.cacheService.get(
      cacheKey,
      this.http.get<Role | { data: Role }>(this.baseUrl + '/roles/' + id).pipe(
        map(response => (response as any)?.data || response)
      ),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  create(data): Observable<Role> {
    return this.http.post<Role>(this.baseUrl + '/roles', data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  update(id: number, data): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/roles/${id}`, data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  /**
   * Assign permissions to a role (permissions only, no name update)
   */
  assignPermissions(id: number, permissions: number[]): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/roles/${id}/permissions`, { permissions }).pipe(
      tap(() => this.invalidateCache())
    );
  }

  delete(id: number) {
    return this.http.delete<Role>(this.baseUrl + '/roles/' + id).pipe(
      tap(() => this.invalidateCache())
    );
  }

  /**
   * Clear all role-related cache after mutations
   */
  private invalidateCache(): void {
    // Pattern matches both "roles" and "roles_<id>" after optional tenant prefix
    // Examples: "roles", "roles_6", "tenant123_roles", "tenant123_roles_6"
    this.cacheService.clearPattern(new RegExp(`_?${this.CACHE_KEY}(_\\d+)?$`));
    this.localStorageService.remove(this.STORAGE_KEY);
  }
}
