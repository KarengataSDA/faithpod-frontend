import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TenantService } from '../services/tenant.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  private tenantService = inject(TenantService);
  private router = inject(Router);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tenantId = this.tenantService.getTenantId();
    const apiUrl = this.tenantService.getApiUrl();

    // Add tenant header for API requests (optional since backend uses subdomain)
    // This provides additional validation and can be used for logging
    if (tenantId && request.url.includes(apiUrl)) {
      request = request.clone({
        setHeaders: {
          'X-Tenant-ID': tenantId
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle tenant-specific errors
        if (error.status === 403 || error.status === 401) {
          const errorMessage = error.error?.message || '';

          // Check if error is tenant-related
          if (errorMessage.toLowerCase().includes('tenant') ||
              errorMessage.toLowerCase().includes('organization')) {
            console.error('Tenant access error:', errorMessage);

            // Clear tenant context and redirect to login
            this.tenantService.clearTenant();
            this.router.navigate(['/auth/login']);
          }
        }

        return throwError(() => error);
      })
    );
  }
}
