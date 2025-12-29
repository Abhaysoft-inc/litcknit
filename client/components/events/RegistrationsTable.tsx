import React from 'react'

interface Registration {
    id: number
    name: string
    email: string
    phone: string
    status: string
}

interface RegistrationsTableProps {
    registrations: Registration[]
    maxParticipants: number
}

export default function RegistrationsTable({ registrations, maxParticipants }: RegistrationsTableProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        Registered Participants
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        {registrations.length} out of {maxParticipants} spots filled
                    </p>
                </div>
                <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                    Export List
                </button>
            </div>

            {/* Progress Bar */}
            <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                    className="bg-black h-full transition-all"
                    style={{ width: `${(registrations.length / maxParticipants) * 100}%` }}
                ></div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {registrations.map((reg) => (
                            <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{reg.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{reg.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{reg.phone}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${reg.status === 'Confirmed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {reg.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm space-x-3">
                                    <button className="text-gray-600 hover:text-black font-medium transition-colors">View</button>
                                    <button className="text-red-600 hover:text-red-800 font-medium transition-colors">Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
