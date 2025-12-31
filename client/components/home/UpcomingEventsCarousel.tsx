'use client'

import { useState } from 'react'
import { FaCalendar, FaMapMarkerAlt, FaClock, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Event {
    id: number
    title: string
    date: string
    time: string
    location: string
    description: string
    category: string
}

interface UpcomingEventsCarouselProps {
    events: Event[]
}

export default function UpcomingEventsCarousel({ events }: UpcomingEventsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % events.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)
    }

    return (
        <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <FaCalendar className="w-6 h-6 text-[#8b7355] mr-2" />
                    <h2 className="font-serif text-2xl font-bold text-gray-900">Upcoming Events</h2>
                </div>
            </div>

            <div className="relative">
                {/* Carousel Container */}
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {events.map((event) => (
                            <div key={event.id} className="w-full flex-shrink-0">
                                <div className="bg-[#f5e6d3] border border-[#e8d4bd] rounded-lg p-6 md:p-8 shadow-sm">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Date Box */}
                                        <div className="flex-shrink-0">
                                            <div className="bg-white border-2 border-[#8b7355] rounded-lg p-4 text-center w-24">
                                                <div className="text-sm text-[#8b7355] font-semibold uppercase">
                                                    {event.date.split(' ')[0]}
                                                </div>
                                                <div className="text-3xl font-bold text-gray-900 my-1">
                                                    {event.date.split(' ')[1]}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {event.date.split(' ')[2]}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Event Details */}
                                        <div className="flex-1">
                                            <div className="inline-block bg-white border border-[#e8d4bd] px-3 py-1 rounded-full text-xs font-medium text-[#8b7355] mb-3">
                                                {event.category}
                                            </div>
                                            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                                                {event.title}
                                            </h3>
                                            <p className="text-gray-700 mb-4 leading-relaxed">
                                                {event.description}
                                            </p>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <FaClock className="w-4 h-4 text-[#8b7355]" />
                                                    <span>{event.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaMapMarkerAlt className="w-4 h-4 text-[#8b7355]" />
                                                    <span>{event.location}</span>
                                                </div>
                                            </div>
                                            <button className="mt-4 bg-[#8b7355] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#6d5a43] transition-colors">
                                                Register Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border-2 border-[#e8d4bd] rounded-full p-3 shadow-md hover:bg-[#f5e6d3] transition-colors"
                    aria-label="Previous event"
                >
                    <FaChevronLeft className="w-5 h-5 text-[#8b7355]" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border-2 border-[#e8d4bd] rounded-full p-3 shadow-md hover:bg-[#f5e6d3] transition-colors"
                    aria-label="Next event"
                >
                    <FaChevronRight className="w-5 h-5 text-[#8b7355]" />
                </button>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-6">
                    {events.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-[#8b7355] w-6'
                                    : 'bg-[#e8d4bd] hover:bg-[#d4c4ad]'
                                }`}
                            aria-label={`Go to event ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
