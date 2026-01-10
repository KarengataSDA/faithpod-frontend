import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface TenantInfo {
  id: string;
  name: string;
  email: string;
  domains?: Array<{ domain: string }>;
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
    console.log('[TenantService] Extracting tenant from hostname:', hostname);

    // For localhost-based subdomains (e.g., demo.localhost, test.localhost)
    if (hostname.includes('.localhost')) {
      const parts = hostname.split('.');
      const tenant = parts[0];

      // Validate tenant format (alphanumeric and hyphens only)
      if (!/^[a-z0-9-]+$/i.test(tenant)) {
        console.warn(`Invalid tenant format: ${tenant}`);
        return null;
      }

      console.log('[TenantService] Extracted tenant:', tenant);
      return tenant;
    }

    // Bare localhost or IP address - no tenant
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.match(/^\d+\.\d+\.\d+\.\d+$/)) {
      console.log('[TenantService] No subdomain detected, using default tenant:', environment.defaultTenant);
      return environment.defaultTenant || null;
    }

    // Split hostname into parts
    const parts = hostname.split('.');

    // Main domain (faithpod.com) or www subdomain (www.faithpod.com)
    if (parts.length <= 2 || parts[0] === 'www') {
      console.log('[TenantService] Main domain or www subdomain, no tenant');
      return null;
    }

    // Extract first part as tenant (tenant1.faithpod.com → "tenant1")
    const tenant = parts[0];

    // Validate tenant format (alphanumeric and hyphens only)
    if (!/^[a-z0-9-]+$/i.test(tenant)) {
      console.warn(`Invalid tenant format: ${tenant}`);
      return null;
    }

    console.log('[TenantService] Extracted tenant:', tenant);
    return tenant;
  }

  /**
   * Get stored tenant ID from sessionStorage
   */
  getTenantId(): string | null {
    try {
      return sessionStorage.getItem(this.TENANT_KEY);
    } catch (error) {
      console.error('Error reading tenant from sessionStorage:', error);
      return null;
    }
  }

  /**
   * Store tenant ID in sessionStorage
   */
  setTenantId(tenantId: string): void {
    try {
      sessionStorage.setItem(this.TENANT_KEY, tenantId);
      this.tenantSubject.next(tenantId);
    } catch (error) {
      console.error('Error storing tenant in sessionStorage:', error);
    }
  }

  /**
   * Clear tenant from sessionStorage
   */
  clearTenant(): void {
    try {
      sessionStorage.removeItem(this.TENANT_KEY);
      this.tenantSubject.next(null);
    } catch (error) {
      console.error('Error clearing tenant from sessionStorage:', error);
    }
  }

  /**
   * Check if current tenant is valid
   * A tenant is valid if it exists in storage and matches the current subdomain
   */
  isValidTenant(): boolean {
    const storedTenant = this.getTenantId();
    const currentTenant = this.getTenantFromSubdomain();

    // In development mode (localhost), tenant is optional
    if (currentTenant === null) {
      return true;
    }

    // If we have a subdomain tenant, it must match stored tenant
    return storedTenant === currentTenant;
  }

  /**
   * Initialize tenant context from subdomain
   * Should be called on app startup
   */
  initializeTenantContext(): void {
    const subdomainTenant = this.getTenantFromSubdomain();

    if (subdomainTenant) {
      // Always set the tenant from the current subdomain
      // This ensures we use the correct tenant even if sessionStorage has stale data
      console.log('[TenantService] Initializing tenant context:', subdomainTenant);
      this.setTenantId(subdomainTenant);
    } else {
      // No tenant in subdomain, clear any stored tenant
      console.log('[TenantService] No tenant found in subdomain, clearing stored tenant');
      this.clearTenant();
    }
  }

  /**
   * Validate tenant on navigation
   * Returns true if tenant context is valid, false otherwise
   */
  validateTenant(): boolean {
    const isValid = this.isValidTenant();

    if (!isValid) {
      console.warn('Tenant validation failed');
      this.clearTenant();
    }

    return isValid;
  }

  /**
   * Get dynamic API URL based on current subdomain
   * Examples:
   * - demo.localhost → "http://demo.localhost:8000/api" (tenant-specific)
   * - test.localhost → "http://test.localhost:8000/api" (tenant-specific)
   * - localhost → "http://127.0.0.1:8000/api" (central admin)
   * - tenant1.faithpod.com → "https://tenant1.faithpod.com/api"
   */
  getApiUrl(): string {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol; // http: or https:
    const port = environment.apiPort;

    // Check if we're on a tenant subdomain
    const hasTenantSubdomain = this.getTenantFromSubdomain() !== null;

    // If on tenant subdomain, MUST use subdomain in API URL for Laravel tenancy to work
    if (hasTenantSubdomain) {
      let apiUrl = `${protocol}//${hostname}`;
      if (port) {
        apiUrl += `:${port}`;
      }
      apiUrl += '/api';
      console.log('[TenantService] Tenant subdomain detected, using:', apiUrl);
      return apiUrl;
    }

    // For central admin (no subdomain), use static API URL if configured
    if (environment.apiUrl) {
      console.log('[TenantService] Central admin, using static API URL:', environment.apiUrl);
      return environment.apiUrl;
    }

    // Fallback: build from hostname
    let apiUrl = `${protocol}//${hostname}`;
    if (port) {
      apiUrl += `:${port}`;
    }
    apiUrl += '/api';

    console.log('[TenantService] Constructed API URL:', apiUrl, 'from hostname:', hostname);
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
