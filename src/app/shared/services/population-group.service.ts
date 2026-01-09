import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PopulationGroup } from 'src/app/shared/models/population-group';
import { CacheService } from './cache.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PopulationGroupService {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);
  private localStorageService = inject(LocalStorageService);

  baseUrl = environment.apiUrl;
  private readonly CACHE_KEY = 'population_groups';
  private readonly STORAGE_KEY = 'population_groups';
  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes for reference data

  getAll(): Observable<PopulationGroup[]> {
    // Try localStorage first for reference data
    const cached = this.localStorageService.get<PopulationGroup[]>(this.STORAGE_KEY);
    if (cached) {
      return new Observable(observer => {
        observer.next(cached);
        observer.complete();
      });
    }

    return this.cacheService.get(
      this.CACHE_KEY,
      this.http.get<PopulationGroup[]>(this.baseUrl + '/groups').pipe(
        tap(data => this.localStorageService.set(this.STORAGE_KEY, data, { ttl: this.CACHE_TTL }))
      ),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  create(data): Observable<PopulationGroup> {
    return this.http.post<PopulationGroup>(this.baseUrl + '/groups', data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  find(id: number): Observable<PopulationGroup> {
    const cacheKey = `${this.CACHE_KEY}_${id}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get<PopulationGroup>(this.baseUrl + '/groups/' + id),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  update(id: number, data): Observable<PopulationGroup> {
    return this.http.put<PopulationGroup>(this.baseUrl + '/groups/' + id, data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  delete(id: number) {
    return this.http.delete<PopulationGroup>(this.baseUrl + '/groups/' + id).pipe(
      tap(() => this.invalidateCache())
    );
  }

  private invalidateCache(): void {
    this.cacheService.clearPattern(new RegExp(`^${this.CACHE_KEY}`));
    this.localStorageService.remove(this.STORAGE_KEY);
  }
}
