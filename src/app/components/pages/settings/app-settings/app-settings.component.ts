import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { TenantService } from 'src/app/shared/services/tenant.service';

interface AppConfig {
  mail?: {
    mailer?: string;
    host?: string;
    port?: string;
    username?: string;
    password?: string;
    encryption?: string;
    from_address?: string;
    from_name?: string;
  };
  mpesa?: {
    consumer_key?: string;
    consumer_secret?: string;
    shortcode?: string;
    passkey?: string;
    callback_url?: string;
    environment?: string;
  };
  sms?: {
    partner_id?: string;
    api_key?: string;
    shortcode?: string;
    url?: string;
  };
  hashlix?: {
    api_key?: string;
    api_secret?: string;
    sender_id?: string;
    url?: string;
  };
}

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
  standalone: false,
  
})
export class AppSettingsComponent implements OnInit, OnDestroy {
  configForm!: FormGroup;
  isLoading = false;
  isSaving = false;
  errorMessage = '';

  expandedSections: { [key: string]: boolean } = {
    mail: false,
    mpesa: false,
    sms: false,
    hashlix: false
  };

  visibleFields: { [key: string]: boolean } = {};

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private tenantService: TenantService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadAppConfig();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeForm(): void {
    this.configForm = this.formBuilder.group({
      mail: this.formBuilder.group({
        mailer:       [''],
        host:         [''],
        port:         [''],
        username:     [''],
        password:     [''],
        encryption:   [''],
        from_address: [''],
        from_name:    ['']
      }),
      mpesa: this.formBuilder.group({
        consumer_key:    [''],
        consumer_secret: [''],
        shortcode:       [''],
        passkey:         [''],
        callback_url:    [''],
        environment:     ['']
      }),
      sms: this.formBuilder.group({
        partner_id: [''],
        api_key:    [''],
        shortcode:  [''],
        url:        ['']
      }),
      hashlix: this.formBuilder.group({
        api_key:   [''],
        api_secret:[''],
        sender_id: [''],
        url:       ['']
      })
    });
  }

  toggleSection(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  loadAppConfig(): void {
    this.isLoading = true;
    this.errorMessage = '';
    const url = `${this.tenantService.getApiUrl()}/app-config`;

    this.http.get<AppConfig>(url)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (config) => {
          this.isLoading = false;
          this.configForm.patchValue({
            mail:    config.mail    || {},
            mpesa:   config.mpesa   || {},
            sms:     config.sms     || {},
            hashlix: config.hashlix || {}
          });
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Failed to load configuration';
        }
      });
  }

  saveAppConfig(): void {
    if (this.configForm.invalid) {
      Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: 'Please fix form errors', showConfirmButton: false, timer: 3000 });
      return;
    }

    this.isSaving = true;
    const url = `${this.tenantService.getApiUrl()}/tenant/app-config`;
    const formValue = this.configForm.value;

    // Only send sections that have at least one non-empty value
    const payload: any = {};
    Object.keys(formValue).forEach(section => {
      const sectionData = formValue[section];
      const filtered: any = {};
      let hasData = false;
      Object.keys(sectionData).forEach(key => {
        const val = sectionData[key];
        if (val && String(val).trim() !== '' && val !== '********') {
          filtered[key] = val;
          hasData = true;
        }
      });
      if (hasData) payload[section] = filtered;
    });

    this.http.put(url, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.loadAppConfig();
          Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Configuration saved successfully', showConfirmButton: false, timer: 3000 });
        },
        error: (err) => {
          this.isSaving = false;
          this.errorMessage = err.error?.message || 'Failed to save configuration';
          Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: this.errorMessage, showConfirmButton: false, timer: 3000 });
        }
      });
  }

  resetForm(): void { this.loadAppConfig(); }

  isSensitiveField(fieldName: string): boolean {
    return ['password', 'api_key', 'api_secret', 'consumer_key', 'consumer_secret', 'passkey', 'partner_id'].includes(fieldName);
  }

  toggleFieldVisibility(fieldId: string): void {
    this.visibleFields[fieldId] = !this.visibleFields[fieldId];
  }

  isFieldVisible(fieldId: string): boolean {
    return this.visibleFields[fieldId] || false;
  }
}
