import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Member } from '../models/member';
import { environment } from 'src/environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);

  baseUrl = environment.apiUrl;
  private readonly CACHE_KEY_MEMBERS = 'members';
  private readonly CACHE_KEY_GENDER = 'gender_count';
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  getAll(): Observable<any> {
    return this.cacheService.get(
      this.CACHE_KEY_MEMBERS,
      this.http.get<any>(this.baseUrl + '/users'),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  genderCount(): Observable<any> {
    return this.cacheService.get(
      this.CACHE_KEY_GENDER,
      this.http.get<any>(this.baseUrl + '/gender-count'),
      this.CACHE_TTL,
      true // Use shareReplay for dashboard data
    );
  }

  getUser(id: number): Observable<Member> {
    const cacheKey = `${this.CACHE_KEY_MEMBERS}_${id}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get<Member>(this.baseUrl + '/users/' + id),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/users/' + id).pipe(
      tap(() => this.invalidateCache())
    );
  }

  create(data): Observable<Member> {
    return this.http.post<Member>(this.baseUrl + '/users', data, {
      withCredentials: true
    }).pipe(
      tap(() => this.invalidateCache())
    );
  }

  update(id: number, data): Observable<Member> {
    return this.http.put<Member>(this.baseUrl + '/users/' + id, data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  createCollection(data): Observable<Member> {
    return this.http.post<Member>(this.baseUrl + '/add-user-contributions', data).pipe(
      tap(() => {
        // Invalidate contribution-related caches
        this.cacheService.clearPattern(/^contributions/);
        this.cacheService.clearPattern(/^collections/);
      })
    );
  }

  // change url to test mpesa  /add-mpesa-contributions
  createOwnCollection(data): Observable<Member> {
    return this.http.post<Member>(this.baseUrl + '/add-mpesa-contributions', data).pipe(
      tap(() => {
        // Invalidate contribution-related caches
        this.cacheService.clearPattern(/^contributions/);
        this.cacheService.clearPattern(/^collections/);
        this.cacheService.clearPattern(/^transactions/);
      })
    );
  }

  getTransactionStatus(): Observable<any> {
    return this.cacheService.get(
      'transactions',
      this.http.get<any>(`${this.baseUrl}/transactions`, { withCredentials: true }),
      2 * 60 * 1000 // 2 minutes for transactions
    );
  }

  /**
   * Clear all member-related cache after mutations
   */
  private invalidateCache(): void {
    this.cacheService.clearPattern(new RegExp(`^${this.CACHE_KEY_MEMBERS}`));
    this.cacheService.clear(this.CACHE_KEY_GENDER);
  }
}
