'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Event {
    _id: string;
    name: string;
    date: string;
    status: string;
    eventType: string;
    maxParticipants: number;
    registrations: any[];
}

export default function EventsManagement() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        fetchEvents();
    }, [filter]);

    const fetchEvents = async () => {
        try {
            const url = filter === 'all' ? '/api/events' : `/api/events?status=${filter}`;
            const res = await fetch(url);
            const data = await res.json();
            setEvents(data.data || []);
        } catch (error) {
            console.error('Failed to fetch events:', error);
            toast.error('Failed to fetch events');
        } finally {
            setLoading(false);
        }
    };

    const deleteEvent = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
            const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setEvents(events.filter(e => e._id !== id));
                toast.success('Event deleted successfully');
            } else {
                const data = await res.json().catch(() => null);
                toast.error(data?.message || 'Failed to delete event');
            }
        } catch (error) {
            console.error('Failed to delete event:', error);
            toast.error('Failed to delete event');
        }
    };

    const getStatusBadge = (status: string) => {
        const colors: any = {
            'Upcoming': 'bg-blue-100 text-blue-800',
            'Ongoing': 'bg-green-100 text-green-800',
            'Completed': 'bg-gray-100 text-gray-800',
            'Cancelled': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Events Management</h2>
                    <Link
                        href="/admin/dashboard/events/new"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        + New Event
                    </Link>
                </div>
                <div className="flex gap-2 mt-4">
                    {['all', 'Upcoming', 'Ongoing', 'Completed', 'Cancelled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {status === 'all' ? 'All' : status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6">
                {events.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No events found</p>
                ) : (
                    <div className="space-y-4">
                        {events.map((event) => {
                            const activeRegistrations = event.registrations?.filter(
                                (r: any) => r.status === 'registered'
                            ).length || 0;

                            return (
                                <div
                                    key={event._id}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {event.name}
                                                </h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(event.status)}`}>
                                                    {event.status}
                                                </span>
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                    {event.eventType}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                                                <span>
                                                    👥 {activeRegistrations}/{event.maxParticipants} registered
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/admin/dashboard/events/${event._id}/registrations`}
                                                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                                            >
                                                View Registrations
                                            </Link>
                                            <Link
                                                href={`/admin/dashboard/events/${event._id}`}
                                                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteEvent(event._id)}
                                                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
