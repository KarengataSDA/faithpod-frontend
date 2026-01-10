import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

interface ThemeConfig {
  basic: {
    brand_color: string;
    accent_color: string;
    background_color: string;
  };
  links: Array<{
    url: string;
    name: string;
  }>;
}

@Component({
  selector: 'app-tenant-theming',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tenant-theming.component.html',
  styleUrl: './tenant-theming.component.scss'
})
export class TenantThemingComponent implements OnInit, OnDestroy {
  @Input() tenantId!: string;

  themeForm!: FormGroup;
  isLoading: boolean = false;
  isSaving: boolean = false;
  errorMessage: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadThemeConfig();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeForm(): void {
    this.themeForm = this.formBuilder.group({
      basic: this.formBuilder.group({
        brand_color: ['#ffd300'],
        accent_color: ['#433B97'],
        background_color: ['#f5f5f5']
      }),
      links: this.formBuilder.array([])
    });
  }

  get linksArray(): FormArray {
    return this.themeForm.get('links') as FormArray;
  }

  createLinkFormGroup(url: string = '', name: string = ''): FormGroup {
    return this.formBuilder.group({
      url: [url, [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      name: [name, Validators.required]
    });
  }

  addLink(): void {
    this.linksArray.push(this.createLinkFormGroup());
  }

  removeLink(index: number): void {
    this.linksArray.removeAt(index);
  }

  loadThemeConfig(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const token = sessionStorage.getItem('central_admin_token');
    const apiUrl = `http://127.0.0.1:${environment.apiPort}/api`;
    const url = `${apiUrl}/tenants/${this.tenantId}/theme-config`;

    this.http.get<ThemeConfig>(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (config) => {
        this.isLoading = false;

        // Patch basic colors
        this.themeForm.patchValue({
          basic: {
            brand_color: config.basic.brand_color || '#ffd300',
            accent_color: config.basic.accent_color || '#433B97',
            background_color: config.basic.background_color || '#f5f5f5'
          }
        });

        // Clear existing links and add from config
        this.linksArray.clear();
        if (config.links && config.links.length > 0) {
          config.links.forEach(link => {
            this.linksArray.push(this.createLinkFormGroup(link.url, link.name));
          });
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to load theme configuration';
        console.error('Error loading theme config:', error);
      }
    });
  }

  saveThemeConfig(): void {
    if (this.themeForm.invalid) {
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
    const url = `${apiUrl}/tenants/${this.tenantId}/theme-config`;
    const formData = this.themeForm.value;

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
          title: 'Theme configuration saved successfully',
          showConfirmButton: false,
          timer: 3000
        });
      },
      error: (error) => {
        this.isSaving = false;
        this.errorMessage = error.error?.message || 'Failed to save theme configuration';
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: this.errorMessage,
          showConfirmButton: false,
          timer: 3000
        });
        console.error('Error saving theme config:', error);
      }
    });
  }

  resetForm(): void {
    this.loadThemeConfig();
  }
}
