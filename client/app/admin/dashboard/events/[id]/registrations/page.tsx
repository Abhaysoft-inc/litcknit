'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface Registration {
    _id: string;
    name: string;
    email: string;
    phone: string;
    teamName?: string;
    status: string;
    registeredAt: string;
}

export default function EventRegistrationsPage() {
    const params = useParams();
    const eventId = params?.id as string | undefined;

    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (eventId) {
            fetchRegistrations();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventId]);

    const fetchRegistrations = async () => {
        try {
            const res = await fetch(`/api/events/${eventId}/register`);
            const data = await res.json();
            if (data.success) {
                setRegistrations(data.data || []);
            } else {
                setError(data.message || 'Failed to load registrations');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to load registrations');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-1">Event Registrations</h2>
                    <p className="text-sm text-gray-600">View all registrations for this event.</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    {loading ? (
                        <p className="text-gray-500">Loading registrations...</p>
                    ) : error ? (
                        <p className="text-red-600 text-sm">{error}</p>
                    ) : registrations.length === 0 ? (
                        <p className="text-gray-500">No registrations found.</p>
                    ) : (
                        <div className="space-y-3">
                            {registrations.map((reg) => (
                                <div
                                    key={reg._id}
                                    className="border border-gray-200 rounded-lg p-4 flex items-start justify-between"
                                >
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{reg.name}</h3>
                                        <p className="text-sm text-gray-600">{reg.email} • {reg.phone}</p>
                                        {reg.teamName && (
                                            <p className="text-xs text-purple-700 mt-1">Team: {reg.teamName}</p>
                                        )}
                                        <p className="text-xs text-gray-500 mt-1">
                                            Registered at {new Date(reg.registeredAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 text-xs rounded-full font-medium ${reg.status === 'registered'
                                                ? 'bg-green-100 text-green-800'
                                                : reg.status === 'attended'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {reg.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
