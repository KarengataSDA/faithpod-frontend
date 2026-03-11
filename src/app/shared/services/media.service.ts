import {
  HttpBackend,
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, of, map } from 'rxjs';
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
  private httpBackend = inject(HttpBackend);
  private tenantService = inject(TenantService);

  get tenantApiUrl(): string {
    return this.tenantService.getApiUrl();
  }

  get adminApiUrl(): string {
    return environment.apiUrl;
  }

  /**
   * Upload a file.
   * - 'member': tenant API, multipart through Laravel
   * - 'tenant-self': tenant API, multipart through Laravel
   * - 'announcement': tenant API — POST /announcements/{id}/media
   * - 'tenant': central admin — browser uploads directly to R2 via presigned URL
   */
  uploadMedia(
    entityType: 'member' | 'tenant' | 'tenant-self' | 'announcement',
    entityId: string | null,
    collection: string,
    file: File
  ): Observable<HttpEvent<MediaConfirmResponse>> {
    if (entityType === 'tenant') {
      return this.uploadTenantViaPresignedUrl(entityId!, collection, file);
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('collection', collection);

    let url: string;
    if (entityType === 'member') {
      url = `${this.tenantApiUrl}/members/me/media`;
    } else if (entityType === 'announcement') {
      url = `${this.tenantApiUrl}/announcements/${entityId}/media`;
    } else {
      url = `${this.tenantApiUrl}/tenant/media/${collection}`;
    }

    return this.http.request<MediaConfirmResponse>(
      new HttpRequest('POST', url, formData, { reportProgress: true })
    );
  }

  /**
   * Delete all media in a collection.
   */
  deleteMedia(
    entityType: 'member' | 'tenant' | 'tenant-self' | 'announcement',
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

    if (entityType === 'announcement') {
      return this.http.delete<{ message: string }>(
        `${this.tenantApiUrl}/announcements/${entityId}/media`
      );
    }

    const token = sessionStorage.getItem('central_admin_token');
    return this.http.delete<{ message: string }>(
      `${this.adminApiUrl}/tenants/${entityId}/media/${collection}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  /**
   * Presigned URL flow for central admin tenant uploads:
   * 1. GET presigned PUT URL from Laravel
   * 2. PUT file directly to R2 (bypasses interceptors — R2 rejects extra headers)
   * 3. POST confirm to Laravel so it saves the CDN URL and cleans up the old file
   */
  private uploadTenantViaPresignedUrl(
    tenantId: string,
    collection: string,
    file: File
  ): Observable<HttpEvent<MediaConfirmResponse>> {
    const extension = (file.name.split('.').pop() ?? 'jpg').toLowerCase();
    const token = sessionStorage.getItem('central_admin_token');
    const authHeaders = { Authorization: `Bearer ${token}` };

    return this.http
      .get<{ upload_url: string; cdn_url: string; key: string }>(
        `${this.adminApiUrl}/tenants/${tenantId}/media/${collection}/presigned-url`,
        { params: { extension }, headers: authHeaders }
      )
      .pipe(
        switchMap(({ upload_url, cdn_url, key }) => {
          // Use HttpBackend directly so interceptors don't add Authorization header
          const r2Client = new HttpClient(this.httpBackend);
          const putReq = new HttpRequest('PUT', upload_url, file, {
            reportProgress: true,
            headers: new HttpHeaders({ 'Content-Type': file.type }),
          });

          return new Observable<HttpEvent<MediaConfirmResponse>>((observer) => {
            r2Client.request<void>(putReq).subscribe({
              next: (event) => {
                if (event.type === HttpEventType.UploadProgress) {
                  // Forward progress events so the component can show a progress bar
                  observer.next(event as unknown as HttpEvent<MediaConfirmResponse>);
                } else if (event.type === HttpEventType.Response) {
                  // Upload done — confirm to Laravel
                  this.http
                    .post<MediaConfirmResponse>(
                      `${this.adminApiUrl}/tenants/${tenantId}/media/${collection}/confirm`,
                      { cdn_url, key },
                      { headers: authHeaders }
                    )
                    .subscribe({
                      next: (response) => {
                        observer.next({
                          type: HttpEventType.Response,
                          body: response,
                        } as unknown as HttpEvent<MediaConfirmResponse>);
                        observer.complete();
                      },
                      error: (err) => observer.error(err),
                    });
                }
              },
              error: (err) => observer.error(err),
            });
          });
        })
      );
  }
}
