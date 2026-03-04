import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TenantService } from './tenant.service';

export interface MediaConfirmResponse {
  id: number;
  url: string;
  thumb_url?: string;
  medium_url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private http = inject(HttpClient);
  private tenantService = inject(TenantService);

  get tenantApiUrl(): string {
    return this.tenantService.getApiUrl();
  }

  get adminApiUrl(): string {
    return environment.apiUrl;
  }

  /**
   * Upload a file to Laravel.
   * - 'member': tenant API, auth via AuthInterceptor
   * - 'tenant': central admin API, auth via central_admin_token
   * - 'tenant-self': tenant API (current tenant's own media), auth via AuthInterceptor
   */
  uploadMedia(
    entityType: 'member' | 'tenant' | 'tenant-self',
    entityId: string | null,
    collection: string,
    file: File
  ): Observable<HttpEvent<MediaConfirmResponse>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('collection', collection);

    let url: string;
    const headers: Record<string, string> = {};

    if (entityType === 'member') {
      url = `${this.tenantApiUrl}/members/me/media`;
    } else if (entityType === 'tenant-self') {
      url = `${this.tenantApiUrl}/tenant/media/${collection}`;
    } else {
      url = `${this.adminApiUrl}/tenants/${entityId}/media/${collection}`;
      const token = sessionStorage.getItem('central_admin_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      headers: Object.keys(headers).length
        ? new HttpHeaders(headers)
        : undefined,
    });

    return this.http.request<MediaConfirmResponse>(req);
  }

  /**
   * Delete all media in a collection.
   */
  deleteMedia(
    entityType: 'member' | 'tenant' | 'tenant-self',
    entityId: string | null,
    collection: string
  ): Observable<{ message: string }> {
    if (entityType === 'member') {
      return this.http.delete<{ message: string }>(
        `${this.tenantApiUrl}/members/me/media`,
        { body: { collection } }
      );
    }

    if (entityType === 'tenant-self') {
      return this.http.delete<{ message: string }>(
        `${this.tenantApiUrl}/tenant/media/${collection}`
      );
    }

    return this.http.delete<{ message: string }>(
      `${this.adminApiUrl}/tenants/${entityId}/media/${collection}`
    );
  }
}
