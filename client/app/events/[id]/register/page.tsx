'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import RegistrationForm from '@/components/events/RegistrationForm'
import EventSummarySidebar from '@/components/events/EventSummarySidebar'
import LoadingState from '@/components/events/LoadingState'
import ErrorState from '@/components/events/ErrorState'
import toast from 'react-hot-toast'

interface Registration {
    name: string
    email: string
    phone: string
    registeredAt: Date
    status: string
}

interface Event {
    _id: string
    name: string
    description: string
    date: string
    time: string
    venue: string
    poster: string
    status: string
    registrationDeadline: string
    maxParticipants: number
    eventType: 'individual' | 'team'
    teamSize?: number
    registrations: Registration[]
}

interface TeamMember {
    name: string
    email: string
    phone: string
}

const EventRegisterPage = () => {
    const params = useParams()
    const router = useRouter()
    const eventId = params.id as string

    const [event, setEvent] = useState<Event | null>(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        teamName: '',
    })

    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/events/${eventId}`)
                const data = await res.json()

                if (!res.ok || !data.success) {
                    setError(data.message || 'Failed to load event')
                    return
                }

                setEvent(data.data)

                // Initialize team members array for team events
                if (data.data.eventType === 'team' && data.data.teamSize) {
                    const initialMembers: TeamMember[] = []
                    for (let i = 0; i < data.data.teamSize - 1; i++) {
                        initialMembers.push({ name: '', email: '', phone: '' })
                    }
                    setTeamMembers(initialMembers)
                }
            } catch (err) {
                console.error(err)
                setError('Failed to load event')
            } finally {
                setLoading(false)
            }
        }

        if (eventId) {
            fetchEvent()
        }
    }, [eventId])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
        const updated = [...teamMembers]
        updated[index][field] = value
        setTeamMembers(updated)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                ...(event?.eventType === 'team' && {
                    teamName: formData.teamName,
                    teamMembers: teamMembers
                })
            }

            const res = await fetch(`/api/events/${eventId}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            const data = await res.json()

            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Registration failed')
            }

            toast.success('Registration successful!')
            setTimeout(() => {
                router.push(`/events/${eventId}`)
            }, 1500)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Registration failed'
            setError(errorMessage)
            toast.error(errorMessage)
        } finally {
            setSubmitting(false)
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (loading) {
        return <LoadingState />
    }

    if (error || !event) {
        return <ErrorState error={error} />
    }

    const registeredCount = event.registrations?.length || 0
    const spotsLeft = event.maxParticipants - registeredCount
    const isRegistrationOpen = event.status === 'Upcoming' && new Date(event.registrationDeadline) > new Date() && spotsLeft > 0

    return (
        <div className="min-h-screen bg-skin-lightest">
            <Navbar />

            <section className="w-full py-16 px-8 md:px-20">
                <div className="max-w-4xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-serif text-skin-deep mb-4">
                            Register for Event
                        </h1>
                        <p className="text-lg text-skin-darker">
                            Complete the form below to register for this event
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Registration Form */}
                        <div className="lg:col-span-2">
                            <RegistrationForm
                                event={event}
                                formData={formData}
                                teamMembers={teamMembers}
                                isRegistrationOpen={isRegistrationOpen}
                                submitting={submitting}
                                spotsLeft={spotsLeft}
                                eventId={eventId}
                                onInputChange={handleInputChange}
                                onTeamMemberChange={handleTeamMemberChange}
                                onSubmit={handleSubmit}
                            />
                        </div>

                        {/* Event Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <EventSummarySidebar
                                event={event}
                                spotsLeft={spotsLeft}
                                eventId={eventId}
                                formatDate={formatDate}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default EventRegisterPage
