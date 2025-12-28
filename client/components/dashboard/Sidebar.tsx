import React from 'react'
import { MdDashboard, MdEvent, MdArticle, MdPeople, MdSettings, MdLogout, MdClose } from 'react-icons/md'

interface SidebarProps {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
    activeTab: string
    setActiveTab: (tab: string) => void
}

const menuItems = [
    { id: 'overview', label: 'Overview', icon: MdDashboard },
    { id: 'events', label: 'Events', icon: MdEvent },
    { id: 'posts', label: 'Posts', icon: MdArticle },
    // { id: 'members', label: 'Members', icon: MdPeople },
    { id: 'settings', label: 'Settings', icon: MdSettings },
]

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }: SidebarProps) {
    return (
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            <div className="flex items-center justify-between p-6 border-b">
                <h1 className="text-xl font-bold text-gray-900">Literary Council</h1>
                <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                    <MdClose className="w-6 h-6" />
                </button>
            </div>

            <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id)
                                setSidebarOpen(false)
                            }}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                                ? 'bg-black text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </button>
                    )
                })}
            </nav>

            <div className="absolute bottom-0 w-full p-4 border-t">
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <MdLogout className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    )
}
