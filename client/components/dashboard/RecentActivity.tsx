import React from 'react'

const activities = [
    { text: 'New event created', time: '2 hours ago' },
    { text: 'Post published', time: '5 hours ago' },
    { text: 'Member added', time: '1 day ago' },
]

export default function RecentActivity() {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                        <div>
                            <p className="text-sm text-gray-900">{activity.text}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
