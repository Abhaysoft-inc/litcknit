'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import EventHeader from '@/components/events/EventHeader'
import EventTabs from '@/components/events/EventTabs'
import EventDetailsForm from '@/components/events/EventDetailsForm'
import RegistrationsTable from '@/components/events/RegistrationsTable'
import ResultsForm from '@/components/events/ResultsForm'

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
        console.log('Results submitted:', results)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <EventHeader
                    eventName={eventData.name}
                    eventStatus={eventData.status}
                    eventDate={eventData.date}
                    eventTime={eventData.time}
                    eventVenue={eventData.venue}
                    isEditing={isEditing}
                    showEditButton={activeSection === 'details'}
                    onBack={() => router.push('/admin/dashboard')}
                    onEditSave={() => isEditing ? handleSave() : setIsEditing(true)}
                />

                <EventTabs
                    activeSection={activeSection}
                    registrationCount={registrations.length}
                    onTabChange={setActiveSection}
                />

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                    {activeSection === 'details' && (
                        <EventDetailsForm
                            eventData={eventData}
                            isEditing={isEditing}
                            onEventDataChange={setEventData}
                            onPosterUpload={handlePosterUpload}
                            onRulebookUpload={handleRulebookUpload}
                        />
                    )}

                    {activeSection === 'registrations' && (
                        <RegistrationsTable
                            registrations={registrations}
                            maxParticipants={eventData.maxParticipants}
                        />
                    )}

                    {activeSection === 'results' && (
                        <ResultsForm
                            results={results}
                            onResultsChange={setResults}
                            onSubmit={handleResultsSubmit}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}