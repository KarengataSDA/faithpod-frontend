import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { TenantService } from "../services/tenant.service";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private tenantService: TenantService,
        private router: Router
    ) {} 

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        const requiredPermission = route.data['permission'];

        // Check tenant validity first
        if (!this.tenantService.isValidTenant()) {
            console.warn('Invalid tenant context, redirecting to login');
            this.authService.clearAuthState();
            this.router.navigate(['/auth/login']);
            return of(false);
        }

        // Check if user is authenticated
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/auth/login']);
            return of(false);
        }

        // If no permission required, allow access
        if (!requiredPermission) {
            return of(true);
        }

        // Check if user has required permission
        if (this.authService.hasPermission(requiredPermission)) {
            return of(true);
        }

        // User doesn't have permission
        this.router.navigate(['/unauthorized']);
        return of(false);
    }
}