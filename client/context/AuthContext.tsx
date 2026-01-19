'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthUser, getAuthToken, getAuthUser, clearAuth, setAuth } from '@/utils/auth';

interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (token: string, user: AuthUser) => void;
    logout: () => void;
    updateUser: (user: AuthUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize auth state from storage on mount
    useEffect(() => {
        const storedToken = getAuthToken();
        const storedUser = getAuthUser();

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
        }
        setIsLoading(false);
    }, []);

    const login = (newToken: string, newUser: AuthUser) => {
        setAuth(newToken, newUser);
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        clearAuth();
        setToken(null);
        setUser(null);
    };

    const updateUser = (updatedUser: AuthUser) => {
        setUser(updatedUser);
        if (token) {
            setAuth(token, updatedUser);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                isAuthenticated: !!user && !!token,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
