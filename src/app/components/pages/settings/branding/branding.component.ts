import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { TenantService } from 'src/app/shared/services/tenant.service';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { MediaConfirmResponse } from 'src/app/shared/services/media.service';

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
  links: Array<{ url: string; name: string }>;
  logo_url: string | null;
  banner_url: string | null;
}

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss'],
  standalone: false,
})
export class BrandingComponent implements OnInit, OnDestroy {
  themeForm!: FormGroup;
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  logoUrl: string | null = null;
  bannerUrl: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private tenantService: TenantService,
    private themeService: ThemeService
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
        primaryColor:    ['#175351'],
        secondaryColor:  ['#433B97'],
        backgroundColor: ['#f5f5f5'],
        successColor:    ['#28a745'],
        dangerColor:     ['#dc3545'],
        warningColor:    ['#ffc107'],
        infoColor:       ['#17a2b8']
      }),
      links: this.formBuilder.array([])
    });
  }

  get linksArray(): FormArray {
    return this.themeForm.get('links') as FormArray;
  }

  createLinkFormGroup(url = '', name = ''): FormGroup {
    return this.formBuilder.group({
      url:  [url,  [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      name: [name, Validators.required]
    });
  }

  addLink(): void { this.linksArray.push(this.createLinkFormGroup()); }
  removeLink(index: number): void { this.linksArray.removeAt(index); }

  loadThemeConfig(): void {
    this.isLoading = true;
    this.errorMessage = '';
    const url = `${this.tenantService.getApiUrl()}/tenant/theme-config`;

    this.http.get<ThemeConfig>(url)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (config) => {
          this.isLoading = false;
          this.logoUrl   = config.logo_url;
          this.bannerUrl = config.banner_url;
          this.themeForm.patchValue({
            colors: {
              primaryColor:    config.colors.primaryColor    || '#175351',
              secondaryColor:  config.colors.secondaryColor  || '#433B97',
              backgroundColor: config.colors.backgroundColor || '#f5f5f5',
              successColor:    config.colors.successColor    || '#28a745',
              dangerColor:     config.colors.dangerColor     || '#dc3545',
              warningColor:    config.colors.warningColor    || '#ffc107',
              infoColor:       config.colors.infoColor       || '#17a2b8'
            }
          });
          this.linksArray.clear();
          (config.links || []).forEach(link =>
            this.linksArray.push(this.createLinkFormGroup(link.url, link.name))
          );
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Failed to load branding configuration';
        }
      });
  }

  saveThemeConfig(): void {
    if (this.themeForm.invalid) {
      Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: 'Please fix form errors', showConfirmButton: false, timer: 3000 });
      return;
    }

    this.isSaving = true;
    const url = `${this.tenantService.getApiUrl()}/tenant/theme-config`;
    const payload = { ...this.themeForm.value, logo_url: this.logoUrl, banner_url: this.bannerUrl };

    this.http.put(url, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSaving = false;
          const colors = this.themeForm.value.colors;
          this.themeService.applyTheme({
            primaryColor:    this.hexToRgb(colors.primaryColor),
            secondaryColor:  this.hexToRgb(colors.secondaryColor),
            backgroundColor: colors.backgroundColor,
            successColor:    colors.successColor,
            dangerColor:     colors.dangerColor,
            warningColor:    colors.warningColor,
            infoColor:       colors.infoColor,
          });
          Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Branding saved successfully', showConfirmButton: false, timer: 3000 });
        },
        error: (err) => {
          this.isSaving = false;
          this.errorMessage = err.error?.message || 'Failed to save branding';
          Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: this.errorMessage, showConfirmButton: false, timer: 3000 });
        }
      });
  }

  resetForm(): void { this.loadThemeConfig(); }

  updateFormColor(field: string, color: string): void {
    this.themeForm.get('colors')?.patchValue({ [field]: color });
  }

  onLogoUploaded(response: MediaConfirmResponse): void {
    this.logoUrl = response.thumb_url ?? response.url;
  }

  onLogoRemoved(): void { this.logoUrl = null; }

  onBannerUploaded(response: MediaConfirmResponse): void {
    this.bannerUrl = response.medium_url ?? response.url;
  }

  onBannerRemoved(): void { this.bannerUrl = null; }

  private hexToRgb(hex: string): string {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }
}
