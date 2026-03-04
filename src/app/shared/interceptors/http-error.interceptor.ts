import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private router = inject(Router);
  private authService = inject(AuthService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Silent requests — let the caller handle errors without a popup
        if (request.url.includes('/tenant/info')) {
          return throwError(() => error);
        }

        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          errorMessage = 'A client-side error occurred. Please try again.';
        } else {
          // Check for tenant-related errors
          if ((error.status === 403 || error.status === 401) && error.error?.message) {
            const message = error.error.message.toLowerCase();
            if (message.includes('tenant') || message.includes('organization')) {
              errorMessage = 'Your organization access has expired. Please login again.';
              this.authService.clearAuthState();
              this.router.navigate(['/auth/login']);

              Swal.fire({
                icon: 'error',
                title: errorMessage,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3500,
              });

              return throwError(() => error);
            }
          }

          if (error.status === 0) {
            errorMessage = 'Unable to connect to the server. Please check your network connection.';
          } else if (error.status === 401) {
            errorMessage = 'Your session has expired. Please log in again.';
          } else if (error.status === 403) {
            errorMessage = error.error?.message || 'You do not have permission to perform this action.';
          } else if (error.status === 404) {
            errorMessage = 'The requested resource was not found.';
          } else if (error.status === 422) {
            // Validation errors - let the component handle this
            return throwError(() => error);
          } else if (error.status >= 500) {
            errorMessage = 'A server error occurred. Please try again later.';
          } else {
            errorMessage = 'Something went wrong. Please try again.';
          }
        }

        // Only show alert if we have an error message
        if (errorMessage) {
          Swal.fire({
            icon: 'error',
            title: errorMessage,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500,
          });
        }

        return throwError(() => error);
      })
    );
  }
}
