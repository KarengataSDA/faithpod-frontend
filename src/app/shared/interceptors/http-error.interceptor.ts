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
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
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
            errorMessage =
              'Unable to connect to the server. Please check your network connection or try again later.';
          } else if(error.status === 401) {
            errorMessage = 'Email or password is incorrect. Please try again.'
          } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }

        // alert(errorMessage)
        Swal.fire({
          icon: 'error',
          title: errorMessage,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3500,
        });

        return throwError(() => error);
      })
    );
  }
}
