import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PaybillTransaction } from '../models/paybill-transaction';
import { CacheService } from './cache.service';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root'
})
export class PaybillTransactionService {
  private http = inject(HttpClient);
  private cacheService = inject(CacheService);
  private tenantService = inject(TenantService);

  /**
   * Get dynamic base URL from tenant service
   */
  get baseUrl(): string {
    return this.tenantService.getApiUrl();
  }
  private readonly CACHE_KEY = 'paybill_transactions';
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes for transaction data

  getAll(): Observable<PaybillTransaction[]> {
    return this.cacheService.get(
      this.CACHE_KEY,
      this.http.get<{success: boolean, data: PaybillTransaction[]}>(this.baseUrl + '/mpesa/transaction')
        .pipe(
          map(response => response.data)
        ),
      this.CACHE_TTL,
      true // Use shareReplay for dashboard monitor data
    );
  }
}
