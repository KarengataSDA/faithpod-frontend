import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Check if user is authenticated
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }

    // User is authenticated, allow access
    return true;
  }

}
