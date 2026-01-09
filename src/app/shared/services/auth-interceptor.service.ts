import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  private router = inject(Router)
  private authService = inject(AuthService)

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.authService.getToken();

      if (token) {
        const clonedRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        })
        return next.handle(clonedRequest).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              // Token is invalid or expired, logout user
              this.authService.clearAuthState();
              this.router.navigate(['/login'])
            }
            return throwError(() => error)
          })
        )
      }

      return next.handle(req)
  }
}
