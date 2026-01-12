"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { HiLocationMarker, HiCalendar, HiClock, HiUsers, HiTicket } from 'react-icons/hi'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'

interface Event {
    _id: string
    name: string
    description: string
    date: string
    time: string
    venue: string
    poster: string
    status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled'
    registrationDeadline: string
    maxParticipants: number
    eventType: 'individual' | 'team'
    teamSize?: number
    prizes?: string
    rulebook: string
    registrations: any[]
}

const EventDetailPage = () => {
    const params = useParams()
    const router = useRouter()
    const eventId = params.id

    const [event, setEvent] = useState<Event | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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

    // Hardcoded agenda - as requested
    const eventAgenda = [
        { time: "10:00 AM", activity: "Registration & Welcome" },
        { time: "10:30 AM", activity: "Opening Ceremony" },
        { time: "11:00 AM", activity: "Main Event Begins" },
        { time: "1:00 PM", activity: "Lunch Break" },
        { time: "2:00 PM", activity: "Event Continues" },
        { time: "4:00 PM", activity: "Competition/Workshop Concludes" },
        { time: "4:30 PM", activity: "Prize Distribution & Closing" }
    ]

    // Helper function to format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
        const year = date.getFullYear()
        return { day, month, year }
    }

    const formatDeadline = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-skin-lightest">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-skin-deep mx-auto mb-4"></div>
                        <p className="text-skin-darker text-lg">Loading event details...</p>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-skin-lightest">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center max-w-md">
                        <h2 className="text-3xl font-serif text-skin-deep mb-4">Event Not Found</h2>
                        <p className="text-skin-darker mb-6">{error || 'The event you are looking for does not exist.'}</p>
                        <a
                            href="/events"
                            className="inline-block bg-skin-deep text-white font-semibold py-3 px-8 rounded-xl hover:bg-skin-darker transition-colors duration-300"
                        >
                            Back to Events
                        </a>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    const dateInfo = formatDate(event.date)
    const isRegistrationOpen = event.status === 'Upcoming' && new Date(event.registrationDeadline) > new Date()
    const registeredCount = event.registrations?.length || 0
    const spotsLeft = event.maxParticipants - registeredCount

    return (
        <div className="min-h-screen bg-skin-lightest">
            <Navbar />

            {/* Hero Section with Image */}
            <section className="relative w-full h-[400px] md:h-[500px]">
                <Image
                    src={event.poster || '/event-placeholder.jpg'}
                    alt={event.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="inline-block bg-skin-deep text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 capitalize">
                            {event.status}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
                            {event.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 font-medium">
                            {event.eventType === 'team' ? `Team Event (${event.teamSize || 1} members)` : 'Individual Event'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Event Details */}
            <section className="w-full py-16 px-8 md:px-20 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-serif text-skin-deep mb-6">About This Event</h2>
                            <div className="prose prose-lg max-w-none">
                                {event.description.split('\n\n').map((paragraph: string, index: number) => (
                                    <p key={index} className="text-skin-darker leading-relaxed mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Event Highlights */}
                            {event.prizes && (
                                <div className="mt-12">
                                    <h3 className="text-2xl font-serif text-skin-deep mb-6">Prizes & Recognition</h3>
                                    <div className="bg-skin-lightest rounded-xl p-6">
                                        <p className="text-skin-darker leading-relaxed">{event.prizes}</p>
                                    </div>
                                </div>
                            )}

                            {/* Agenda */}
                            <div className="mt-12">
                                <h3 className="text-2xl font-serif text-skin-deep mb-6">Event Agenda</h3>
                                <div className="space-y-4">
                                    {eventAgenda.map((item, index) => (
                                        <div key={index} className="flex gap-4 p-4 bg-skin-lightest rounded-xl">
                                            <div className="flex-shrink-0">
                                                <div className="bg-skin-deep text-white px-4 py-2 rounded-lg font-semibold text-sm">
                                                    {item.time}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-skin-deep font-semibold">{item.activity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Rulebook */}
                            {event.rulebook && (
                                <div className="mt-12">
                                    <h3 className="text-2xl font-serif text-skin-deep mb-6">Rules & Guidelines</h3>
                                    <div className="bg-skin-lightest rounded-xl p-6">
                                        <p className="text-skin-darker leading-relaxed whitespace-pre-line">{event.rulebook}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8 space-y-6">
                                {/* Quick Info Card */}
                                <div className="bg-skin-light rounded-2xl p-6 shadow-lg">
                                    <h3 className="text-xl font-serif text-skin-deep mb-6">Event Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <HiCalendar className="text-skin-deep text-xl flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-sm text-skin-darker font-semibold">Date</p>
                                                <p className="text-skin-deep font-bold">{dateInfo.day} {dateInfo.month} {dateInfo.year}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <HiClock className="text-skin-deep text-xl flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-sm text-skin-darker font-semibold">Time</p>
                                                <p className="text-skin-deep font-bold">{event.time}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <HiLocationMarker className="text-skin-deep text-xl flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-sm text-skin-darker font-semibold">Venue</p>
                                                <p className="text-skin-deep font-bold">{event.venue}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <HiUsers className="text-skin-deep text-xl flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-sm text-skin-darker font-semibold">
                                                    {event.eventType === 'team' ? 'Teams' : 'Participants'}
                                                </p>
                                                <p className="text-skin-deep font-bold">
                                                    {registeredCount} / {event.maxParticipants}
                                                </p>
                                                {spotsLeft > 0 && isRegistrationOpen && (
                                                    <p className="text-xs text-green-600 font-semibold mt-1">
                                                        {spotsLeft} spots left
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <HiTicket className="text-skin-deep text-xl flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-sm text-skin-darker font-semibold">Event Type</p>
                                                <p className="text-skin-deep font-bold capitalize">{event.eventType}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Registration Card */}
                                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-skin-light">
                                    {isRegistrationOpen ? (
                                        <>
                                            <h3 className="text-lg font-serif text-skin-deep mb-3">Registration Open</h3>
                                            <p className="text-sm text-skin-darker mb-4">
                                                Deadline: {formatDeadline(event.registrationDeadline)}
                                            </p>
                                            {spotsLeft > 0 ? (
                                                <button
                                                    onClick={() => router.push(`/events/${eventId}/register`)}
                                                    className="w-full bg-skin-deep text-white font-semibold py-3 px-6 rounded-xl hover:bg-skin-darker transition-colors duration-300"
                                                >
                                                    Register Now
                                                </button>
                                            ) : (
                                                <button disabled className="w-full bg-gray-300 text-gray-500 font-semibold py-3 px-6 rounded-xl cursor-not-allowed">
                                                    Event Full
                                                </button>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="text-lg font-serif text-red-600 mb-3">
                                                {event.status === 'Completed' ? 'Event Completed' :
                                                    event.status === 'Cancelled' ? 'Event Cancelled' :
                                                        'Registration Closed'}
                                            </h3>
                                            <p className="text-sm text-skin-darker mb-4">
                                                {event.status === 'Completed' ? 'This event has concluded.' :
                                                    event.status === 'Cancelled' ? 'This event has been cancelled.' :
                                                        'Registration deadline has passed.'}
                                            </p>
                                            <button disabled className="w-full bg-gray-300 text-gray-500 font-semibold py-3 px-6 rounded-xl cursor-not-allowed">
                                                {event.status === 'Completed' ? 'Event Ended' :
                                                    event.status === 'Cancelled' ? 'Event Cancelled' :
                                                        'Registration Closed'}
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Organizers Card */}
                                <div className="bg-skin-lightest rounded-2xl p-6">
                                    <h3 className="text-lg font-serif text-skin-deep mb-4">Organized By</h3>
                                    <p className="text-skin-darker font-medium mb-4">Literary Council KNIT</p>
                                    <p className="text-sm text-skin-darker">
                                        <span className="font-semibold">Contact:</span> litcouncil@knit.ac.in
                                    </p>
                                </div>

                                {/* Back Button */}
                                <a
                                    href="/events"
                                    className="block w-full text-center border-2 border-skin-deep text-skin-deep font-semibold py-3 px-6 rounded-xl hover:bg-skin-lighter transition-colors duration-300"
                                >
                                    Back to All Events
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Events */}
            <section className="w-full py-16 px-8 md:px-20 bg-skin-lightest">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif text-skin-deep mb-8 text-center">
                        Other Events You Might Like
                    </h2>
                    <div className="flex justify-center gap-4">
                        <a
                            href="/events"
                            className="bg-skin-deep text-white font-semibold py-3 px-8 rounded-xl hover:bg-skin-darker transition-colors duration-300"
                        >
                            View All Events
                        </a>
                        <a
                            href="/"
                            className="border-2 border-skin-deep text-skin-deep font-semibold py-3 px-8 rounded-xl hover:bg-skin-lighter transition-colors duration-300"
                        >
                            Back to Home
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default EventDetailPage
