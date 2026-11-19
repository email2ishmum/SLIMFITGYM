import { STUDIO_CONTACT } from '../data/originalGymData';

export interface InquiryFormData {
  name: string;
  phone: string;
  pkg: string;
  batch: string;
  message: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<'name' | 'phone', string>>;
}

export function normalizeBdMobile(raw: string): string {
  const digits = raw.replace(/[\s\-()+]/g, '');
  if (digits.startsWith('8801') && digits.length === 13) {
    return digits.slice(2);
  }
  return digits;
}

export function validateInquiryForm(data: InquiryFormData): InquiryValidationResult {
  const errors: Partial<Record<'name' | 'phone', string>> = {};

  if (!data.name.trim()) {
    errors.name = 'Please enter your full name.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const normalized = normalizeBdMobile(data.phone);
  if (!data.phone.trim()) {
    errors.phone = 'Please enter your WhatsApp or phone number.';
  } else if (!/^01[3-9]\d{8}$/.test(normalized)) {
    errors.phone = 'Please enter a valid Bangladesh mobile number (e.g., 017XX-XXXXXX).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatWhatsAppMessage(data: InquiryFormData): string {
  let text =
    `Hello Slim Fit Gym, I would like to inquire about joining!\n\n` +
    `Name: ${data.name.trim()}\n` +
    `Phone: ${data.phone.trim()}\n` +
    `Package: ${data.pkg}\n` +
    `Preferred Slot: ${data.batch}`;

  const trimmedMsg = data.message.trim();
  if (trimmedMsg) {
    text += `\nMessage: ${trimmedMsg}`;
  }
  return text;
}

export function buildWhatsAppInquiryUrl(data: InquiryFormData): string {
  const text = formatWhatsAppMessage(data);
  return `https://wa.me/${STUDIO_CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
