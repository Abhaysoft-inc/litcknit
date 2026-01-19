// Authentication utility functions

export interface AuthUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: 'admin';
}

export interface AuthResponse {
    message: string;
    jwtToken: string;
    user: AuthUser;
}

/**
 * Get the authentication token from cookies or localStorage
 */
export function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('adminToken');
}

/**
 * Get the authenticated user from localStorage
 */
export function getAuthUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('adminUser');
    if (!user) return null;
    try {
        return JSON.parse(user);
    } catch {
        return null;
    }
}

/**
 * Set authentication token and user in storage
 */
export function setAuth(token: string, user: AuthUser): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(user));
}

/**
 * Clear authentication data from storage
 */
export function clearAuth(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const token = getAuthToken();
    const user = getAuthUser();
    return !!token && !!user;
}

/**
 * Check if user has admin role
 */
export function isAdmin(): boolean {
    const user = getAuthUser();
    return user?.role === 'admin';
}

/**
 * Logout user - clears auth data and optionally redirects
 */
export function logout(): void {
    clearAuth();
}
