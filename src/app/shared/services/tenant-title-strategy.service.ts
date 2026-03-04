import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TenantService } from './tenant.service';

@Injectable({ providedIn: 'root' })
export class TenantTitleStrategy extends TitleStrategy {
  constructor(private title: Title, private tenantService: TenantService) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot);
    const tenantName = this.tenantService.getTenantName();

    if (pageTitle) {
      this.title.setTitle(tenantName ? `${tenantName} - ${pageTitle}` : pageTitle);
    } else if (tenantName) {
      this.title.setTitle(tenantName);
    }
  }
}
