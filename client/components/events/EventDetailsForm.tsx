import React from 'react'

interface EventData {
    name: string
    date: string
    time: string
    venue: string
    description: string
    maxParticipants: number
    registrationDeadline: string
    status: string
    eventType: string
    teamSize: number
    rulebook: string
    poster: string
    prizes: string
}

interface EventDetailsFormProps {
    eventData: EventData
    isEditing: boolean
    onEventDataChange: (data: EventData) => void
    onPosterUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    onRulebookUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function EventDetailsForm({
    eventData,
    isEditing,
    onEventDataChange,
    onPosterUpload,
    onRulebookUpload
}: EventDetailsFormProps) {
    return (
        <div className="space-y-8">
            {/* Basic Information Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-100">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Event Name
                        </label>
                        <input
                            type="text"
                            value={eventData.name}
                            onChange={(e) => onEventDataChange({ ...eventData, name: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            value={eventData.status}
                            onChange={(e) => onEventDataChange({ ...eventData, status: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                        >
                            <option>Upcoming</option>
                            <option>Ongoing</option>
                            <option>Completed</option>
                            <option>Cancelled</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Date
                        </label>
                        <input
                            type="date"
                            value={eventData.date}
                            onChange={(e) => onEventDataChange({ ...eventData, date: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Time
                        </label>
                        <input
                            type="time"
                            value={eventData.time}
                            onChange={(e) => onEventDataChange({ ...eventData, time: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Venue
                        </label>
                        <input
                            type="text"
                            value={eventData.venue}
                            onChange={(e) => onEventDataChange({ ...eventData, venue: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Max Participants
                        </label>
                        <input
                            type="number"
                            value={eventData.maxParticipants}
                            onChange={(e) => onEventDataChange({ ...eventData, maxParticipants: parseInt(e.target.value) })}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Event Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={eventData.eventType}
                            onChange={(e) => {
                                const newType = e.target.value
                                onEventDataChange({
                                    ...eventData,
                                    eventType: newType,
                                    teamSize: newType === 'individual' ? 1 : eventData.teamSize
                                })
                            }}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                        >
                            <option value="individual">Individual</option>
                            <option value="team">Team</option>
                        </select>
                    </div>

                    {eventData.eventType === 'team' && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Team Size <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                min="2"
                                value={eventData.teamSize}
                                onChange={(e) => onEventDataChange({ ...eventData, teamSize: parseInt(e.target.value) || 2 })}
                                disabled={!isEditing}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                                placeholder="Enter team size"
                            />
                        </div>
                    )}

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Registration Deadline
                        </label>
                        <input
                            type="date"
                            value={eventData.registrationDeadline}
                            onChange={(e) => onEventDataChange({ ...eventData, registrationDeadline: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                        />
                    </div>
                </div>
            </div>

            {/* Description & Prizes Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-100">Event Details</h2>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            rows={4}
                            value={eventData.description}
                            onChange={(e) => onEventDataChange({ ...eventData, description: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Prizes (Optional)
                        </label>
                        <textarea
                            rows={3}
                            value={eventData.prizes}
                            onChange={(e) => onEventDataChange({ ...eventData, prizes: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                            placeholder="Enter prize details (e.g., 1st Prize: $500, 2nd Prize: $300, 3rd Prize: $200)"
                        />
                        <p className="text-xs text-gray-500 mt-1.5">List the prizes for winners if any</p>
                    </div>
                </div>
            </div>

            {/* Files Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-100">Event Files</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Event Poster <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onPosterUpload}
                                disabled={!isEditing}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 disabled:file:bg-gray-400"
                            />
                            {eventData.poster && (
                                <p className="text-sm text-green-600 flex items-center gap-1">
                                    <span>✓</span>
                                    <span>{eventData.poster}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Rulebook (PDF) <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={onRulebookUpload}
                                disabled={!isEditing}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 disabled:file:bg-gray-400"
                            />
                            {eventData.rulebook && (
                                <p className="text-sm text-green-600 flex items-center gap-1">
                                    <span>✓</span>
                                    <span>{eventData.rulebook}</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
