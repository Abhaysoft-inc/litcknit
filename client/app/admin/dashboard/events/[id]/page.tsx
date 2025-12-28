'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MdArrowBack, MdEdit, MdSave, MdPeople, MdEmojiEvents } from 'react-icons/md'

export default function ManageEventPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [activeSection, setActiveSection] = useState<'details' | 'registrations' | 'results'>('details')
    const [isEditing, setIsEditing] = useState(false)

    // Mock event data
    const [eventData, setEventData] = useState({
        name: 'Poetry Slam 2025',
        date: '2025-01-15',
        time: '18:00',
        venue: 'Main Auditorium',
        description: 'Annual poetry competition featuring talented poets',
        maxParticipants: 50,
        registrationDeadline: '2025-01-10',
        status: 'Upcoming',
        eventType: 'individual',
        teamSize: 1,
        rulebook: '',
        poster: '',
        prizes: '1st Prize: Trophy & Certificate, 2nd Prize: Certificate'
    })

    const [rulebookFile, setRulebookFile] = useState<File | null>(null)
    const [posterFile, setPosterFile] = useState<File | null>(null)

    // Mock registrations
    const registrations = [
        { id: 1, name: 'John Doe', email: 'john@email.com', phone: '1234567890', status: 'Confirmed' },
        { id: 2, name: 'Jane Smith', email: 'jane@email.com', phone: '0987654321', status: 'Confirmed' },
        { id: 3, name: 'Bob Wilson', email: 'bob@email.com', phone: '5555555555', status: 'Pending' },
    ]

    // Mock results
    const [results, setResults] = useState([
        { position: 1, participantName: '', points: 0 },
        { position: 2, participantName: '', points: 0 },
        { position: 3, participantName: '', points: 0 },
    ])

    const handleSave = () => {
        // Save event data logic
        setIsEditing(false)
        console.log('Event saved:', eventData)
        console.log('Rulebook file:', rulebookFile)
        console.log('Poster file:', posterFile)
    }

    const handleRulebookUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setRulebookFile(file)
            setEventData({ ...eventData, rulebook: file.name })
        }
    }

    const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setPosterFile(file)
            setEventData({ ...eventData, poster: file.name })
        }
    }

    const handleResultsSubmit = () => {
        // Submit results logic
        console.log('Results submitted:', results)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => router.push('/admin/dashboard')}
                        className="flex items-center space-x-2 text-gray-600 hover:text-black mb-4"
                    >
                        <MdArrowBack className="w-5 h-5" />
                        <span>Back to Dashboard</span>
                    </button>
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-900">{eventData.name}</h1>
                        {activeSection === 'details' && (
                            <button
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                            >
                                {isEditing ? <MdSave className="w-5 h-5" /> : <MdEdit className="w-5 h-5" />}
                                <span>{isEditing ? 'Save' : 'Edit'}</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveSection('details')}
                            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeSection === 'details'
                                ? 'border-b-2 border-black text-black'
                                : 'text-gray-600 hover:text-black'
                                }`}
                        >
                            Event Details
                        </button>
                        <button
                            onClick={() => setActiveSection('registrations')}
                            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeSection === 'registrations'
                                ? 'border-b-2 border-black text-black'
                                : 'text-gray-600 hover:text-black'
                                }`}
                        >
                            <span className="flex items-center justify-center space-x-2">
                                <MdPeople className="w-5 h-5" />
                                <span>Registrations ({registrations.length})</span>
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveSection('results')}
                            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeSection === 'results'
                                ? 'border-b-2 border-black text-black'
                                : 'text-gray-600 hover:text-black'
                                }`}
                        >
                            <span className="flex items-center justify-center space-x-2">
                                <MdEmojiEvents className="w-5 h-5" />
                                <span>Results</span>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow p-6">
                    {/* Event Details Section */}
                    {activeSection === 'details' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Event Name
                                    </label>
                                    <input
                                        type="text"
                                        value={eventData.name}
                                        onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-gray-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={eventData.status}
                                        onChange={(e) => setEventData({ ...eventData, status: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-gray-50"
                                    >
                                        <option>Upcoming</option>
                                        <option>Ongoing</option>
                                        <option>Completed</option>
                                        <option>Cancelled</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={eventData.date}
                                        onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-gray-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Time
                                    </label>
                                    <input
                                        type="time"
                                        value={eventData.time}
                                        onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-gray-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Venue
                                    </label>
                                    <input
                                        type="text"
                                        value={eventData.venue}
                                        onChange={(e) => setEventData({ ...eventData, venue: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-gray-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Max Participants
                                    </label>
                                    <input
                                        type="number"
                                        value={eventData.maxParticipants}
                                        onChange={(e) => setEventData({ ...eventData, maxParticipants: parseInt(e.target.value) })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-gray-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Event Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={eventData.eventType}
                                        onChange={(e) => {
                                            const newType = e.target.value
                                            setEventData({
                                                ...eventData,
                                                eventType: newType,
                                                teamSize: newType === 'individual' ? 1 : eventData.teamSize
                                            })
                                        }}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-gray-50"
                                    >
                                        <option value="individual">Individual</option>
                                        <option value="team">Team</option>
                                    </select>
                                </div>

                                {eventData.eventType === 'team' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Team Size <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            min="2"
                                            value={eventData.teamSize}
                                            onChange={(e) => setEventData({ ...eventData, teamSize: parseInt(e.target.value) || 2 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-gray-50"
                                            placeholder="Enter team size"
                                        />
                                    </div>
                                )}

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Registration Deadline
                                    </label>
                                    <input
                                        type="date"
                                        value={eventData.registrationDeadline}
                                        onChange={(e) => setEventData({ ...eventData, registrationDeadline: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-gray-50"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={eventData.description}
                                        onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-gray-50"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Prizes (Optional)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={eventData.prizes}
                                        onChange={(e) => setEventData({ ...eventData, prizes: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-gray-50"
                                        placeholder="Enter prize details (e.g., 1st Prize: $500, 2nd Prize: $300, 3rd Prize: $200)"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">List the prizes for winners if any</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Event Poster <span className="text-red-500">*</span>
                                    </label>
                                    <div className="space-y-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePosterUpload}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 disabled:file:bg-gray-400"
                                        />
                                        {eventData.poster && (
                                            <p className="text-sm text-gray-600">Current: {eventData.poster}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Rulebook (PDF) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="space-y-2">
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleRulebookUpload}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black disabled:bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 disabled:file:bg-gray-400"
                                        />
                                        {eventData.rulebook && (
                                            <p className="text-sm text-gray-600">Current: {eventData.rulebook}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Registrations Section */}
                    {activeSection === 'registrations' && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Total Registrations: {registrations.length}/{eventData.maxParticipants}
                                </h3>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    Export List
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {registrations.map((reg) => (
                                            <tr key={reg.id}>
                                                <td className="px-6 py-4 text-sm text-gray-900">{reg.name}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{reg.email}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{reg.phone}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 text-xs rounded ${reg.status === 'Confirmed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {reg.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm space-x-2">
                                                    <button className="text-gray-600 hover:text-black">View</button>
                                                    <button className="text-gray-600 hover:text-black">Remove</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Results Section */}
                    {activeSection === 'results' && (
                        <div className="space-y-6">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Declare Results</h3>
                                <p className="text-sm text-gray-600">Enter the winners and their points</p>
                            </div>

                            <div className="space-y-4">
                                {results.map((result, index) => (
                                    <div key={index} className="flex items-center space-x-4">
                                        <div className="w-20">
                                            <span className="text-lg font-semibold text-gray-900">
                                                {result.position === 1 ? '🥇' : result.position === 2 ? '🥈' : '🥉'} #{result.position}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                placeholder="Participant Name"
                                                value={result.participantName}
                                                onChange={(e) => {
                                                    const newResults = [...results]
                                                    newResults[index].participantName = e.target.value
                                                    setResults(newResults)
                                                }}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                            />
                                        </div>
                                        <div className="w-32">
                                            <input
                                                type="number"
                                                placeholder="Points"
                                                value={result.points || ''}
                                                onChange={(e) => {
                                                    const newResults = [...results]
                                                    newResults[index].points = parseInt(e.target.value) || 0
                                                    setResults(newResults)
                                                }}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4">
                                <button
                                    onClick={handleResultsSubmit}
                                    className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
                                >
                                    Publish Results
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
