import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient)
  private tenantService = inject(TenantService)
  private userPermissions: string[] = []

  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  public currentUser$: Observable<User | null>  = this.currentUserSubject.asObservable()

  /**
   * Get dynamic base URL from tenant service
   */
  get baseUrl(): string {
    return this.tenantService.getApiUrl();
  } 

  login(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/members/login', data, {withCredentials: true}).pipe(
      tap((response: any) => {
        // Store token in sessionStorage instead of localStorage for better security
        // sessionStorage is cleared when the browser tab is closed
        sessionStorage.setItem('token', response.token)
        // Backend returns 'member' instead of 'user' for tenant auth
        const user = response.member || response.user;
        sessionStorage.setItem('user', JSON.stringify(user))
        this.setUser(user)

        // Initialize tenant context from subdomain
        this.initializeTenantContext()
      })
    );
  }

  isLoggedIn(): boolean {
    const hasToken = !!this.getToken();
    const hasUser = !!this.currentUserSubject.value;
    const hasTenant = this.tenantService.isValidTenant();
    return hasToken && hasUser && hasTenant;
  }

  getToken(): string | null {
    // Check sessionStorage first, fallback to localStorage for backward compatibility
    return sessionStorage.getItem('token') || localStorage.getItem('token');
  }

  initializeAuthState(): void {
    // Initialize tenant context first
    this.initializeTenantContext();

    const token = this.getToken();
    const user = sessionStorage.getItem('user') || localStorage.getItem('user');

    if(token && user) {
      try {
        const parsedUser: User = JSON.parse(user);
        this.currentUserSubject.next(parsedUser);

        // Validate token with server
        this.validateToken().subscribe({
          next: () => {
            // Token is valid, migrate from localStorage to sessionStorage if needed
            this.migrateToSessionStorage();
          },
          error: () => {
            this.clearAuthState();
          }
        });
      } catch (error) {
        // Invalid JSON in storage, clear auth state
        this.clearAuthState();
      }
    }
  }

  private validateToken(): Observable<User> {
    return this.user();
  }

  private migrateToSessionStorage(): void {
    // Migrate from localStorage to sessionStorage for better security
    const localToken = localStorage.getItem('token');
    const localUser = localStorage.getItem('user');
    const localPermissions = localStorage.getItem('permissions');

    if (localToken && !sessionStorage.getItem('token')) {
      sessionStorage.setItem('token', localToken);
      localStorage.removeItem('token');
    }
    if (localUser && !sessionStorage.getItem('user')) {
      sessionStorage.setItem('user', localUser);
      localStorage.removeItem('user');
    }
    if (localPermissions && !sessionStorage.getItem('permissions')) {
      sessionStorage.setItem('permissions', localPermissions);
      localStorage.removeItem('permissions');
    }
  }

  clearAuthState(): void {
    // Clear from both storages
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('permissions');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('permissions');
    this.currentUserSubject.next(null);

    // Clear tenant context
    this.tenantService.clearTenant();
  }

  register(data:any): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/members/register', data).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error)
      })
    );
  }



  user(): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/members/me').pipe(
      tap((user: User) => {
        this.setUser(user)
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(this.baseUrl + '/members/logout', {}, { withCredentials: true}).pipe(
      tap(() => {
        this.clearAuthState();
      })
    )
  }

  /**
   * Initialize tenant context from subdomain
   * Should be called on app startup and after login
   */
  initializeTenantContext(): void {
    this.tenantService.initializeTenantContext();
  }

  updateInfo(data: any): Observable<User> {
    return this.http.put<User>(this.baseUrl + '/members/update-info', data).pipe(
      tap((user: User) => {
        this.setUser(user)
      })
    )
  }

  updatePassword(data: any): Observable<User> {
    return this.http.put<User>(this.baseUrl + '/members/update-password', data)
  }

  private setUser(user: User): void {
    this.currentUserSubject.next(user);
    // Update sessionStorage with fresh user data including permissions
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  setPermissions(permissions: string[]) {
    this.userPermissions = permissions;
    sessionStorage.setItem('permissions', JSON.stringify(permissions));
  }

  getPermissions(): string[] {
    const stored = sessionStorage.getItem('permissions') || localStorage.getItem('permissions') || '[]';
    try {
      return JSON.parse(stored);
    } catch (error) {
      return [];
    }
  }

  hasPermission(permission: string): boolean {
    let user = this.currentUserSubject.value;

    if (!user) {
      const storedUser = sessionStorage.getItem('user') || localStorage.getItem('user');
      if (storedUser) {
        try {
          user = JSON.parse(storedUser);
        } catch (e) {
          return false;
        }
      }
    }

    if (user && user.role && user.role.permissions) {
      return user.role.permissions.some((perm: any) => perm.name === permission);
    }
    return false;
  }

  verifyEmail(userId: string, hash: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/email/verify/${userId}/${hash}`)
  }

  resendVerificationEmail(): Observable<any> {
    return this.http.post(`${this.baseUrl}/email/resend`, {})
  }


  sendResetLink(email: string): Observable<any> {
    return this.http.post(this.baseUrl + '/password/email', {email});
  }

  resetPassword(data: { token: string, email: string, password: string, password_confirmation: string}): Observable<any> {
    return this.http.post(this.baseUrl + '/password/reset', data)
  }

}
