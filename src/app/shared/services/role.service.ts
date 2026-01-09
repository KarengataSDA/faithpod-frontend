import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Role } from 'src/app/shared/models/role';
import { environment } from 'src/environments/environment';
import { CacheService } from './cache.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);
  private localStorageService = inject(LocalStorageService);

  baseUrl = environment.apiUrl;
  private readonly CACHE_KEY = 'roles';
  private readonly STORAGE_KEY = 'roles';
  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes for reference data

  getAll(): Observable<Role[]> {
    // Try localStorage first for reference data
    const cached = this.localStorageService.get<Role[]>(this.STORAGE_KEY);
    if (cached) {
      return new Observable(observer => {
        observer.next(cached);
        observer.complete();
      });
    }

    // Use service-level cache with localStorage backup
    return this.cacheService.get(
      this.CACHE_KEY,
      this.http.get<Role[]>(this.baseUrl + '/roles').pipe(
        tap(data => this.localStorageService.set(this.STORAGE_KEY, data, { ttl: this.CACHE_TTL }))
      ),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  get(id: number): Observable<Role> {
    const cacheKey = `${this.CACHE_KEY}_${id}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get<Role>(this.baseUrl + '/roles/' + id),
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
    return this.http.put<Role>(this.baseUrl + '/roles/' + id, data).pipe(
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
    this.cacheService.clearPattern(new RegExp(`^${this.CACHE_KEY}`));
    this.localStorageService.remove(this.STORAGE_KEY);
  }
}
