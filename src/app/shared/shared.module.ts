import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout-components/footer/footer.component';
import { HeaderComponent } from './layout-components/header/header.component';
import { ContentLayoutComponent } from './layout-components/layout/content-layout/content-layout.component';
import { ErrorLayoutComponent } from './layout-components/layout/error-layout/error-layout.component';
import { LoaderComponent } from './layout-components/loader/loader.component';
import { PageHeaderComponent } from './layout-components/page-header/page-header.component';
import { SidebarComponent } from './layout-components/sidebar/sidebar.component';
import { TabToTopComponent } from './layout-components/tab-to-top/tab-to-top.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToggleThemeDirective } from './directives/toggle-theme.directive';
import { FullscreenDirective } from './directives/fullscreen-toggle.directive';
import { HoverEffectSidebarDirective } from './directives/hover-effect-sidebar.directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ElementCardHeaderComponent } from './layout-components/element-card-header/element-card-header.component';
import { AuthService } from './services/auth.service';
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';
import { SearchComponentComponent } from './layout-components/search-component/search-component.component';
import { HasPermissionDirective } from './directives/has-permission.directive';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ContentLayoutComponent,
    ErrorLayoutComponent,
    LoaderComponent,
    PageHeaderComponent,
    SidebarComponent,
    TabToTopComponent,
    ToggleThemeDirective,
    FullscreenDirective,
    HoverEffectSidebarDirective,
    ElementCardHeaderComponent,
    SearchComponentComponent,
    HasPermissionDirective
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    NgScrollbarModule,
    ColorPickerModule,
    FormsModule,
    MatProgressBarModule,
    NgbModule,
  ],
  exports : [
    PageHeaderComponent,
    ElementCardHeaderComponent,
    HasPermissionDirective,
  ],
  providers:[
    // {
    //   provide: PERFECT_SCROLLBAR_CONFIG,
    //   useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    // },
    AuthService
  ]
})
export class SharedModule { }
