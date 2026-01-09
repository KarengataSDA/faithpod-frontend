import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  Collection,
  CollectionTotal,
  Contribution,
  ContributionCategory
} from '../models/collection';
import { environment } from 'src/environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);

  baseUrl = environment.apiUrl;
  private apiURL = `${environment.apiUrl}` + '/contributions';
  private apiSendMail = `${environment.apiUrl}` + '/sendGmail/';
  private apiDeleteContribution = `${environment.apiUrl}` + '/destroy-contributions/';
  private addContributionCategory = `${environment.apiUrl}` + '/add-user-contributions';

  private readonly CACHE_KEY_COLLECTIONS = 'collections';
  private readonly CACHE_KEY_CONTRIBUTIONS = 'contributions';
  private readonly CACHE_KEY_CHART = 'contributions_chart';
  private readonly CACHE_KEY_TOTAL = 'contributions_total';
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAll(): Observable<Collection[]> {
    return this.cacheService.get(
      this.CACHE_KEY_COLLECTIONS,
      this.http.get<Collection[]>(this.apiURL),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  getAllContributions(): Observable<Contribution[]> {
    return this.cacheService.get(
      this.CACHE_KEY_CONTRIBUTIONS,
      this.http.get<Contribution[]>(this.baseUrl + '/all-contributions'),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  find(date: string): Observable<Collection> {
    const cacheKey = `${this.CACHE_KEY_COLLECTIONS}_${date}`;
    return this.cacheService.get(
      cacheKey,
      this.http.get<Collection>(this.baseUrl + '/contributions/' + date),
      this.CACHE_TTL,
      true // Enable shareReplay for proper caching
    );
  }

  chart(): Observable<any> {
    return this.cacheService.get(
      this.CACHE_KEY_CHART,
      this.http.get(this.baseUrl + '/contribution-chart'),
      this.CACHE_TTL,
      true // Use shareReplay for dashboard data
    );
  }

  getTotalAmount(): Observable<CollectionTotal> {
    return this.cacheService.get(
      this.CACHE_KEY_TOTAL,
      this.http.get<CollectionTotal>(this.baseUrl + '/contribution-amount'),
      this.CACHE_TTL,
      true // Use shareReplay for dashboard data
    );
  }

  createContributionCategory(contributionCategory): Observable<ContributionCategory> {
    return this.http.post<ContributionCategory>(
      this.addContributionCategory,
      JSON.stringify(contributionCategory),
      this.httpOptions
    ).pipe(
      tap(() => this.invalidateCache())
    );
  }

  sendMail(id: number): Observable<Collection> {
    return this.http.get<Collection>(this.apiSendMail + id);
  }

  delete(id: number) {
    return this.http.delete<Collection>(
      this.apiDeleteContribution + id,
      this.httpOptions
    ).pipe(
      tap(() => this.invalidateCache())
    );
  }

  /**
   * Clear all collection-related cache after mutations
   */
  private invalidateCache(): void {
    this.cacheService.clearPattern(/^collections/);
    this.cacheService.clearPattern(/^contributions/);
  }
}

//// - TO BE DELETED
