import React from 'react'
import Link from 'next/link'
import { MdAdd } from 'react-icons/md'

const events = [
    { id: 1, name: 'Poetry Slam 2025', date: 'Jan 15, 2025', status: 'Upcoming' },
    { id: 2, name: 'Book Reading Session', date: 'Jan 20, 2025', status: 'Upcoming' },
]

export default function EventsTab() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Events Management</h3>
                <Link href="/admin/dashboard/events/create">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                        <MdAdd className="w-5 h-5" />
                        <span>Create Event</span>
                    </button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {events.map((event, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 text-sm text-gray-900">{event.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{event.date}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                        {event.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <Link
                                        href={`/admin/dashboard/events/${event.id}`}
                                        className="text-gray-600 hover:text-black hover:underline"
                                    >
                                        Manage
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
