'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MdArrowBack, MdUpload } from 'react-icons/md'

export default function CreateEventPage() {
    const router = useRouter()
    const [eventData, setEventData] = useState({
        name: '',
        date: '',
        time: '',
        venue: '',
        description: '',
        maxParticipants: '',
        registrationDeadline: '',
        status: 'Upcoming',
        eventType: 'individual',
        teamSize: 1,
        rulebook: '',
        poster: '',
        prizes: ''
    })

    const [rulebookFile, setRulebookFile] = useState<File | null>(null)
    const [posterFile, setPosterFile] = useState<File | null>(null)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleRulebookUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.type !== 'application/pdf') {
                setErrors({ ...errors, rulebook: 'Please upload a PDF file' })
                return
            }
            setRulebookFile(file)
            setEventData({ ...eventData, rulebook: file.name })
            setErrors({ ...errors, rulebook: '' })
        }
    }

    const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors({ ...errors, poster: 'Please upload an image file' })
                return
            }
            setPosterFile(file)
            setEventData({ ...eventData, poster: file.name })
            setErrors({ ...errors, poster: '' })
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!eventData.name.trim()) newErrors.name = 'Event name is required'
        if (!eventData.date) newErrors.date = 'Date is required'
        if (!eventData.time) newErrors.time = 'Time is required'
        if (!eventData.venue.trim()) newErrors.venue = 'Venue is required'
        if (!eventData.description.trim()) newErrors.description = 'Description is required'
        if (!eventData.maxParticipants || parseInt(eventData.maxParticipants) < 1) {
            newErrors.maxParticipants = 'Max participants must be at least 1'
        }
        if (!eventData.registrationDeadline) newErrors.registrationDeadline = 'Registration deadline is required'
        if (!posterFile) newErrors.poster = 'Event poster is required'
        if (!rulebookFile) newErrors.rulebook = 'Rulebook is required'
        if (eventData.eventType === 'team' && (!eventData.teamSize || eventData.teamSize < 2)) {
            newErrors.teamSize = 'Team size must be at least 2'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            // Create event logic
            console.log('Creating event:', eventData)
            console.log('Rulebook file:', rulebookFile)
            console.log('Poster file:', posterFile)

            // Redirect to dashboard after successful creation
            router.push('/admin/dashboard')
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => router.push('/admin/dashboard')}
                        className="flex items-center space-x-2 text-gray-600 hover:text-black mb-4"
                    >
                        <MdArrowBack className="w-5 h-5" />
                        <span>Back to Dashboard</span>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
                    <p className="text-gray-600 mt-2">Fill in the details to create a new event</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Event Name */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Event Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={eventData.name}
                                    onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                    placeholder="Enter event name"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={eventData.date}
                                    onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                />
                                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                            </div>

                            {/* Time */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="time"
                                    value={eventData.time}
                                    onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                />
                                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                            </div>

                            {/* Venue */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Venue <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={eventData.venue}
                                    onChange={(e) => setEventData({ ...eventData, venue: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                    placeholder="Enter venue location"
                                />
                                {errors.venue && <p className="text-red-500 text-sm mt-1">{errors.venue}</p>}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={eventData.status}
                                    onChange={(e) => setEventData({ ...eventData, status: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                >
                                    <option>Upcoming</option>
                                    <option>Ongoing</option>
                                    <option>Completed</option>
                                    <option>Cancelled</option>
                                </select>
                            </div>

                            {/* Max Participants */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Max Participants <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={eventData.maxParticipants}
                                    onChange={(e) => setEventData({ ...eventData, maxParticipants: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                    placeholder="Enter max participants"
                                />
                                {errors.maxParticipants && <p className="text-red-500 text-sm mt-1">{errors.maxParticipants}</p>}
                            </div>

                            {/* Event Type */}
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
                                            teamSize: newType === 'individual' ? 1 : 2
                                        })
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                >
                                    <option value="individual">Individual</option>
                                    <option value="team">Team</option>
                                </select>
                            </div>

                            {/* Team Size (conditional) */}
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                        placeholder="Enter team size"
                                    />
                                    {errors.teamSize && <p className="text-red-500 text-sm mt-1">{errors.teamSize}</p>}
                                </div>
                            )}

                            {/* Registration Deadline */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Registration Deadline <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={eventData.registrationDeadline}
                                    onChange={(e) => setEventData({ ...eventData, registrationDeadline: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                />
                                {errors.registrationDeadline && <p className="text-red-500 text-sm mt-1">{errors.registrationDeadline}</p>}
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    rows={4}
                                    value={eventData.description}
                                    onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                    placeholder="Enter event description"
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            {/* Prizes */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Prizes (Optional)
                                </label>
                                <textarea
                                    rows={3}
                                    value={eventData.prizes}
                                    onChange={(e) => setEventData({ ...eventData, prizes: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                    placeholder="Enter prize details (e.g., 1st Prize: $500, 2nd Prize: $300, 3rd Prize: $200)"
                                />
                                <p className="text-xs text-gray-500 mt-1">List the prizes for winners if any</p>
                            </div>

                            {/* Event Poster */
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Event Poster <span className="text-red-500">*</span>
                                    </label>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <MdUpload className="w-8 h-8 mb-2 text-gray-500" />
                                                    <p className="mb-2 text-sm text-gray-500">
                                                        <span className="font-semibold">Click to upload poster</span>
                                                    </p>
                                                    <p className="text-xs text-gray-500">PNG, JPG or WEBP</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handlePosterUpload}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                        {eventData.poster && (
                                            <p className="text-sm text-green-600">✓ {eventData.poster}</p>
                                        )}
                                        {errors.poster && <p className="text-red-500 text-sm">{errors.poster}</p>}
                                    </div>
                                </div>

                            }
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rulebook (PDF) <span className="text-red-500">*</span>
                                </label>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <MdUpload className="w-8 h-8 mb-2 text-gray-500" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">Click to upload rulebook</span>
                                                </p>
                                                <p className="text-xs text-gray-500">PDF only</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleRulebookUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    {eventData.rulebook && (
                                        <p className="text-sm text-green-600">✓ {eventData.rulebook}</p>
                                    )}
                                    {errors.rulebook && <p className="text-red-500 text-sm">{errors.rulebook}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 pt-6 border-t">
                            <button
                                type="button"
                                onClick={() => router.push('/admin/dashboard')}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                            >
                                Create Event
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
