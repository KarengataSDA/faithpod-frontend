import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/components/pages/role/permission';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private http = inject(HttpClient);
  private tenantService = inject(TenantService);

  /**
   * Get dynamic base URL from tenant service
   */
  get baseUrl(): string {
    return this.tenantService.getApiUrl();
  }

  getAll():Observable<Permission[]> {
    return this.http.get<any>(this.baseUrl + '/permissions');
  }

}
