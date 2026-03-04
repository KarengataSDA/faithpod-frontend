import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Role } from 'src/app/shared/models/role';
import { CacheService } from './cache.service';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);
  private tenantService = inject(TenantService);

  get baseUrl(): string {
    return this.tenantService.getApiUrl();
  }

  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes

  private get tenantPrefix(): string {
    return this.tenantService.getTenantFromSubdomain() || 'default';
  }

  private get CACHE_KEY(): string {
    return `${this.tenantPrefix}_roles`;
  }

  getAll(forceRefresh: boolean = false): Observable<Role[]> {
    if (forceRefresh) {
      this.invalidateCache();
    }

    return this.cacheService.get(
      this.CACHE_KEY,
      this.http.get<Role[] | { data: Role[] }>(this.baseUrl + '/roles').pipe(
        map(response => Array.isArray(response) ? response : (response as any)?.data || [])
      ),
      this.CACHE_TTL,
      true
    );
  }

  get(id: number, forceRefresh: boolean = false): Observable<Role> {
    const cacheKey = `${this.CACHE_KEY}_${id}`;

    if (forceRefresh) {
      this.cacheService.clear(cacheKey);
    }

    return this.cacheService.get(
      cacheKey,
      this.http.get<Role | { data: Role }>(this.baseUrl + '/roles/' + id).pipe(
        map(response => (response as any)?.data || response)
      ),
      this.CACHE_TTL,
      true
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

  private invalidateCache(): void {
    this.cacheService.clearPattern(new RegExp(`^${this.CACHE_KEY}`));
  }
}
