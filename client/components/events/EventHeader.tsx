import React from 'react'
import { MdArrowBack, MdEdit, MdSave, MdCalendarToday, MdAccessTime, MdLocationOn } from 'react-icons/md'

interface EventHeaderProps {
    eventName: string
    eventStatus: string
    eventDate: string
    eventTime: string
    eventVenue: string
    isEditing: boolean
    showEditButton: boolean
    onBack: () => void
    onEditSave: () => void
}

export default function EventHeader({
    eventName,
    eventStatus,
    eventDate,
    eventTime,
    eventVenue,
    isEditing,
    showEditButton,
    onBack,
    onEditSave
}: EventHeaderProps) {
    return (
        <div className="mb-8">
            <button
                onClick={onBack}
                className="group flex items-center space-x-2 text-gray-600 hover:text-black mb-6 transition-colors"
            >
                <MdArrowBack className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Dashboard</span>
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{eventName}</h1>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${eventStatus === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                                    eventStatus === 'Ongoing' ? 'bg-green-100 text-green-800' :
                                        eventStatus === 'Completed' ? 'bg-gray-100 text-gray-800' :
                                            'bg-red-100 text-red-800'
                                }`}>
                                {eventStatus}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="flex items-center gap-2 text-gray-600">
                                <MdCalendarToday className="w-4 h-4" />
                                <span className="text-sm">{new Date(eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <MdAccessTime className="w-4 h-4" />
                                <span className="text-sm">{eventTime}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <MdLocationOn className="w-4 h-4" />
                                <span className="text-sm">{eventVenue}</span>
                            </div>
                        </div>
                    </div>

                    {showEditButton && (
                        <button
                            onClick={onEditSave}
                            className="flex items-center justify-center space-x-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all hover:shadow-lg"
                        >
                            {isEditing ? <MdSave className="w-5 h-5" /> : <MdEdit className="w-5 h-5" />}
                            <span className="font-medium">{isEditing ? 'Save Changes' : 'Edit Event'}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
