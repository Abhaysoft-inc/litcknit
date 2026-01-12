"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { HiLocationMarker, HiClock } from 'react-icons/hi'
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
}

const truncateText = (text: string, maxWords: number) => {
    const words = text.split(' ')
    if (words.length <= maxWords) return text
    return words.slice(0, maxWords).join(' ') + '...'
}

const EventsPage = () => {
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true)
                const res = await fetch('/api/events')
                const data = await res.json()

                if (!res.ok || !data.success) {
                    setError(data.message || 'Failed to load events')
                    return
                }

                setEvents(data.data || [])
            } catch (err) {
                console.error(err)
                setError('Failed to load events')
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    const filters = [
        { id: 'all', label: 'All Events' },
        { id: 'Upcoming', label: 'Upcoming' },
        { id: 'Ongoing', label: 'Ongoing' },
        { id: 'Completed', label: 'Completed' },
        { id: 'Cancelled', label: 'Cancelled' },
    ]

    const filteredEvents = selectedStatus === 'all'
        ? events
        : events.filter(event => event.status === selectedStatus)

    return (
        <div className="min-h-screen bg-skin-lightest">
            <Navbar />

            {/* Hero Section */}
            <section className="w-full border-b border-skin-lighter bg-skin-lightest">
                <div className="max-w-7xl mx-auto px-6 md:px-20 py-10 md:py-14">
                    <div className="max-w-3xl">
                        <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-skin-medium mb-3">
                            Events
                        </p>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-skin-deep mb-4 leading-tight">
                            Literary Events
                        </h1>
                        <p className="text-base md:text-lg text-skin-darker leading-relaxed max-w-2xl">
                            Immerse yourself in the world of literature through our carefully curated events,
                            workshops, and competitions designed to inspire and engage.
                        </p>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="w-full py-8 px-8 md:px-20 bg-skin-light">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-4">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setSelectedStatus(filter.id)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedStatus === filter.id
                                    ? 'bg-skin-deep text-white shadow-lg'
                                    : 'bg-white text-skin-deep hover:bg-skin-lighter border-2 border-skin-deep'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="w-full py-16 px-8 md:px-20 bg-skin-lightest">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="text-center py-20">
                            <p className="text-2xl text-skin-deep font-serif">
                                Loading events...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20">
                            <p className="text-2xl text-red-600 font-serif">
                                {error}
                            </p>
                        </div>
                    ) : filteredEvents.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-2xl text-skin-deep font-serif">
                                No events found in this category
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                            {filteredEvents.map((event) => {
                                const eventDate = new Date(event.date)
                                const day = eventDate.getDate().toString().padStart(2, '0')
                                const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase()

                                const now = new Date()
                                let registrationOpen = false
                                if (event.status === 'Upcoming' && event.registrationDeadline) {
                                    const registrationDeadline = new Date(event.registrationDeadline)
                                    if (!Number.isNaN(registrationDeadline.getTime())) {
                                        registrationOpen = registrationDeadline >= now
                                    }
                                }

                                return (
                                    <a
                                        key={event._id}
                                        href={`/events/${event._id}`}
                                        className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
                                    >
                                        {/* Event Image */}
                                        <div className="relative h-64 w-full">
                                            <Image
                                                src="/poetry-night.webp"
                                                alt={event.name}
                                                fill
                                                className="object-cover"
                                            />
                                            {!registrationOpen && (
                                                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                    Registration Closed
                                                </div>
                                            )}
                                        </div>

                                        {/* Event Details */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex gap-4 mb-4">
                                                {/* Date Section */}
                                                <div className="flex flex-col items-center justify-center min-w-[70px]">
                                                    <div className="text-skin-deep font-serif">
                                                        <div className="text-4xl font-bold leading-none">{day}</div>
                                                        <div className="text-sm font-semibold mt-1">{month}</div>
                                                    </div>
                                                </div>

                                                {/* Divider */}
                                                <div className="w-px bg-gray-200"></div>

                                                {/* Event Info */}
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-serif text-skin-deep font-bold leading-tight mb-1">
                                                        {event.name}
                                                    </h3>
                                                    <p className="text-sm text-skin-medium font-semibold mb-2 capitalize">
                                                        {event.status.toLowerCase()}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Additional Details */}
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-start gap-2">
                                                    <HiLocationMarker className="text-base text-skin-deep mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm text-skin-darker">{event.venue}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <HiClock className="text-base text-skin-deep flex-shrink-0" />
                                                    <span className="text-sm text-skin-darker">{event.time}</span>
                                                </div>
                                            </div>

                                            <p className="text-sm text-skin-darker leading-relaxed mb-4 flex-1">
                                                {truncateText(event.description, 30)}
                                            </p>

                                            {/* Action Button */}
                                            <div
                                                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 text-center ${registrationOpen
                                                    ? 'bg-skin-deep text-white'
                                                    : 'bg-gray-300 text-gray-500'
                                                    }`}
                                            >
                                                {registrationOpen ? 'View Details & Register' : 'View Details'}
                                            </div>
                                        </div>
                                    </a>
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="w-full py-16 px-8 md:px-20 bg-skin-light">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-skin-deep mb-6">
                        Stay Updated
                    </h2>
                    <p className="text-lg text-skin-darker mb-8">
                        Don't miss out on our upcoming events! Follow us on social media or contact us to learn more about registration and participation.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="/contact"
                            className="bg-skin-deep text-whitze font-semibold py-3 px-8 rounded-xl hover:bg-skin-darker transition-colors duration-300"
                        >
                            Contact Us
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

export default EventsPage
