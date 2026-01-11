import { Injectable } from '@angular/core';
import { TenantTheme } from './tenant.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'tenant_theme';
  private readonly DEFAULT_THEME: TenantTheme = {
    primaryColor: '23, 83, 81', // Default primary color from _variables.scss
  };

  constructor() {}

  /**
   * Apply tenant theme to the application
   */
  applyTheme(theme: TenantTheme | null): void {
    if (!theme) {
      // If no theme provided, use default theme
      this.applyDefaultTheme();
      return;
    }

    // Store theme in session storage
    this.saveTheme(theme);

    // Apply theme to CSS custom properties
    const root = document.documentElement;

    if (theme.primaryColor) {
      root.style.setProperty('--primary-rgb', theme.primaryColor);
      // Update derived primary colors
      root.style.setProperty('--primary-bg-color', `rgb(${theme.primaryColor})`);
      root.style.setProperty('--primary-bg-hover', `rgba(${theme.primaryColor}, 0.9)`);
      root.style.setProperty('--primary-bg-border', `rgb(${theme.primaryColor})`);
      root.style.setProperty('--primary01', `rgba(${theme.primaryColor}, 0.1)`);
      root.style.setProperty('--primary02', `rgba(${theme.primaryColor}, 0.2)`);
      root.style.setProperty('--primary03', `rgba(${theme.primaryColor}, 0.3)`);
      root.style.setProperty('--primary04', `rgba(${theme.primaryColor}, 0.4)`);
      root.style.setProperty('--primary05', `rgba(${theme.primaryColor}, 0.5)`);
      root.style.setProperty('--primary06', `rgba(${theme.primaryColor}, 0.6)`);
      root.style.setProperty('--primary07', `rgba(${theme.primaryColor}, 0.7)`);
      root.style.setProperty('--primary08', `rgba(${theme.primaryColor}, 0.8)`);
      root.style.setProperty('--primary09', `rgba(${theme.primaryColor}, 0.9)`);
      root.style.setProperty('--primary005', `rgba(${theme.primaryColor}, 0.05)`);
    }

    if (theme.secondaryColor) {
      // secondaryColor comes as RGB format from API
      const isRgbFormat = theme.secondaryColor.includes(',');
      if (isRgbFormat) {
        // RGB format: "167, 32, 32"
        root.style.setProperty('--secondary-rgb', theme.secondaryColor);
        root.style.setProperty('--secondary', `rgb(${theme.secondaryColor})`);
      } else {
        // Hex format (fallback)
        root.style.setProperty('--secondary', theme.secondaryColor);
      }
    }

    if (theme.backgroundColor) {
      root.style.setProperty('--background-color', theme.backgroundColor);
      // Also update body background if needed
      document.body.style.backgroundColor = theme.backgroundColor;
    }

    if (theme.successColor) {
      // Success color comes as hex from API
      root.style.setProperty('--success', theme.successColor);
      root.style.setProperty('--success-bg', `${theme.successColor}1a`); // 10% opacity
      root.style.setProperty('--success-border', theme.successColor);
    }

    if (theme.dangerColor) {
      // Danger color comes as hex from API
      root.style.setProperty('--danger', theme.dangerColor);
      root.style.setProperty('--danger-bg', `${theme.dangerColor}1a`); // 10% opacity
      root.style.setProperty('--danger-border', theme.dangerColor);
    }

    if (theme.warningColor) {
      // Warning color comes as hex from API
      root.style.setProperty('--warning', theme.warningColor);
      root.style.setProperty('--warning-bg', `${theme.warningColor}1a`); // 10% opacity
      root.style.setProperty('--warning-border', theme.warningColor);
    }

    if (theme.infoColor) {
      // Info color comes as hex from API
      root.style.setProperty('--info', theme.infoColor);
      root.style.setProperty('--info-bg', `${theme.infoColor}1a`); // 10% opacity
      root.style.setProperty('--info-border', theme.infoColor);
    }

    console.log('[ThemeService] Applied tenant theme:', theme);
  }

  /**
   * Apply default theme (for central admin or when no tenant theme is available)
   */
  applyDefaultTheme(): void {
    this.clearStoredTheme();
    const root = document.documentElement;

    // Reset to default values from _variables.scss
    root.style.setProperty('--primary-rgb', this.DEFAULT_THEME.primaryColor!);
    root.style.setProperty('--primary-bg-color', `rgb(${this.DEFAULT_THEME.primaryColor})`);
    root.style.setProperty('--primary-bg-hover', `rgba(${this.DEFAULT_THEME.primaryColor}, 0.9)`);
    root.style.setProperty('--primary-bg-border', `rgb(${this.DEFAULT_THEME.primaryColor})`);
    root.style.setProperty('--primary01', `rgba(${this.DEFAULT_THEME.primaryColor}, 0.1)`);
    root.style.setProperty('--primary02', `rgba(${this.DEFAULT_THEME.primaryColor}, 0.2)`);
    root.style.setProperty('--primary03', `rgba(${this.DEFAULT_THEME.primaryColor}, 0.3)`);
    root.style.setProperty('--primary04', `rgba(${this.DEFAULT_THEME.primaryColor}, 0.4)`);
    root.style.setProperty('--primary05', `rgba(${this.DEFAULT_THEME.primaryColor}, 0.5)`);
    root.style.setProperty('--primary06', `rgba(${this.DEFAULT_THEME.primaryColor}, 0.6)`);
    root.style.setProperty('--primary07', `rgba(${this.DEFAULT_THEME.primaryColor}, 0.7)`);
    root.style.setProperty('--primary08', `rgba(${this.DEFAULT_THEME.primaryColor}, 0.8)`);
    root.style.setProperty('--primary09', `rgba(${this.DEFAULT_THEME.primaryColor}, 0.9)`);
    root.style.setProperty('--primary005', `rgba(${this.DEFAULT_THEME.primaryColor}, 0.05)`);

    console.log('[ThemeService] Applied default theme');
  }

  /**
   * Get stored theme from session storage
   */
  getStoredTheme(): TenantTheme | null {
    try {
      const themeJson = sessionStorage.getItem(this.THEME_STORAGE_KEY);
      if (themeJson) {
        return JSON.parse(themeJson) as TenantTheme;
      }
      return null;
    } catch (error) {
      console.error('Error reading theme from sessionStorage:', error);
      return null;
    }
  }

  /**
   * Save theme to session storage
   */
  saveTheme(theme: TenantTheme): void {
    try {
      sessionStorage.setItem(this.THEME_STORAGE_KEY, JSON.stringify(theme));
    } catch (error) {
      console.error('Error saving theme to sessionStorage:', error);
    }
  }

  /**
   * Clear stored theme from session storage
   */
  clearStoredTheme(): void {
    try {
      sessionStorage.removeItem(this.THEME_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing theme from sessionStorage:', error);
    }
  }

  /**
   * Initialize theme from stored value or apply default
   */
  initializeTheme(): void {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      this.applyTheme(storedTheme);
    } else {
      this.applyDefaultTheme();
    }
  }
}
