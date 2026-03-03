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
import { TenantManagementComponent } from './tenant-management/tenant-management.component';
import { TenantViewComponent } from './tenant-view/tenant-view.component';
import { TenantEditComponent } from './tenant-edit/tenant-edit.component';
import { AcceptInviteComponent } from './accept-invite/accept-invite.component';

const routes: Routes = [
  {
    path: 'auth', children:[
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'accept-invite', component: AcceptInviteComponent },
      { path: 'email-verification/:id/:hash', component: VerifyEmailComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'verification-notice', component: VerificationNoticeComponent }
    ]
  },
  // Central Admin routes (accessible only on root domain)
  { path: 'tenants', component: TenantManagementComponent },
  { path: 'tenants/view/:id', component: TenantViewComponent },
  { path: 'tenants/edit/:id', component: TenantEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
