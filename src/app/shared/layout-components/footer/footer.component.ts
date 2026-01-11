import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../services/tenant.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})
export class FooterComponent implements OnInit {

  constructor(private tenantService: TenantService) { }

  currentYear: number = new Date().getFullYear()
  tenantName: string = 'Demo SDA Church'

  ngOnInit(): void {
    // Get tenant name from service, fallback to default
    const storedTenantName = this.tenantService.getTenantName();
    if (storedTenantName) {
      this.tenantName = storedTenantName;
    }
  }

}
