import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContributionCategory } from 'src/app/shared/models/collection';
import { CacheService } from './cache.service';
import { LocalStorageService } from './local-storage.service';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root',
})
export class ContributionCategoryService {
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
  private readonly CACHE_KEY = 'contribution_categories';
  private readonly STORAGE_KEY = 'contribution_categories';
  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes for reference data

  getAll(): Observable<ContributionCategory[]> {
    // Try localStorage first for reference data
    const cached = this.localStorageService.get<ContributionCategory[]>(this.STORAGE_KEY);
    if (cached) {
      return new Observable(observer => {
        observer.next(cached);
        observer.complete();
      });
    }

    return this.cacheService.get(
      this.CACHE_KEY,
      this.http.get<ContributionCategory[]>(this.baseUrl + '/contribution-types').pipe(
        tap(data => this.localStorageService.set(this.STORAGE_KEY, data, { ttl: this.CACHE_TTL }))
      ),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  create(data): Observable<ContributionCategory> {
    return this.http.post<ContributionCategory>(this.baseUrl + '/contribution-types', data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  find(id: number): Observable<ContributionCategory> {
    const cacheKey = `${this.CACHE_KEY}_${id}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get<ContributionCategory>(`${this.baseUrl}/contribution-types/${id}/contributions`),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  update(id: number, data): Observable<ContributionCategory> {
    return this.http.put<ContributionCategory>(
      `${this.baseUrl}/contribution-types/${id}`,
      data
    ).pipe(
      tap(() => this.invalidateCache())
    );
  }

  delete(id: number) {
    return this.http.delete<ContributionCategory>(
      `${this.baseUrl}/contribution-types/` + id
    ).pipe(
      tap(() => this.invalidateCache())
    );
  }

  chart(id: number): Observable<any> {
    const cacheKey = `${this.CACHE_KEY}_chart_${id}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get(`${this.baseUrl}/contribution-types/${id}/chart`),
      this.CACHE_TTL,
      true // Use shareReplay for dashboard chart data
    );
  }

  categoriesChart(): Observable<any> {
    const cacheKey = `${this.CACHE_KEY}_all_chart`;
    return this.cacheService.get(
      cacheKey,
      this.http.get(`${this.baseUrl}/contribution-types-chart`),
      this.CACHE_TTL,
      true // Use shareReplay for dashboard chart data
    );
  }

  private invalidateCache(): void {
    this.cacheService.clearPattern(new RegExp(`^${this.CACHE_KEY}`));
    this.localStorageService.remove(this.STORAGE_KEY);
  }
}
