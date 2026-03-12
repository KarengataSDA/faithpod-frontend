import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';
import { LocalStorageService } from './local-storage.service';
import { TenantService } from './tenant.service';
import { Hymn, HymnLanguage } from '../models/hymn';

@Injectable({
  providedIn: 'root',
})
export class HymnService {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);
  private localStorageService = inject(LocalStorageService);
  private tenantService = inject(TenantService);

  get baseUrl(): string {
    return this.tenantService.getApiUrl();
  }

  // Cache keys
  private readonly LANGUAGES_CACHE_KEY = 'hymn_languages';
  private readonly HYMNS_CACHE_KEY = 'hymns';
  private readonly FAVORITES_CACHE_KEY = 'hymn_favorites';
  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes

  // ============ HYMN LANGUAGES ============

  getAllLanguages(): Observable<HymnLanguage[]> {
    const cached = this.localStorageService.get<HymnLanguage[]>(this.LANGUAGES_CACHE_KEY);
    if (cached) {
      return new Observable(observer => {
        observer.next(cached);
        observer.complete();
      });
    }

    return this.cacheService.get(
      this.LANGUAGES_CACHE_KEY,
      this.http.get<HymnLanguage[]>(this.baseUrl + '/hymn-languages').pipe(
        tap(data => this.localStorageService.set(this.LANGUAGES_CACHE_KEY, data, { ttl: this.CACHE_TTL }))
      ),
      this.CACHE_TTL,
      true
    );
  }

  getLanguage(id: number): Observable<HymnLanguage> {
    const cacheKey = `${this.LANGUAGES_CACHE_KEY}_${id}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get<HymnLanguage>(this.baseUrl + '/hymn-languages/' + id),
      this.CACHE_TTL,
      true
    );
  }

  createLanguage(data: any): Observable<HymnLanguage> {
    return this.http.post<HymnLanguage>(this.baseUrl + '/hymn-languages', data).pipe(
      tap(() => this.invalidateLanguagesCache())
    );
  }

  updateLanguage(id: number, data: any): Observable<HymnLanguage> {
    return this.http.put<HymnLanguage>(this.baseUrl + '/hymn-languages/' + id, data).pipe(
      tap(() => this.invalidateLanguagesCache())
    );
  }

  deleteLanguage(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/hymn-languages/' + id).pipe(
      tap(() => this.invalidateLanguagesCache())
    );
  }

  private invalidateLanguagesCache(): void {
    this.cacheService.clearPattern(new RegExp(`^${this.LANGUAGES_CACHE_KEY}`));
    this.localStorageService.remove(this.LANGUAGES_CACHE_KEY);
  }

  // ============ HYMNS ============

  getAllHymns(languageId?: number, search?: string): Observable<Hymn[]> {
    let url = this.baseUrl + '/hymns';
    const params: string[] = [];

    if (languageId) {
      params.push(`language_id=${languageId}`);
    }
    if (search) {
      params.push(`search=${encodeURIComponent(search)}`);
    }
    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    const cacheKey = `${this.HYMNS_CACHE_KEY}_${languageId || 'all'}_${search || ''}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get<Hymn[]>(url),
      this.CACHE_TTL,
      true
    );
  }

  getHymnsByLanguage(languageId: number): Observable<Hymn[]> {
    const cacheKey = `${this.HYMNS_CACHE_KEY}_lang_${languageId}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get<Hymn[]>(this.baseUrl + '/hymns/language/' + languageId),
      this.CACHE_TTL,
      true
    );
  }

  getHymn(id: number): Observable<Hymn> {
    // No cache: is_favorite changes based on auth state (guest vs logged-in member)
    return this.http.get<Hymn>(this.baseUrl + '/hymns/' + id);
  }

  createHymn(data: any): Observable<Hymn> {
    return this.http.post<Hymn>(this.baseUrl + '/hymns', data).pipe(
      tap(() => this.invalidateHymnsCache())
    );
  }

  updateHymn(id: number, data: any): Observable<Hymn> {
    return this.http.put<Hymn>(this.baseUrl + '/hymns/' + id, data).pipe(
      tap(() => this.invalidateHymnsCache())
    );
  }

  deleteHymn(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/hymns/' + id).pipe(
      tap(() => this.invalidateHymnsCache())
    );
  }

  private invalidateHymnsCache(): void {
    this.cacheService.clearPattern(new RegExp(`^${this.HYMNS_CACHE_KEY}`));
  }

  // ============ FAVORITES ============

  getFavorites(languageId?: number): Observable<Hymn[]> {
    let url = this.baseUrl + '/hymn-favorites';
    if (languageId) {
      url += `?language_id=${languageId}`;
    }

    const cacheKey = `${this.FAVORITES_CACHE_KEY}_${languageId || 'all'}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get<Hymn[]>(url),
      this.CACHE_TTL,
      true
    );
  }

  toggleFavorite(hymnId: number): Observable<{ message: string; is_favorite: boolean }> {
    return this.http.post<{ message: string; is_favorite: boolean }>(
      this.baseUrl + '/hymn-favorites/' + hymnId + '/toggle',
      {}
    ).pipe(
      tap(() => this.invalidateFavoritesCache())
    );
  }

  private invalidateFavoritesCache(): void {
    this.cacheService.clearPattern(new RegExp(`^${this.FAVORITES_CACHE_KEY}`));
    this.cacheService.clearPattern(new RegExp(`^${this.HYMNS_CACHE_KEY}`));
  }
}
