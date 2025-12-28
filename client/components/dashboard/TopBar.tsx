import React from 'react'
import { MdMenu } from 'react-icons/md'

interface TopBarProps {
    activeTab: string
    setSidebarOpen: (open: boolean) => void
}

export default function TopBar({ activeTab, setSidebarOpen }: TopBarProps) {
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
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">AD</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
