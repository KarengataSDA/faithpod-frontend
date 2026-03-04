import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Member, MemberAudit, Paginated } from '../models/member';
import { CacheService } from './cache.service';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);
  private tenantService = inject(TenantService);

  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  get baseUrl(): string {
    return this.tenantService.getApiUrl();
  }

  private get tenantPrefix(): string {
    return this.tenantService.getTenantFromSubdomain() || 'default';
  }

  private get CACHE_KEY_MEMBERS(): string {
    return `${this.tenantPrefix}_members`;
  }

  private get CACHE_KEY_GENDER(): string {
    return `${this.tenantPrefix}_gender_count`;
  }

  // ── Read ──────────────────────────────────────────────────────────────────

  getAll(): Observable<Member[]> {
    return this.cacheService.get(
      this.CACHE_KEY_MEMBERS,
      this.http.get<Member[] | { data: Member[] }>(this.baseUrl + '/members').pipe(
        map(response => Array.isArray(response) ? response : (response as any)?.data || [])
      ),
      this.CACHE_TTL,
      true
    );
  }

  getAllFresh(): Observable<Member[]> {
    this.invalidateCache();
    return this.http.get<Member[] | { data: Member[] }>(this.baseUrl + '/members').pipe(
      map(response => Array.isArray(response) ? response : (response as any)?.data || [])
    );
  }

  genderCount(): Observable<any> {
    return this.cacheService.get(
      this.CACHE_KEY_GENDER,
      this.http.get<any>(this.baseUrl + '/gender-count'),
      this.CACHE_TTL,
      true
    );
  }

  getUser(id: number): Observable<Member> {
    const cacheKey = `${this.CACHE_KEY_MEMBERS}_${id}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get<Member>(this.baseUrl + '/members/' + id),
      this.CACHE_TTL,
      true
    );
  }

  getAuditTrail(id: number): Observable<MemberAudit[]> {
    return this.http.get<MemberAudit[]>(this.baseUrl + '/members/' + id + '/audit-trail');
  }

  getActivityLog(page = 1): Observable<Paginated<MemberAudit>> {
    return this.http.get<Paginated<MemberAudit>>(this.baseUrl + '/member-activity-log', { params: { page } });
  }

  // ── Write ─────────────────────────────────────────────────────────────────

  create(data: any): Observable<Member> {
    return this.http.post<Member>(this.baseUrl + '/members', data, {
      withCredentials: true
    }).pipe(tap(() => this.invalidateCache()));
  }

  update(id: number, data: any): Observable<Member> {
    return this.http.put<Member>(this.baseUrl + '/members/' + id, data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/members/' + id).pipe(
      tap(() => this.invalidateCache())
    );
  }

  // ── Status management ─────────────────────────────────────────────────────

  verify(id: number): Observable<Member> {
    return this.http.patch<{ member: Member }>(this.baseUrl + '/members/' + id + '/verify', {}).pipe(
      tap(() => this.invalidateCache()),
      map(res => res.member)
    );
  }

  reject(id: number, reason: string): Observable<Member> {
    return this.http.patch<{ member: Member }>(this.baseUrl + '/members/' + id + '/reject', { reason }).pipe(
      tap(() => this.invalidateCache()),
      map(res => res.member)
    );
  }

  suspend(id: number, reason: string): Observable<Member> {
    return this.http.patch<{ member: Member }>(this.baseUrl + '/members/' + id + '/suspend', { reason }).pipe(
      tap(() => this.invalidateCache()),
      map(res => res.member)
    );
  }

  reactivate(id: number): Observable<Member> {
    return this.http.patch<{ member: Member }>(this.baseUrl + '/members/' + id + '/reactivate', {}).pipe(
      tap(() => this.invalidateCache()),
      map(res => res.member)
    );
  }

  resendInvite(id: number): Observable<any> {
    return this.http.post(this.baseUrl + '/members/' + id + '/resend-invite', {});
  }

  acceptInvite(token: string, password: string, passwordConfirmation: string): Observable<any> {
    return this.http.post(this.baseUrl + '/members/accept-invite', {
      token,
      password,
      password_confirmation: passwordConfirmation,
    });
  }

  // ── Contributions ─────────────────────────────────────────────────────────

  createCollection(data: any): Observable<Member> {
    return this.http.post<Member>(this.baseUrl + '/add-user-contributions', data).pipe(
      tap(() => {
        this.cacheService.clearPattern(/^contributions/);
        this.cacheService.clearPattern(/^collections/);
      })
    );
  }

  createOwnCollection(data: any): Observable<Member> {
    return this.http.post<Member>(this.baseUrl + '/add-mpesa-contributions', data);
  }

  // Always fetches fresh — this is a polling endpoint, never cache it
  getTransactionStatus(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/transactions`, { withCredentials: true });
  }

  // ── Cache ─────────────────────────────────────────────────────────────────

  clearCache(): void {
    this.invalidateCache();
  }

  private invalidateCache(): void {
    this.cacheService.clearPattern(new RegExp(`^${this.CACHE_KEY_MEMBERS}`));
    this.cacheService.clear(this.CACHE_KEY_GENDER);
  }
}
