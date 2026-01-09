import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/components/pages/role/permission';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private http = inject(HttpClient)
    baseUrl = environment.apiUrl

  getAll():Observable<Permission[]> {
    return this.http.get<any>(this.baseUrl + '/permissions');
  }

}
