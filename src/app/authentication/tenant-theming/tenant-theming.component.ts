import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

interface ThemeConfig {
  colors: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    successColor: string;
    dangerColor: string;
    warningColor: string;
    infoColor: string;
  };
  links: Array<{
    url: string;
    name: string;
  }>;
}

@Component({
  selector: 'app-tenant-theming',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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
      colors: this.formBuilder.group({
        primaryColor: ['#ffd300'],
        secondaryColor: ['#433B97'],
        backgroundColor: ['#f5f5f5'],
        successColor: ['#28a745'],
        dangerColor: ['#dc3545'],
        warningColor: ['#ffc107'],
        infoColor: ['#17a2b8']
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

        // Patch colors
        this.themeForm.patchValue({
          colors: {
            primaryColor: config.colors.primaryColor || '#ffd300',
            secondaryColor: config.colors.secondaryColor || '#433B97',
            backgroundColor: config.colors.backgroundColor || '#f5f5f5',
            successColor: config.colors.successColor || '#28a745',
            dangerColor: config.colors.dangerColor || '#dc3545',
            warningColor: config.colors.warningColor || '#ffc107',
            infoColor: config.colors.infoColor || '#17a2b8'
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
      next: () => {
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

  /**
   * Update form color when color picker changes
   * This keeps the color picker and text input in sync
   */
  updateFormColor(field: string, color: string): void {
    const colorsGroup = this.themeForm.get('colors');
    if (colorsGroup) {
      colorsGroup.patchValue({ [field]: color });
    }
  }

  /**
   * Convert hex color to RGB format
   * Used for preview and compatibility with theme service
   */
  private hexToRgb(hex: string): string {
    // Remove # if present
    hex = hex.replace('#', '');

    // Convert to RGB
    let r: number, g: number, b: number;
    if (hex.length === 3) {
      r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
      g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
      b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
    } else {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }

    return `${r}, ${g}, ${b}`;
  }
}
