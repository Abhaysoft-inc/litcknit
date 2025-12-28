import React from 'react'
import { IconType } from 'react-icons'

interface StatsCardProps {
    label: string
    value: string
    icon: IconType
}

export default function StatsCard({ label, value, icon: Icon }: StatsCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">{label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                </div>
                <Icon className="w-12 h-12 text-gray-400" />
            </div>
        </div>
    )
}
