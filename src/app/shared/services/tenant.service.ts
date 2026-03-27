import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface TenantTheme {
  primaryColor?: string; // RGB format: "23, 83, 81"
  secondaryColor?: string;
  backgroundColor?: string;
  successColor?: string;
  dangerColor?: string;
  warningColor?: string;
  infoColor?: string;
}

export interface TenantInfo {
  id: string;
  name: string;
  email: string;
  domains?: Array<{ domain: string }>;
  theme?: TenantTheme;
}

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private readonly TENANT_KEY = 'tenant_id';
  private readonly TENANT_NAME_KEY = 'tenant_name';
  private tenantSubject: BehaviorSubject<string | null>;
  public tenant$: Observable<string | null>;

  constructor(private http: HttpClient) {
    const storedTenant = this.getTenantId();
    this.tenantSubject = new BehaviorSubject<string | null>(storedTenant);
    this.tenant$ = this.tenantSubject.asObservable();
  }

  /**
   * Extract tenant identifier from subdomain
   * Examples:
   * - demo.localhost → "demo"
   * - test.localhost → "test"
   * - tenant1.faithpod.com → "tenant1"
   * - localhost → null (no tenant)
   * - faithpod.com → null (main domain)
   */
  getTenantFromSubdomain(): string | null {
    const hostname = window.location.hostname;

    // For localhost-based subdomains (e.g., demo.localhost, test.localhost)
    if (hostname.includes('.localhost')) {
      const parts = hostname.split('.');
      const tenant = parts[0];

      // Validate tenant format (alphanumeric, hyphens, and underscores)
      if (!/^[a-z0-9_-]+$/i.test(tenant)) {
        console.warn(`Invalid tenant format: ${tenant}`);
        return null;
      }

      return tenant;
    }

    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.match(/^\d+\.\d+\.\d+\.\d+$/)) {
      return environment.defaultTenant || null;
    }

    const parts = hostname.split('.');

    if (parts.length <= 2 || parts[0] === 'www') {
      return null;
    }

    const tenant = parts[0];

    if (['admin', 'api', 'www'].includes(tenant.toLowerCase())) {
      return null;
    }

    if (!/^[a-z0-9_-]+$/i.test(tenant)) {
      return null;
    }

    return tenant;
  }

  getTenantId(): string | null {
    try {
      return sessionStorage.getItem(this.TENANT_KEY);
    } catch (error) {
      return null;
    }
  }

  setTenantId(tenantId: string): void {
    try {
      sessionStorage.setItem(this.TENANT_KEY, tenantId);
      this.tenantSubject.next(tenantId);
    } catch (error) {
    }
  }

 
  clearTenant(): void {
    try {
      sessionStorage.removeItem(this.TENANT_KEY);
      this.tenantSubject.next(null);
    } catch (error) {
    }
  }

 
  isValidTenant(): boolean {
    const storedTenant = this.getTenantId();
    const currentTenant = this.getTenantFromSubdomain();

    if (currentTenant === null) {
      return true;
    }

    return storedTenant === currentTenant;
  }

 
  initializeTenantContext(): void {
    const subdomainTenant = this.getTenantFromSubdomain();

    if (subdomainTenant) {
      // Always set the tenant from the current subdomain
      // This ensures we use the correct tenant even if sessionStorage has stale data
      this.setTenantId(subdomainTenant);
    } else {
    
      this.clearTenant();
    }
  }

  validateTenant(): boolean {
    const isValid = this.isValidTenant();

    if (!isValid) {
      console.warn('Tenant validation failed');
      this.clearTenant();
    }

    return isValid;
  }

  getApiUrl(): string {
    const hostname = window.location.hostname;
    // Always use HTTPS in production; HTTP only for local development
    const protocol = environment.production ? 'https:' : window.location.protocol;
    const port = environment.apiPort;

    // Check if we're on a tenant subdomain
    const hasTenantSubdomain = this.getTenantFromSubdomain() !== null;

    if (hasTenantSubdomain) {
      let apiUrl = `${protocol}//${hostname}`;
      if (port) {
        apiUrl += `:${port}`;
      }
      apiUrl += '/api';
      return apiUrl;
    }

    // For central admin (no subdomain), use static API URL if configured
    if (environment.apiUrl) {
      return environment.apiUrl;
    }

    // Fallback: build from hostname
    let apiUrl = `${protocol}//${hostname}`;
    if (port) {
      apiUrl += `:${port}`;
    }
    apiUrl += '/api';

    return apiUrl;
  }

  /**
   * Fetch tenant information from the API
   */
  fetchTenantInfo(): Observable<TenantInfo> {
    const apiUrl = this.getApiUrl();
    return this.http.get<TenantInfo>(`${apiUrl}/tenant/info`);
  }

  /**
   * Get stored tenant name from sessionStorage
   */
  getTenantName(): string | null {
    try {
      return sessionStorage.getItem(this.TENANT_NAME_KEY);
    } catch (error) {
      console.error('Error reading tenant name from sessionStorage:', error);
      return null;
    }
  }

  /**
   * Store tenant name in sessionStorage
   */
  setTenantName(tenantName: string): void {
    try {
      sessionStorage.setItem(this.TENANT_NAME_KEY, tenantName);
    } catch (error) {
      console.error('Error storing tenant name in sessionStorage:', error);
    }
  }

  /**
   * Clear tenant name from sessionStorage
   */
  clearTenantName(): void {
    try {
      sessionStorage.removeItem(this.TENANT_NAME_KEY);
    } catch (error) {
      console.error('Error clearing tenant name from sessionStorage:', error);
    }
  }
}
