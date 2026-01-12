'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { HiLocationMarker } from 'react-icons/hi'

interface Event {
    _id: string
    name: string
    description: string
    date: string
    venue: string
    poster: string
}

const EventsSection = () => {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('/api/events')
                const data = await res.json()

                if (data.success) {
                    // Get the 3 most recent events
                    const recentEvents = data.data
                        .sort((a: Event, b: Event) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .slice(0, 3)
                    setEvents(recentEvents)
                }
            } catch (err) {
                console.error('Failed to fetch events:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
        return { day, month }
    }

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text
        return text.slice(0, maxLength) + '...'
    }

    if (loading) {
        return (
            <section id="events-section" className="w-full py-20 px-8 md:px-20 bg-skin-light">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-skin-deep mb-4">
                            Upcoming Events
                        </h2>
                        <p className="text-xl text-skin-deep max-w-2xl mx-auto">
                            Discover our exciting lineup of literary events, workshops, and competitions
                        </p>
                    </div>
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-skin-deep"></div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section id="events-section" className="w-full py-20 px-8 md:px-20 bg-skin-light">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-skin-deep mb-4">
                        Upcoming Events
                    </h2>
                    <p className="text-xl text-skin-deep max-w-2xl mx-auto">
                        Discover our exciting lineup of literary events, workshops, and competitions
                    </p>
                </div>

                {/* Events Grid */}
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => {
                            const dateInfo = formatDate(event.date)
                            return (
                                <a
                                    key={event._id}
                                    href={`/events/${event._id}`}
                                    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block"
                                >
                                    {/* Event Image */}
                                    <div className="relative h-64 w-full">
                                        <Image
                                            src={event.poster || '/event-placeholder.jpg'}
                                            alt={event.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Event Details */}
                                    <div className="p-6">
                                        <div className="flex gap-4">
                                            {/* Date Section */}
                                            <div className="flex flex-col items-center justify-center min-w-17.5">
                                                <div className="text-skin-deep font-serif">
                                                    <div className="text-4xl font-bold leading-none">{dateInfo.day}</div>
                                                    <div className="text-sm font-semibold mt-1">{dateInfo.month}</div>
                                                </div>
                                            </div>

                                            {/* Divider */}
                                            <div className="w-px bg-gray-200"></div>

                                            {/* Event Info */}
                                            <div className="flex-1">
                                                <div className="flex items-start gap-2 mb-2">
                                                    <HiLocationMarker className="text-sm text-skin-deep" />
                                                    <span className="text-xs text-tan-dark">{event.venue}</span>
                                                </div>
                                                <h3 className="text-xl font-serif text-skin-deep font-bold leading-tight mb-1">
                                                    {event.name}
                                                </h3>
                                                <p className="text-sm text-tan-dark leading-relaxed">
                                                    {truncateText(event.description, 100)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-lg text-skin-darker">No events available at the moment.</p>
                    </div>
                )}

                {/* View All Button */}
                <div className="text-center mt-12">
                    <a
                        href="/events"
                        className="inline-block border-2 border-skin-deep hover:bg-skin-light text-skin-deep font-semibold py-3 px-8 rounded-xl transition-colors duration-300"
                    >
                        View All Events
                    </a>
                </div>
            </div>
        </section>
    )
}

export default EventsSection