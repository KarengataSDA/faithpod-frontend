import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Prayercell } from '../models/prayercell';
import { CacheService } from './cache.service';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root',
})
export class PrayercellService {
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
    return `${this.tenantPrefix}_prayercells`;
  }

  getAll(): Observable<Prayercell[]> {
    return this.cacheService.get(
      this.CACHE_KEY,
      this.http.get<Prayercell[] | { data: Prayercell[] }>(this.baseUrl + '/prayercells').pipe(
        map(response => Array.isArray(response) ? response : (response as any)?.data || [])
      ),
      this.CACHE_TTL,
      true
    );
  }

  create(data): Observable<Prayercell> {
    return this.http.post<Prayercell>(this.baseUrl + '/prayercells', data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  find(id: number): Observable<Prayercell> {
    const cacheKey = `${this.CACHE_KEY}_${id}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get<Prayercell>(this.baseUrl + '/prayercells/' + id),
      this.CACHE_TTL,
      true
    );
  }

  update(id: number, data): Observable<Prayercell> {
    return this.http.put<Prayercell>(this.baseUrl + '/prayercells/' + id, data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  delete(id: number) {
    return this.http.delete<Prayercell>(this.baseUrl + '/prayercells/' + id).pipe(
      tap(() => this.invalidateCache())
    );
  }

  invalidateCache(): void {
    this.cacheService.clearPattern(new RegExp(`^${this.CACHE_KEY}`));
  }
}
