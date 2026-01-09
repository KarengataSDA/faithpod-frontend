import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgApexchartsModule,
    NgChartsModule,
    NgbModule,
    FormsModule,
    LeafletModule,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
