import React from 'react'
import { MdMenu, MdLogout } from 'react-icons/md'
import { logout, getAdminUser } from '@/utils/auth'

interface TopBarProps {
    activeTab: string
    setSidebarOpen: (open: boolean) => void
}

export default function TopBar({ activeTab, setSidebarOpen }: TopBarProps) {
    const user = getAdminUser()
    const initials = user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'AD'

    return (
        <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden"
                >
                    <MdMenu className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-semibold text-gray-900 capitalize">
                    {activeTab}
                </h2>
                <div className="flex items-center space-x-4">
                    <div className="hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">{initials}</span>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
                        title="Logout"
                    >
                        <MdLogout className="w-5 h-5" />
                        <span className="hidden sm:inline text-sm">Logout</span>
                    </button>
                </div>
            </div>
        </header>
    )
}
