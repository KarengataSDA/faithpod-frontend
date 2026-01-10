import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

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
    validation_url?: string;
    confirmation_url?: string;
  };
  sms?: {
    partner_id?: string;
    api_key?: string;
    shortcode?: string;
    url?: string;
  };
  hashlix?: {
    api_key?: string;
  };
}

@Component({
  selector: 'app-tenant-configuration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tenant-configuration.component.html',
  styleUrl: './tenant-configuration.component.scss'
})
export class TenantConfigurationComponent implements OnInit, OnDestroy {
  @Input() tenantId!: string;

  configForm!: FormGroup;
  isLoading: boolean = false;
  isSaving: boolean = false;
  errorMessage: string = '';

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
    private http: HttpClient
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
        mailer: [''],
        host: [''],
        port: [''],
        username: [''],
        password: [''],
        encryption: [''],
        from_address: [''],
        from_name: ['']
      }),
      mpesa: this.formBuilder.group({
        consumer_key: [''],
        consumer_secret: [''],
        shortcode: [''],
        passkey: [''],
        callback_url: [''],
        validation_url: [''],
        confirmation_url: ['']
      }),
      sms: this.formBuilder.group({
        partner_id: [''],
        api_key: [''],
        shortcode: [''],
        url: ['']
      }),
      hashlix: this.formBuilder.group({
        api_key: ['']
      })
    });
  }

  toggleSection(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  loadAppConfig(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const token = sessionStorage.getItem('central_admin_token');
    const apiUrl = `http://127.0.0.1:${environment.apiPort}/api`;
    const url = `${apiUrl}/tenants/${this.tenantId}/app-config`;

    this.http.get<AppConfig>(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (config) => {
        this.isLoading = false;

        // Patch form with loaded config
        this.configForm.patchValue({
          mail: config.mail || {},
          mpesa: config.mpesa || {},
          sms: config.sms || {},
          hashlix: config.hashlix || {}
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to load app configuration';
        console.error('Error loading app config:', error);
      }
    });
  }

  saveAppConfig(): void {
    if (this.configForm.invalid) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Please fix form errors',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    const token = sessionStorage.getItem('central_admin_token');
    const apiUrl = `http://127.0.0.1:${environment.apiPort}/api`;
    const url = `${apiUrl}/tenants/${this.tenantId}/app-config`;

    // Only send non-empty configuration sections
    const formData: any = {};
    const formValue = this.configForm.value;

    Object.keys(formValue).forEach(section => {
      const sectionData = formValue[section];
      const filteredData: any = {};
      let hasData = false;

      Object.keys(sectionData).forEach(key => {
        if (sectionData[key] && sectionData[key].trim() !== '') {
          filteredData[key] = sectionData[key];
          hasData = true;
        }
      });

      if (hasData) {
        formData[section] = filteredData;
      }
    });

    this.http.put(url, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.isSaving = false;
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'App configuration saved successfully',
          showConfirmButton: false,
          timer: 3000
        });
      },
      error: (error) => {
        this.isSaving = false;
        this.errorMessage = error.error?.message || 'Failed to save app configuration';
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: this.errorMessage,
          showConfirmButton: false,
          timer: 3000
        });
        console.error('Error saving app config:', error);
      }
    });
  }

  resetForm(): void {
    this.loadAppConfig();
  }

  isSensitiveField(fieldName: string): boolean {
    const sensitiveFields = [
      'password', 'api_key', 'consumer_key', 'consumer_secret',
      'passkey', 'partner_id'
    ];
    return sensitiveFields.includes(fieldName);
  }

  toggleFieldVisibility(fieldId: string): void {
    this.visibleFields[fieldId] = !this.visibleFields[fieldId];
  }

  isFieldVisible(fieldId: string): boolean {
    return this.visibleFields[fieldId] || false;
  }
}
