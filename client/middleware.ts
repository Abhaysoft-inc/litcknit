import { NextRequest, NextResponse } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = [
    '/admin/dashboard',
    '/admin/dashboard/events',
    '/admin/dashboard/events/new',
    '/admin/dashboard/posts',
    '/admin/dashboard/posts/new',
    '/admin/dashboard/settings',
];

const adminAuthRoutes = ['/admin/login'];

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const token = request.cookies.get('adminToken')?.value;

    // Check if route is protected
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = adminAuthRoutes.some(route => pathname === route);

    // If accessing protected route without token, redirect to login
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // If accessing login page with valid token, redirect to dashboard
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
    ],
};
