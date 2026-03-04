import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { PopulationGroup } from 'src/app/shared/models/population-group';
import { CacheService } from './cache.service';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root'
})
export class PopulationGroupService {
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
    return `${this.tenantPrefix}_population_groups`;
  }

  getAll(): Observable<PopulationGroup[]> {
    return this.cacheService.get(
      this.CACHE_KEY,
      this.http.get<PopulationGroup[] | { data: PopulationGroup[] }>(this.baseUrl + '/population-groups').pipe(
        map(response => Array.isArray(response) ? response : (response as any)?.data || [])
      ),
      this.CACHE_TTL,
      true
    );
  }

  create(data): Observable<PopulationGroup> {
    return this.http.post<PopulationGroup>(this.baseUrl + '/population-groups', data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  find(id: number): Observable<PopulationGroup> {
    const cacheKey = `${this.CACHE_KEY}_${id}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get<PopulationGroup>(this.baseUrl + '/population-groups/' + id),
      this.CACHE_TTL,
      true
    );
  }

  update(id: number, data): Observable<PopulationGroup> {
    return this.http.put<PopulationGroup>(this.baseUrl + '/population-groups/' + id, data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  delete(id: number) {
    return this.http.delete<PopulationGroup>(this.baseUrl + '/population-groups/' + id).pipe(
      tap(() => this.invalidateCache())
    );
  }

  invalidateCache(): void {
    this.cacheService.clearPattern(new RegExp(`^${this.CACHE_KEY}`));
  }
}
