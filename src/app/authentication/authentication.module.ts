import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TermsComponent } from './terms/terms.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    TermsComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    NgScrollbarModule

  ],
  providers: [
    
  ]
})
export class AuthenticationModule { }
