import React from 'react'
import Link from 'next/link'
import { HiCalendar, HiClock, HiLocationMarker, HiUsers } from 'react-icons/hi'

interface Event {
    name: string
    date: string
    time: string
    venue: string
    registrationDeadline: string
    maxParticipants: number
}

interface EventSummarySidebarProps {
    event: Event
    spotsLeft: number
    eventId: string | string[]
    formatDate: (dateString: string) => string
}

const EventSummarySidebar: React.FC<EventSummarySidebarProps> = ({
    event,
    spotsLeft,
    eventId,
    formatDate,
}) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
            <h3 className="text-xl font-serif text-skin-deep mb-4">Event Details</h3>
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-skin-deep text-lg mb-2">{event.name}</h4>
                </div>
                <div className="flex items-start gap-3">
                    <HiCalendar className="text-skin-deep text-xl shrink-0 mt-1" />
                    <div>
                        <p className="text-sm text-skin-darker font-semibold">Date</p>
                        <p className="text-skin-deep">{formatDate(event.date)}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <HiClock className="text-skin-deep text-xl shrink-0 mt-1" />
                    <div>
                        <p className="text-sm text-skin-darker font-semibold">Time</p>
                        <p className="text-skin-deep">{event.time}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <HiLocationMarker className="text-skin-deep text-xl shrink-0 mt-1" />
                    <div>
                        <p className="text-sm text-skin-darker font-semibold">Venue</p>
                        <p className="text-skin-deep">{event.venue}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <HiUsers className="text-skin-deep text-xl shrink-0 mt-1" />
                    <div>
                        <p className="text-sm text-skin-darker font-semibold">Spots Available</p>
                        <p className="text-skin-deep">{spotsLeft} / {event.maxParticipants}</p>
                    </div>
                </div>
                <div className="pt-4 border-t border-skin-lighter">
                    <p className="text-sm text-skin-darker">
                        <span className="font-semibold">Registration Deadline:</span><br />
                        {formatDate(event.registrationDeadline)}
                    </p>
                </div>
            </div>
            <div className="mt-6">
                <Link
                    href={`/events/${eventId}`}
                    className="block w-full text-center border-2 border-skin-deep text-skin-deep font-semibold py-3 px-6 rounded-xl hover:bg-skin-lighter transition-colors duration-300"
                >
                    View Event Details
                </Link>
            </div>
        </div>
    )
}

export default EventSummarySidebar
