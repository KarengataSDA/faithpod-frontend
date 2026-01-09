import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SanitizationService {

  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Sanitize user input to prevent XSS attacks
   * Removes potentially dangerous HTML tags and scripts
   */
  sanitizeInput(input: string): string {
    if (!input) return '';

    // Remove HTML tags and script content
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
  }

  /**
   * Sanitize HTML content for safe rendering
   */
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.sanitize(1, html) || '';
  }

  /**
   * Sanitize URL for safe navigation
   */
  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.sanitize(4, url) || '';
  }

  /**
   * Sanitize resource URL for iframes, etc.
   */
  sanitizeResourceUrl(url: string): SafeResourceUrl {
    return this.sanitizer.sanitize(5, url) || '';
  }

  /**
   * Escape special characters for use in SQL-like queries
   * Note: This is a client-side helper. Server-side validation is still required!
   */
  escapeSqlLikeString(input: string): string {
    if (!input) return '';
    return input.replace(/[%_]/g, '\\$&');
  }

  /**
   * Validate and sanitize email addresses
   */
  sanitizeEmail(email: string): string {
    if (!email) return '';

    // Basic email validation pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmedEmail = email.trim().toLowerCase();

    return emailPattern.test(trimmedEmail) ? trimmedEmail : '';
  }

  /**
   * Sanitize phone numbers (remove non-numeric characters except +)
   */
  sanitizePhoneNumber(phone: string): string {
    if (!phone) return '';
    return phone.replace(/[^\d+]/g, '');
  }

  /**
   * Remove dangerous patterns from file names
   */
  sanitizeFileName(fileName: string): string {
    if (!fileName) return '';

    // Remove path traversal attempts and dangerous characters
    return fileName
      .replace(/\.\./g, '')
      .replace(/[\/\\]/g, '')
      .replace(/[<>:"|?*]/g, '')
      .trim();
  }

  /**
   * Validate and limit string length
   */
  limitLength(input: string, maxLength: number): string {
    if (!input) return '';
    return input.substring(0, maxLength);
  }

  /**
   * Sanitize numeric input
   */
  sanitizeNumber(input: string | number): number | null {
    const num = typeof input === 'string' ? parseFloat(input) : input;
    return !isNaN(num) && isFinite(num) ? num : null;
  }

  /**
   * Sanitize boolean input
   */
  sanitizeBoolean(input: any): boolean {
    if (typeof input === 'boolean') return input;
    if (typeof input === 'string') {
      const lowered = input.toLowerCase();
      return lowered === 'true' || lowered === '1' || lowered === 'yes';
    }
    return !!input;
  }

  /**
   * Whitelist-based validation for specific allowed values
   */
  validateAgainstWhitelist<T>(input: T, whitelist: T[]): T | null {
    return whitelist.includes(input) ? input : null;
  }
}
