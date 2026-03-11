import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';
import { LocalStorageService } from './local-storage.service';
import { TenantService } from './tenant.service';
import { Announcement } from '../models/announcement';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);
  private localStorageService = inject(LocalStorageService);
  private tenantService = inject(TenantService);

  get baseUrl(): string {
    return this.tenantService.getApiUrl();
  }
  private readonly CACHE_KEY = 'announcements';
  private readonly STORAGE_KEY = 'announcements';
  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes for reference data

  getAll(): Observable<Announcement[]> {
    // Try localStorage first for reference data
    const cached = this.localStorageService.get<Announcement[]>(this.STORAGE_KEY);
    if (cached) {
      return new Observable(observer => {
        observer.next(cached);
        observer.complete();
      });
    }

    return this.cacheService.get(
      this.CACHE_KEY,
      this.http.get<Announcement[]>(this.baseUrl + '/announcements').pipe(
        tap(data => this.localStorageService.set(this.STORAGE_KEY, data, { ttl: this.CACHE_TTL }))
      ),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  create(data: FormData | Record<string, any>): Observable<Announcement> {
    return this.http.post<Announcement>(this.baseUrl + '/announcements', data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  find(id: number): Observable<Announcement> {
    const cacheKey = `${this.CACHE_KEY}_${id}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get<Announcement>(this.baseUrl + '/announcements/' + id),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  update(id: number, data: Record<string, any>): Observable<Announcement> {
    return this.http.put<Announcement>(this.baseUrl + '/announcements/' + id, data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  updateWithPost(id: number, data: FormData): Observable<Announcement> {
    return this.http.post<Announcement>(this.baseUrl + '/announcements/' + id, data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  delete(id: number) {
    return this.http.delete<Announcement>(this.baseUrl + '/announcements/' + id).pipe(
      tap(() => this.invalidateCache())
    );
  }

  invalidateCache(): void {
    this.cacheService.clearPattern(new RegExp(`^${this.CACHE_KEY}`));
    this.localStorageService.remove(this.STORAGE_KEY);
  }
}
