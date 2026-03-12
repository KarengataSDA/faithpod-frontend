import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hymn, HymnLanguage } from '../models/hymn';

@Injectable({
  providedIn: 'root',
})
export class CentralHymnalService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/hymnal';

  private get headers() {
    const token = sessionStorage.getItem('central_admin_token');
    return { Authorization: `Bearer ${token}` };
  }

  // ─── Hymn Languages ───────────────────────────────────────────────────

  getLanguages(): Observable<HymnLanguage[]> {
    return this.http.get<HymnLanguage[]>(`${this.baseUrl}/languages`, { headers: this.headers });
  }

  getLanguage(id: number): Observable<HymnLanguage> {
    return this.http.get<HymnLanguage>(`${this.baseUrl}/languages/${id}`, { headers: this.headers });
  }

  createLanguage(data: Partial<HymnLanguage>): Observable<HymnLanguage> {
    return this.http.post<HymnLanguage>(`${this.baseUrl}/languages`, data, { headers: this.headers });
  }

  updateLanguage(id: number, data: Partial<HymnLanguage>): Observable<HymnLanguage> {
    return this.http.put<HymnLanguage>(`${this.baseUrl}/languages/${id}`, data, { headers: this.headers });
  }

  deleteLanguage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/languages/${id}`, { headers: this.headers });
  }

  // ─── Hymns ────────────────────────────────────────────────────────────

  getHymns(languageId?: number, search?: string): Observable<Hymn[]> {
    let url = `${this.baseUrl}/hymns`;
    const params: string[] = [];
    if (languageId) params.push(`language_id=${languageId}`);
    if (search) params.push(`search=${encodeURIComponent(search)}`);
    if (params.length) url += '?' + params.join('&');

    return this.http.get<Hymn[]>(url, { headers: this.headers });
  }

  getHymn(id: number): Observable<Hymn> {
    return this.http.get<Hymn>(`${this.baseUrl}/hymns/${id}`, { headers: this.headers });
  }

  createHymn(data: Partial<Hymn>): Observable<Hymn> {
    return this.http.post<Hymn>(`${this.baseUrl}/hymns`, data, { headers: this.headers });
  }

  updateHymn(id: number, data: Partial<Hymn>): Observable<Hymn> {
    return this.http.put<Hymn>(`${this.baseUrl}/hymns/${id}`, data, { headers: this.headers });
  }

  deleteHymn(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/hymns/${id}`, { headers: this.headers });
  }
}
