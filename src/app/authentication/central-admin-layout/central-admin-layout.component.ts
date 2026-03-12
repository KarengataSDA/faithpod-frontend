import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-central-admin-layout',
  templateUrl: './central-admin-layout.component.html',
  styleUrls: ['./central-admin-layout.component.scss'],
  standalone: false
})
export class CentralAdminLayoutComponent {

  adminName: string = '';
  adminInitials: string = '';

  constructor(private router: Router) {
    const raw = sessionStorage.getItem('central_admin_user');
    if (raw) {
      const user = JSON.parse(raw);
      this.adminName = user.name || user.email || '';
      this.adminInitials = this.adminName
        .split(' ')
        .filter((w: string) => w.length > 0)
        .slice(0, 2)
        .map((w: string) => w[0].toUpperCase())
        .join('');
    }
  }

  isHymnalActive(): boolean {
    return this.router.url.startsWith('/hymnal');
  }

  logout(): void {
    sessionStorage.removeItem('central_admin_token');
    sessionStorage.removeItem('central_admin_user');
    this.router.navigate(['/auth/login']);
  }
}
