import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  private readonly CACHE_KEY = 'membership_types';
  private readonly CACHE_KEY_COUNT = 'membership_count';
  private readonly STORAGE_KEY = 'membership_types';
  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes for reference data

  getAll(): Observable<Membership[]> {
    // Try localStorage first for reference data
    const cached = this.localStorageService.get<Membership[]>(this.STORAGE_KEY);
    if (cached) {
      return new Observable(observer => {
        observer.next(cached);
        observer.complete();
      });
    }

    return this.cacheService.get(
      this.CACHE_KEY,
      this.http.get<Membership[]>(this.baseUrl + '/membershiptype').pipe(
        tap(data => this.localStorageService.set(this.STORAGE_KEY, data, { ttl: this.CACHE_TTL }))
      ),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  find(id: number): Observable<Membership> {
    const cacheKey = `${this.CACHE_KEY}_${id}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get<Membership>(this.baseUrl + '/membershiptype/' + id),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  membershipCount(): Observable<any> {
    return this.cacheService.get(
      this.CACHE_KEY_COUNT,
      this.http.get<any>(this.baseUrl + '/membership-count'),
      this.CACHE_TTL,
      true // Use shareReplay for dashboard data
    );
  }
}
