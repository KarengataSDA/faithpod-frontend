import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';
import { LocalStorageService } from './local-storage.service';
import { TenantService } from './tenant.service';
import { Message, RecipientOptions, SendMessageRequest, SendMessageResponse, BirthdayWishesResponse } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);
  private localStorageService = inject(LocalStorageService);
  private tenantService = inject(TenantService);

  get baseUrl(): string {
    return this.tenantService.getApiUrl();
  }
  private readonly CACHE_KEY = 'messages';
  private readonly STORAGE_KEY = 'messages';
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  getAll(): Observable<Message[]> {
    const cached = this.localStorageService.get<Message[]>(this.STORAGE_KEY);
    if (cached) {
      return new Observable(observer => {
        observer.next(cached);
        observer.complete();
      });
    }

    return this.cacheService.get(
      this.CACHE_KEY,
      this.http.get<Message[]>(this.baseUrl + '/messages').pipe(
        tap(data => this.localStorageService.set(this.STORAGE_KEY, data, { ttl: this.CACHE_TTL }))
      ),
      this.CACHE_TTL,
      true
    );
  }

  find(id: number): Observable<Message> {
    const cacheKey = `${this.CACHE_KEY}_${id}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get<Message>(this.baseUrl + '/messages/' + id),
      this.CACHE_TTL,
      true
    );
  }

  send(data: SendMessageRequest): Observable<SendMessageResponse> {
    return this.http.post<SendMessageResponse>(this.baseUrl + '/messages/send', data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  getRecipientOptions(): Observable<RecipientOptions> {
    const cacheKey = 'recipient_options';
    return this.cacheService.get(
      cacheKey,
      this.http.get<RecipientOptions>(this.baseUrl + '/messages/recipient-options'),
      this.CACHE_TTL,
      true
    );
  }

  getBirthdayWishes(fromDate?: string, toDate?: string): Observable<BirthdayWishesResponse> {
    let params: any = {};
    if (fromDate) params.from_date = fromDate;
    if (toDate) params.to_date = toDate;

    return this.http.get<BirthdayWishesResponse>(this.baseUrl + '/messages/birthday-wishes', { params });
  }

  private invalidateCache(): void {
    this.cacheService.clearPattern(new RegExp(`^${this.CACHE_KEY}`));
    this.localStorageService.remove(this.STORAGE_KEY);
  }
}
