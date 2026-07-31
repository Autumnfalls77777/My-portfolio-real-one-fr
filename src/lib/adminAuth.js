import { portfolioApi } from '@/api/portfolioApi';

const SESSION_KEY = 'portfolio_admin_session';
const SESSION_DURATION = 5 * 60 * 60 * 1000; // 5 hours

export function getLoginLockout() {
  return null;
}

export function getRemainingAttempts() {
  return 999;
}

export async function loginAdmin(email, password, accessCode) {
  try {
    const res = await portfolioApi.auth.loginAdmin(email, password, accessCode);
    return { success: true, user: res.user };
  } catch (err) {
    console.warn('[adminAuth] Auth error:', err.message);
    return {
      success: false,
      message: err.message || 'Invalid admin credentials',
    };
  }
}

export function isAdmin() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));
    if (!session) return false;
    if (Date.now() - session.ts > SESSION_DURATION) {
      localStorage.removeItem(SESSION_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function logoutAdmin() {
  localStorage.removeItem(SESSION_KEY);
  portfolioApi.auth.logout().catch(() => {});
  window.location.href = '/admin/login';
}
