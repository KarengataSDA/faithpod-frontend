import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TermsComponent } from './terms/terms.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerificationNoticeComponent } from './verification-notice/verification-notice.component';
import { UnauthorizedComponent } from '../components/pages/unauthorized/unauthorized.component';
import { CentralAdminRegisterComponent } from './central-admin-register/central-admin-register.component';
import { CentralAdminLoginComponent } from './central-admin-login/central-admin-login.component';
import { TenantManagementComponent } from './tenant-management/tenant-management.component';

const routes: Routes = [
  {
    path: 'auth', children:[
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterComponent },
      {path: 'email-verification/:id/:hash', component: VerifyEmailComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'reset-password', component: ResetPasswordComponent},
      {path: 'terms', component: TermsComponent},
      {path: 'verification-notice', component: VerificationNoticeComponent}
    ]
  },
  // Central Admin routes (accessible only on root domain)
  { path: 'tenants', component: TenantManagementComponent },
  {
    path: 'central-admin', children: [
      { path: 'register', component: CentralAdminRegisterComponent },
      { path: 'login', component: CentralAdminLoginComponent },
      { path: 'tenants', component: TenantManagementComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
