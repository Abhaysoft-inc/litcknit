import React from 'react'
import { BiCalendarEvent } from 'react-icons/bi'
import { BsFilePost } from 'react-icons/bs'
import { MdPeople, MdEvent } from 'react-icons/md'
import StatsCard from '../StatsCard'
import QuickActions from '../QuickActions'
import RecentActivity from '../RecentActivity'

interface OverviewTabProps {
    setActiveTab: (tab: string) => void
}

const stats = [
    { label: 'Total Events', value: '24', icon: BiCalendarEvent },
    { label: 'Published Posts', value: '156', icon: BsFilePost },
    { label: 'Members', value: '89', icon: MdPeople },
    { label: 'Upcoming Events', value: '8', icon: MdEvent },
]

export default function OverviewTab({ setActiveTab }: OverviewTabProps) {
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <QuickActions setActiveTab={setActiveTab} />
                <RecentActivity />
            </div>
        </div>
    )
}
