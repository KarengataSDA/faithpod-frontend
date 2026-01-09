import { Injectable, inject } from '@angular/core';
import { Observable, of, shareReplay } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TenantService } from './tenant.service';

export interface CacheEntry<T> {
  data: Observable<T>;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private tenantService = inject(TenantService);
  private cache = new Map<string, CacheEntry<any>>();
  private defaultTTL = 5 * 60 * 1000;

  /**
   * Get tenant-scoped cache key
   * Prevents data leakage between tenants
   */
  private getScopedKey(key: string): string {
    const tenantId = this.tenantService.getTenantId();
    return tenantId ? `${tenantId}_${key}` : key;
  }

  get<T>(
    key: string,
    source: Observable<T>,
    ttl: number = this.defaultTTL,
    useShareReplay: boolean = false
  ): Observable<T> {
    const scopedKey = this.getScopedKey(key);
    const cached = this.cache.get(scopedKey);
    const now = Date.now();

    if (cached && (now - cached.timestamp) < ttl) {
      return cached.data;
    }

    const data$ = useShareReplay
      ? source.pipe(
          shareReplay({ bufferSize: 1, refCount: false }),
          tap(() => this.updateTimestamp(scopedKey))
        )
      : source.pipe(
          tap(() => this.updateTimestamp(scopedKey))
        );

    this.cache.set(scopedKey, {
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
    const scopedKey = this.getScopedKey(key);
    this.cache.delete(scopedKey);
  }

  clearPattern(pattern: string | RegExp): void {
    const tenantId = this.tenantService.getTenantId();
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;

    Array.from(this.cache.keys())
      .filter(key => {
        // Only clear keys for current tenant
        if (tenantId && !key.startsWith(`${tenantId}_`)) {
          return false;
        }
        return regex.test(key);
      })
      .forEach(key => this.cache.delete(key));
  }

  clearAll(): void {
    this.cache.clear();
  }

  /**
   * Clear all cache entries for current tenant
   */
  clearCurrentTenant(): void {
    const tenantId = this.tenantService.getTenantId();
    if (!tenantId) {
      this.clearAll();
      return;
    }

    Array.from(this.cache.keys())
      .filter(key => key.startsWith(`${tenantId}_`))
      .forEach(key => this.cache.delete(key));
  }

  has(key: string, ttl: number = this.defaultTTL): boolean {
    const scopedKey = this.getScopedKey(key);
    const cached = this.cache.get(scopedKey);
    if (!cached) return false;

    const now = Date.now();
    return (now - cached.timestamp) < ttl;
  }
}
