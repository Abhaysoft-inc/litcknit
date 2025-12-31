export const getAdminToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('adminToken')
    }
    return null
}

export const getAdminUser = () => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('adminUser')
        return user ? JSON.parse(user) : null
    }
    return null
}

export const isAuthenticated = (): boolean => {
    return !!getAdminToken()
}

export const isAdmin = (): boolean => {
    const user = getAdminUser()
    return user?.role === 'admin'
}

export const logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        window.location.href = '/admin/login'
    }
}

export const getAuthHeaders = () => {
    const token = getAdminToken()
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    }
}
