"use client"

import React from 'react'
import Image from 'next/image'
import { HiLocationMarker, HiCalendar, HiClock, HiUsers, HiTicket } from 'react-icons/hi'
import { useParams } from 'next/navigation'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'

const EventDetailPage = () => {
    const params = useParams()
    const eventId = params.id

    // In a real application, you would fetch this data based on the eventId
    const eventsData: { [key: string]: any } = {
        "1": {
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
            fullDescription: "Step into an enchanting evening where poetry takes center stage under a canopy of stars. Our Poetry Night is a celebration of the written and spoken word, bringing together poets, enthusiasts, and lovers of language for an unforgettable experience.\n\nThe event will feature performances from both established poets and emerging voices from our literary community. Whether you're a seasoned performer or taking the stage for the first time, this is your opportunity to share your verses with an appreciative audience.\n\nThe evening will be divided into multiple segments, including classical poetry readings, contemporary spoken word performances, and an open mic session where attendees can share their own creations. We'll also have a special performance by renowned poets from across the region.",
            category: "cultural",
            registrationOpen: true,
            capacity: "150 attendees",
            registrationDeadline: "March 10, 2026",
            entryFee: "Free",
            agenda: [
                { time: "6:00 PM", activity: "Registration & Welcome" },
                { time: "6:30 PM", activity: "Opening Performance" },
                { time: "7:00 PM", activity: "Classical Poetry Recitations" },
                { time: "7:45 PM", activity: "Break & Refreshments" },
                { time: "8:00 PM", activity: "Contemporary Spoken Word" },
                { time: "8:30 PM", activity: "Open Mic Session" },
                { time: "9:00 PM", activity: "Closing Remarks" }
            ],
            highlights: [
                "Live poetry performances by renowned artists",
                "Open mic opportunities for all attendees",
                "Networking with fellow poetry enthusiasts",
                "Complimentary refreshments",
                "Certificate of participation"
            ],
            organizers: ["Literary Council KNIT", "Poetry Club"],
            contact: "litcouncil@knit.ac.in"
        },
        "2": {
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
            fullDescription: "Unlock your storytelling potential in this comprehensive creative writing workshop led by award-winning authors and experienced writers. This intensive three-hour session is designed to help aspiring writers develop their craft and find their unique voice.\n\nParticipants will engage in hands-on exercises covering essential elements of storytelling, including character development, plot structure, narrative voice, and world-building. Through interactive discussions and writing prompts, you'll learn how to bring your stories to life and captivate your readers.\n\nThe workshop includes both theoretical insights and practical applications, with opportunities for peer feedback and one-on-one guidance from our expert facilitators. Whether you're working on your first short story or polishing a novel manuscript, this workshop will provide valuable tools and techniques to elevate your writing.",
            category: "workshop",
            registrationOpen: true,
            capacity: "40 attendees",
            registrationDeadline: "March 18, 2026",
            entryFee: "₹200",
            agenda: [
                { time: "2:00 PM", activity: "Introduction & Ice Breaker" },
                { time: "2:20 PM", activity: "Fundamentals of Storytelling" },
                { time: "2:50 PM", activity: "Character Development Workshop" },
                { time: "3:30 PM", activity: "Tea Break" },
                { time: "3:45 PM", activity: "Plot Structure & Narrative Techniques" },
                { time: "4:30 PM", activity: "Writing Exercise & Peer Feedback" },
                { time: "5:00 PM", activity: "Q&A and Closing" }
            ],
            highlights: [
                "Learn from award-winning authors",
                "Hands-on writing exercises",
                "Personalized feedback sessions",
                "Workshop materials and resources",
                "Certificate of completion",
                "Networking with fellow writers"
            ],
            organizers: ["Literary Council KNIT", "Writers Guild"],
            contact: "litcouncil@knit.ac.in"
        },
        "3": {
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
            fullDescription: "The annual Inter-College Debate Championship returns, bringing together the most talented debaters from institutions across the region. This prestigious competition showcases the power of rhetoric, critical thinking, and eloquent argumentation.\n\nTeams will compete in multiple rounds covering diverse topics ranging from social issues to technology, politics, and culture. Each round will test the participants' ability to think on their feet, construct compelling arguments, and respond to counterpoints with precision and grace.\n\nThe championship follows parliamentary debate format with teams of two members each. Judges include distinguished academics, legal professionals, and former debate champions who will evaluate participants on argumentation, rebuttal, teamwork, and presentation.\n\nThis is more than just a competition—it's a platform for young minds to engage with pressing issues, develop leadership skills, and connect with like-minded individuals who value the art of discourse.",
            category: "competition",
            registrationOpen: true,
            capacity: "20 teams (40 participants)",
            registrationDeadline: "March 30, 2026",
            entryFee: "₹500 per team",
            agenda: [
                { time: "10:00 AM", activity: "Team Registration & Briefing" },
                { time: "10:30 AM", activity: "Opening Ceremony" },
                { time: "11:00 AM", activity: "Preliminary Round 1" },
                { time: "12:00 PM", activity: "Preliminary Round 2" },
                { time: "1:00 PM", activity: "Lunch Break" },
                { time: "2:00 PM", activity: "Quarter Finals" },
                { time: "3:00 PM", activity: "Semi Finals" },
                { time: "4:00 PM", activity: "Grand Finals" },
                { time: "4:45 PM", activity: "Prize Distribution & Closing" }
            ],
            highlights: [
                "Championship trophy for winning team",
                "Cash prizes worth ₹25,000",
                "Certificates for all participants",
                "Best Speaker awards",
                "Judging by renowned debate experts",
                "Networking with debaters from other colleges",
                "Live audience participation"
            ],
            organizers: ["Literary Council KNIT", "Debate Society"],
            contact: "litcouncil@knit.ac.in"
        }
    }

    const event = eventsData[eventId as string] || eventsData["1"]

    return (
        <div className="min-h-screen bg-skin-lightest">
            <Navbar />

            {/* Hero Section with Image */}
            <section className="relative w-full h-[400px] md:h-[500px]">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="inline-block bg-skin-deep text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 capitalize">
                            {event.category}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
                            {event.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 font-medium">
                            {event.subtitle}
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
                                {event.fullDescription.split('\n\n').map((paragraph: string, index: number) => (
                                    <p key={index} className="text-skin-darker leading-relaxed mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Event Highlights */}
                            <div className="mt-12">
                                <h3 className="text-2xl font-serif text-skin-deep mb-6">Event Highlights</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {event.highlights.map((highlight: string, index: number) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-skin-deep rounded-full mt-2 flex-shrink-0" />
                                            <p className="text-skin-darker">{highlight}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Agenda */}
                            <div className="mt-12">
                                <h3 className="text-2xl font-serif text-skin-deep mb-6">Event Agenda</h3>
                                <div className="space-y-4">
                                    {event.agenda.map((item: any, index: number) => (
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
                                                <p className="text-skin-deep font-bold">{event.day} {event.month} {event.year}</p>
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
                                                <p className="text-sm text-skin-darker font-semibold">Location</p>
                                                <p className="text-skin-deep font-bold">{event.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <HiUsers className="text-skin-deep text-xl flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-sm text-skin-darker font-semibold">Capacity</p>
                                                <p className="text-skin-deep font-bold">{event.capacity}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <HiTicket className="text-skin-deep text-xl flex-shrink-0 mt-1" />
                                            <div>
                                                <p className="text-sm text-skin-darker font-semibold">Entry Fee</p>
                                                <p className="text-skin-deep font-bold">{event.entryFee}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Registration Card */}
                                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-skin-light">
                                    {event.registrationOpen ? (
                                        <>
                                            <h3 className="text-lg font-serif text-skin-deep mb-3">Registration Open</h3>
                                            <p className="text-sm text-skin-darker mb-4">
                                                Deadline: {event.registrationDeadline}
                                            </p>
                                            <button className="w-full bg-skin-deep text-white font-semibold py-3 px-6 rounded-xl hover:bg-skin-darker transition-colors duration-300">
                                                Register Now
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="text-lg font-serif text-red-600 mb-3">Registration Closed</h3>
                                            <p className="text-sm text-skin-darker mb-4">
                                                Registration for this event has ended.
                                            </p>
                                            <button disabled className="w-full bg-gray-300 text-gray-500 font-semibold py-3 px-6 rounded-xl cursor-not-allowed">
                                                Registration Closed
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Organizers Card */}
                                <div className="bg-skin-lightest rounded-2xl p-6">
                                    <h3 className="text-lg font-serif text-skin-deep mb-4">Organized By</h3>
                                    <div className="space-y-2 mb-4">
                                        {event.organizers.map((organizer: string, index: number) => (
                                            <p key={index} className="text-skin-darker font-medium">{organizer}</p>
                                        ))}
                                    </div>
                                    <p className="text-sm text-skin-darker">
                                        <span className="font-semibold">Contact:</span> {event.contact}
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
