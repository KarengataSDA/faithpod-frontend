import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Prayercell } from '../models/prayercell';
import { environment } from 'src/environments/environment';
import { CacheService } from './cache.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PrayercellService {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);
  private localStorageService = inject(LocalStorageService);

  baseUrl = environment.apiUrl;
  private readonly CACHE_KEY = 'prayercells';
  private readonly STORAGE_KEY = 'prayercells';
  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes for reference data

  getAll(): Observable<Prayercell[]> {
    // Try localStorage first for reference data
    const cached = this.localStorageService.get<Prayercell[]>(this.STORAGE_KEY);
    if (cached) {
      return new Observable(observer => {
        observer.next(cached);
        observer.complete();
      });
    }

    return this.cacheService.get(
      this.CACHE_KEY,
      this.http.get<Prayercell[]>(this.baseUrl + '/prayercells').pipe(
        tap(data => this.localStorageService.set(this.STORAGE_KEY, data, { ttl: this.CACHE_TTL }))
      ),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
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
      true // Enable shareReplay for proper caching
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

  private invalidateCache(): void {
    this.cacheService.clearPattern(new RegExp(`^${this.CACHE_KEY}`));
    this.localStorageService.remove(this.STORAGE_KEY);
  }
}
