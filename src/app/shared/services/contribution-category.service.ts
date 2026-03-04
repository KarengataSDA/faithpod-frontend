import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContributionCategory } from 'src/app/shared/models/collection';
import { CacheService } from './cache.service';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root',
})
export class ContributionCategoryService {
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
    return `${this.tenantPrefix}_contribution_categories`;
  }

  getAll(): Observable<ContributionCategory[]> {
    return this.cacheService.get(
      this.CACHE_KEY,
      this.http.get<ContributionCategory[]>(this.baseUrl + '/contribution-types'),
      this.CACHE_TTL,
      true
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
      true
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
      true
    );
  }

  categoriesChart(): Observable<any> {
    const cacheKey = `${this.CACHE_KEY}_all_chart`;
    return this.cacheService.get(
      cacheKey,
      this.http.get(`${this.baseUrl}/contribution-types-chart`),
      this.CACHE_TTL,
      true
    );
  }

  invalidateCache(): void {
    this.cacheService.clearPattern(new RegExp(`^${this.CACHE_KEY}`));
  }
}
