import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Membership } from 'src/app/shared/models/membership';
import { CacheService } from './cache.service';
import { LocalStorageService } from './local-storage.service';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipTypeService {
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
  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes for reference data

  private get tenantPrefix(): string {
    return this.tenantService.getTenantFromSubdomain() || 'default';
  }

  private get CACHE_KEY(): string {
    return `${this.tenantPrefix}_membership_types`;
  }

  private get CACHE_KEY_COUNT(): string {
    return `${this.tenantPrefix}_membership_count`;
  }

  private get STORAGE_KEY(): string {
    return `${this.tenantPrefix}_membership_types`;
  }

  getAll(): Observable<Membership[]> {
    // Try localStorage first for reference data (skip if empty array — may be stale)
    const cached = this.localStorageService.get<Membership[]>(this.STORAGE_KEY);
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return new Observable(observer => {
        observer.next(cached);
        observer.complete();
      });
    }

    return this.cacheService.get(
      this.CACHE_KEY,
      this.http.get<Membership[] | { data: Membership[] }>(this.baseUrl + '/membership-types').pipe(
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

  find(id: number): Observable<Membership> {
    const cacheKey = `${this.CACHE_KEY}_${id}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get<Membership>(this.baseUrl + '/membership-types/' + id),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  membershipCount(): Observable<any> {
    // Clear cache to ensure fresh data
    this.cacheService.clear(this.CACHE_KEY_COUNT);
    return this.http.get<any>(this.baseUrl + '/membership-count');
  }
}
