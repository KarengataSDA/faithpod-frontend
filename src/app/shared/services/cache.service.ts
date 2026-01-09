import { Injectable } from '@angular/core';
import { Observable, of, shareReplay } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface CacheEntry<T> {
  data: Observable<T>;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultTTL = 5 * 60 * 1000;

  get<T>(
    key: string,
    source: Observable<T>,
    ttl: number = this.defaultTTL,
    useShareReplay: boolean = false
  ): Observable<T> {
    const cached = this.cache.get(key);
    const now = Date.now();

    if (cached && (now - cached.timestamp) < ttl) {
      return cached.data;
    }

    const data$ = useShareReplay
      ? source.pipe(
          shareReplay({ bufferSize: 1, refCount: false }),
          tap(() => this.updateTimestamp(key))
        )
      : source.pipe(
          tap(() => this.updateTimestamp(key))
        );

    this.cache.set(key, {
      data: data$,
      timestamp: now
    });

    return data$;
  }

  private updateTimestamp(key: string): void {
    const cached = this.cache.get(key);
    if (cached) {
      cached.timestamp = Date.now();
    }
  }

  clear(key: string): void {
    this.cache.delete(key);
  }

  clearPattern(pattern: string | RegExp): void {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;

    Array.from(this.cache.keys())
      .filter(key => regex.test(key))
      .forEach(key => this.cache.delete(key));
  }

  clearAll(): void {
    this.cache.clear();
  }

  has(key: string, ttl: number = this.defaultTTL): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;

    const now = Date.now();
    return (now - cached.timestamp) < ttl;
  }
}
