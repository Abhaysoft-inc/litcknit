"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { HiLocationMarker, HiCalendar, HiClock } from 'react-icons/hi'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'

const EventsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all')

    const events = [
        {
            id: 1,
            title: "Poetry Night",
            subtitle: "Verses Under the Stars",
            day: "15",
            month: "MAR",
            year: "2026",
            time: "6:00 PM - 9:00 PM",
            location: "CSA Hall, KNIT Sultanpur",
            image: "/poetry-night.webp",
            description: "An enchanting evening of poetry recitations and spoken word performances to remember. Join us for a magical night where words come alive under the starlit sky.",
            category: "cultural",
            registrationOpen: true
        },
        {
            id: 2,
            title: "Creative Writing",
            subtitle: "Storytelling Workshop",
            day: "22",
            month: "MAR",
            year: "2026",
            time: "2:00 PM - 5:00 PM",
            location: "CSA Hall, KNIT Sultanpur",
            image: "/creative-writing.jpg",
            description: "Learn the art of storytelling from renowned authors and enhance your writing skills. This workshop covers character development, plot structure, and narrative techniques.",
            category: "workshop",
            registrationOpen: true
        },
        {
            id: 3,
            title: "Debate Championship",
            subtitle: "Inter-College Competition",
            day: "05",
            month: "APR",
            year: "2026",
            time: "10:00 AM - 5:00 PM",
            location: "CSA Hall, KNIT Sultanpur",
            image: "/debate.webp",
            description: "Witness the battle of words as the best debaters compete for the championship title. Teams from various colleges will compete in multiple rounds of intense debates.",
            category: "competition",
            registrationOpen: true
        },
        {
            id: 4,
            title: "Book Reading Session",
            subtitle: "Classics Revisited",
            day: "12",
            month: "APR",
            year: "2026",
            time: "4:00 PM - 6:00 PM",
            location: "Library Lawn, KNIT Sultanpur",
            image: "/poetry-night.webp",
            description: "A cozy afternoon session where we read and discuss timeless classics. Bring your favorite book and share your thoughts with fellow literature enthusiasts.",
            category: "cultural",
            registrationOpen: true
        },
        {
            id: 5,
            title: "Open Mic Night",
            subtitle: "Express Yourself",
            day: "20",
            month: "APR",
            year: "2026",
            time: "7:00 PM - 10:00 PM",
            location: "CSA Hall, KNIT Sultanpur",
            image: "/debate.webp",
            description: "An open platform for poets, storytellers, and performers to share their art. Whether you're a seasoned performer or trying for the first time, all are welcome!",
            category: "cultural",
            registrationOpen: true
        },
        {
            id: 6,
            title: "Literary Quiz",
            subtitle: "Test Your Knowledge",
            day: "28",
            month: "APR",
            year: "2026",
            time: "3:00 PM - 6:00 PM",
            location: "CSA Hall, KNIT Sultanpur",
            image: "/creative-writing.jpg",
            description: "Challenge yourself in this exciting literary quiz covering books, authors, and literary history. Compete individually or in teams for exciting prizes.",
            category: "competition",
            registrationOpen: false
        }
    ]

    const categories = [
        { id: 'all', label: 'All Events' },
        { id: 'cultural', label: 'Cultural' },
        { id: 'workshop', label: 'Workshops' },
        { id: 'competition', label: 'Competitions' }
    ]

    const filteredEvents = selectedCategory === 'all'
        ? events
        : events.filter(event => event.category === selectedCategory)

    return (
        <div className="min-h-screen bg-skin-lightest">
            <Navbar />

            {/* Hero Section */}
            <section className="relative w-full py-20 px-8 md:px-20 bg-gradient-to-br from-skin-light via-skin-lighter to-skin-lightest">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-serif text-skin-deep mb-6">
                        Literary Events
                    </h1>
                    <p className="text-xl md:text-2xl text-skin-darker max-w-3xl mx-auto leading-relaxed">
                        Immerse yourself in the world of literature through our carefully curated events,
                        workshops, and competitions designed to inspire and engage
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="w-full py-8 px-8 md:px-20 bg-skin-light">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category.id
                                    ? 'bg-skin-deep text-white shadow-lg'
                                    : 'bg-white text-skin-deep hover:bg-skin-lighter border-2 border-skin-deep'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="w-full py-16 px-8 md:px-20 bg-skin-lightest">
                <div className="max-w-7xl mx-auto">
                    {filteredEvents.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-2xl text-skin-deep font-serif">
                                No events found in this category
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEvents.map((event) => (
                                <a
                                    key={event.id}
                                    href={`/events/${event.id}`}
                                    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
                                >
                                    {/* Event Image */}
                                    <div className="relative h-64 w-full">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover"
                                        />
                                        {!event.registrationOpen && (
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
                                                    <div className="text-4xl font-bold leading-none">{event.day}</div>
                                                    <div className="text-sm font-semibold mt-1">{event.month}</div>
                                                </div>
                                            </div>

                                            {/* Divider */}
                                            <div className="w-px bg-gray-200"></div>

                                            {/* Event Info */}
                                            <div className="flex-1">
                                                <h3 className="text-xl font-serif text-skin-deep font-bold leading-tight mb-1">
                                                    {event.title}
                                                </h3>
                                                <p className="text-sm text-skin-medium font-semibold mb-2">
                                                    {event.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Additional Details */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-start gap-2">
                                                <HiLocationMarker className="text-base text-skin-deep mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-skin-darker">{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <HiClock className="text-base text-skin-deep flex-shrink-0" />
                                                <span className="text-sm text-skin-darker">{event.time}</span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-skin-darker leading-relaxed mb-4 flex-1">
                                            {event.description}
                                        </p>

                                        {/* Action Button */}
                                        <div
                                            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 text-center ${event.registrationOpen
                                                ? 'bg-skin-deep text-white'
                                                : 'bg-gray-300 text-gray-500'
                                                }`}
                                        >
                                            {event.registrationOpen ? 'View Details & Register' : 'View Details'}
                                        </div>
                                    </div>
                                </a>
                            ))}
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
                            className="bg-skin-deep text-white font-semibold py-3 px-8 rounded-xl hover:bg-skin-darker transition-colors duration-300"
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
