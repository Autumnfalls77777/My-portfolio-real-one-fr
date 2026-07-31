const MAX_INPUT_LENGTH = 5000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;

/**
 * Sanitize a text input by trimming, limiting length, and stripping
 * control characters / null bytes that could be used for injection.
 */
export function sanitizeText(input, maxLength = MAX_INPUT_LENGTH) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .slice(0, maxLength)
    .trim();
}

export function sanitizeName(input) {
  return sanitizeText(input, MAX_NAME_LENGTH);
}

export function sanitizeEmail(input) {
  const cleaned = sanitizeText(input, MAX_EMAIL_LENGTH).toLowerCase();
  // Basic email format validation
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return emailRegex.test(cleaned) ? cleaned : '';
}

export function sanitizeMessage(input) {
  return sanitizeText(input, MAX_INPUT_LENGTH);
}

/**
 * Escape HTML to prevent XSS when outputting user content.
 * React already escapes by default, but this is an extra safeguard
 * for any dangerouslySetInnerHTML usage.
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}