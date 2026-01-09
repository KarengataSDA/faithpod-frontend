import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CdTimerModule } from 'angular-cd-timer';
import { BarRatingModule } from "ngx-bar-rating";
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';
import 'hammerjs';
import 'mousetrap'
import { NgxEchartsModule } from 'ngx-echarts';
import { MaterialModuleModule } from 'src/app/materialModule/material-module/material-module.module';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSliderModule } from 'ngx-slider-v2';
import { NgApexchartsModule } from 'ng-apexcharts';

//Custom angular notifier options
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    WidgetsComponent
    
  ],
  imports: [
    CommonModule,
    AppsRoutingModule,
    SharedModule,
    MaterialModuleModule,
    NgbModule,
    NotifierModule.withConfig(customNotifierOptions),
    SweetAlert2Module.forRoot(),
    FormsModule,
    CdTimerModule,
    ReactiveFormsModule,
    BarRatingModule,
    NgCircleProgressModule.forRoot(),
    NgScrollbarModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    GalleryModule,
    LightboxModule,
    NgSelectModule,
    NgxSliderModule,
    NgApexchartsModule
  ],
})
export class AppsModule { }
