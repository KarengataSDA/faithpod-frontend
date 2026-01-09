import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './shared/guard/admin.guard';
import { ContentLayoutComponent } from './shared/layout-components/layout/content-layout/content-layout.component';
import { ErrorLayoutComponent } from './shared/layout-components/layout/error-layout/error-layout.component';
import { Content_Routes } from './shared/routes/error.routes';
import { landing_page_Routes } from './shared/routes/landingpage';
import { content } from './shared/routes/routes';
import { SwitcherOneRoute } from './shared/routes/switchers';
import { UnauthorizedComponent } from './components/pages/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: '', redirectTo:'auth/login', pathMatch: 'full'},
  {
    path:'', loadChildren: ()=> import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content
  },
  {
    path: '',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
  },
  // {
  //   path: '**',
  //   redirectTo: '/custompages/error400'
  // }

  { path: 'unauthorized', component: UnauthorizedComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
