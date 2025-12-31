'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import TopBar from '@/components/dashboard/TopBar'
import OverviewTab from '@/components/dashboard/tabs/OverviewTab'
import EventsTab from '@/components/dashboard/tabs/EventsTab'
import PostsTab from '@/components/dashboard/tabs/PostsTab'
import MembersTab from '@/components/dashboard/tabs/MembersTab'
import SettingsTab from '@/components/dashboard/tabs/SettingsTab'
import { isAuthenticated, isAdmin } from '@/utils/auth'

const DashboardPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('overview')
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check authentication on mount
        if (!isAuthenticated() || !isAdmin()) {
            router.push('/admin/login')
        } else {
            setIsLoading(false)
        }
    }, [router])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab setActiveTab={setActiveTab} />
            case 'events':
                return <EventsTab />
            case 'posts':
                return <PostsTab />
            case 'members':
                return <MembersTab />
            case 'settings':
                return <SettingsTab />
            default:
                return <OverviewTab setActiveTab={setActiveTab} />
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className="lg:ml-64">
                <TopBar activeTab={activeTab} setSidebarOpen={setSidebarOpen} />

                <main className="p-6">
                    {renderTabContent()}
                </main>
            </div>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    )
}

export default DashboardPage
