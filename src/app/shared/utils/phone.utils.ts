/**
 * Normalizes a phone number to M-Pesa safe format (254XXXXXXXXX)
 *
 * Conversion Rules:
 * - 0712345678    → 254712345678
 * - +254712345678 → 254712345678
 * - 712345678     → 254712345678
 * - 254712345678  → 254712345678
 *
 * @param phone - The phone number in any format
 * @returns The normalized phone number in 254XXXXXXXXX format
 */
export function normalizePhoneNumber(phone: string): string {
  if (!phone) return '';

  // Remove any spaces, dashes, or other non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, '');

  // Remove + if present
  cleaned = cleaned.replace(/^\+/, '');

  // Handle different formats
  if (cleaned.startsWith('0')) {
    // 0712345678 → 254712345678
    cleaned = '254' + cleaned.substring(1);
  } else if (cleaned.startsWith('254')) {
    // Already in correct format
  } else if (cleaned.length === 9 && /^[17]/.test(cleaned)) {
    // 712345678 or 1xxxxxxxx → 254712345678
    cleaned = '254' + cleaned;
  }

  return cleaned;
}

/**
 * Validates if a phone number is in valid M-Pesa format
 * @param phone - The phone number to validate (should be normalized first)
 * @returns true if valid M-Pesa format
 */
export function isValidMpesaPhone(phone: string): boolean {
  const mpesaRegex = /^254[17]\d{8}$/;
  return mpesaRegex.test(phone);
}

/**
 * Angular reactive-form validator for phone numbers.
 * Normalizes the value first, then checks for exactly 12 digits.
 * Passes if the field is empty (use Validators.required alongside if mandatory).
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const normalized = normalizePhoneNumber(String(value));
    return /^\d{12}$/.test(normalized) ? null : { invalidPhone: true };
  };
}
