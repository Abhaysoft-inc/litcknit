import React from 'react'
import Image from 'next/image'
import { HiLocationMarker } from 'react-icons/hi'

const EventsSection = () => {
    const events = [
        {
            id: 1,
            title: "Poetry Night",
            subtitle: "Verses Under the Stars",
            day: "15",
            month: "MAR",
            location: "CSA Hall, KNIT Sultanpur",
            image: "/poetry-night.webp",
            description: "An enchanting evening of poetry recitations and spoken word performances to remember."
        },
        {
            id: 2,
            title: "Creative Writing",
            subtitle: "Storytelling Workshop",
            day: "22",
            month: "MAR",
            location: "CSA Hall, KNIT Sultanpur",
            image: "/creative-writing.jpg",
            description: "Learn the art of storytelling from renowned authors and enhance your writing skills."
        },
        {
            id: 3,
            title: "Debate Championship",
            subtitle: "Inter-College Competition",
            day: "05",
            month: "APR",
            location: "CSA Hall, KNIT Sultanpur",
            image: "/debate.webp",
            description: "Witness the battle of words as the best debaters compete for the championship title."
        }
    ]

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <a
                            key={event.id}
                            href={`/events/${event.id}`}
                            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block"
                        >
                            {/* Event Image */}
                            <div className="relative h-64 w-full">
                                <Image
                                    src={event.image}
                                    alt={event.title}
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
                                            <div className="text-4xl font-bold leading-none">{event.day}</div>
                                            <div className="text-sm font-semibold mt-1">{event.month}</div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-px bg-gray-200"></div>

                                    {/* Event Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start gap-2 mb-2">
                                            <HiLocationMarker className="text-sm text-skin-deep" />
                                            <span className="text-xs text-tan-dark">{event.location}</span>
                                        </div>
                                        <h3 className="text-xl font-serif text-skin-deep font-bold leading-tight mb-1">
                                            {event.title}
                                        </h3>
                                        <p className="text-sm text-tan-dark leading-relaxed">
                                            {event.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

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