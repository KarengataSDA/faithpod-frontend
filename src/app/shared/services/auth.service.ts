import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient)
  baseUrl = environment.apiUrl
  private userPermissions: string[] = []

  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  public currentUser$: Observable<User | null>  = this.currentUserSubject.asObservable() 

  login(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/login', data, {withCredentials: true}).pipe(
      tap((response: any) => {
        // Store token in sessionStorage instead of localStorage for better security
        // sessionStorage is cleared when the browser tab is closed
        sessionStorage.setItem('token', response.token)
        sessionStorage.setItem('user', JSON.stringify(response.user))
        this.setUser(response.user)
      })
    );
  }

  isLoggedIn(): boolean {
    const hasToken = !!this.getToken();
    const hasUser = !!this.currentUserSubject.value;
    return hasToken && hasUser;
  }

  getToken(): string | null {
    // Check sessionStorage first, fallback to localStorage for backward compatibility
    return sessionStorage.getItem('token') || localStorage.getItem('token');
  }

  initializeAuthState(): void {
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
  }

  register(data:any): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/register', data).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error)
      })
    );
  }

  

  user(): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/user').pipe(
      tap((user: User) => {
        this.setUser(user)
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(this.baseUrl + '/logout', {}, { withCredentials: true}).pipe(
      tap(() => {
        this.clearAuthState();
      })
    )
  }

  updateInfo(data: any): Observable<User> {
    return this.http.put<User>(this.baseUrl + '/users/info', data).pipe(
      tap((user: User) => {
        this.setUser(user)
      })
    )
  }

  updatePassword(data: any): Observable<User> {
    return this.http.put<User>(this.baseUrl + '/users/password', data)
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
