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
   * Upload a file to Laravel which streams it directly to R2.
   * Returns an observable of HttpEvents so the caller can track upload progress.
   * entityType 'member' uses tenant API (token via AuthInterceptor);
   * entityType 'tenant' uses central admin API (token read from sessionStorage).
   */
  uploadMedia(
    entityType: 'member' | 'tenant',
    entityId: string | null,
    collection: string,
    file: File
  ): Observable<HttpEvent<MediaConfirmResponse>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('collection', collection);

    const url = entityType === 'member'
      ? `${this.tenantApiUrl}/members/me/media`
      : `${this.adminApiUrl}/tenants/${entityId}/media/${collection}`;

    // Admin requests need the central admin token; tenant requests are handled by AuthInterceptor
    const headers: Record<string, string> = {};
    if (entityType === 'tenant') {
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
    entityType: 'member' | 'tenant',
    entityId: string | null,
    collection: string
  ): Observable<{ message: string }> {
    if (entityType === 'member') {
      return this.http.delete<{ message: string }>(
        `${this.tenantApiUrl}/members/me/media`,
        { body: { collection } }
      );
    }

    return this.http.delete<{ message: string }>(
      `${this.adminApiUrl}/tenants/${entityId}/media/${collection}`
    );
  }
}
