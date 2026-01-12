'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import toast from 'react-hot-toast';
import { HiTrash, HiUserGroup } from 'react-icons/hi';
import { IoMdTrophy } from 'react-icons/io';

interface TeamMember {
    name: string;
    email: string;
    phone: string;
}

interface Registration {
    _id: string;
    name: string;
    email: string;
    phone: string;
    teamName?: string;
    teamMembers?: TeamMember[];
    status: string;
    registeredAt: string;
    result?: {
        position?: string;
        customPosition?: string;
        remarks?: string;
    };
}

interface Event {
    _id: string;
    name: string;
    eventType: 'individual' | 'team';
}

export default function EventRegistrationsPage() {
    const params = useParams();
    const router = useRouter();
    const eventId = params?.id as string | undefined;

    const [event, setEvent] = useState<Event | null>(null);
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showDeclareResultsModal, setShowDeclareResultsModal] = useState(false);
    const [declareResultsForm, setDeclareResultsForm] = useState({
        first: '',
        second: '',
        third: '',
        customResults: [] as Array<{ registrationId: string; position: string; remarks: string }>
    });

    useEffect(() => {
        if (eventId) {
            fetchEvent();
            fetchRegistrations();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventId]);

    const fetchEvent = async () => {
        try {
            const res = await fetch(`/api/events/${eventId}`);
            const data = await res.json();
            if (data.success) {
                setEvent(data.data);
            }
        } catch (err) {
            console.error('Failed to fetch event:', err);
        }
    };

    const fetchRegistrations = async () => {
        try {
            const res = await fetch(`/api/events/${eventId}`);
            const data = await res.json();
            if (data.success) {
                setRegistrations(data.data.registrations || []);
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



    const handleDelete = async (registrationId: string, name: string) => {
        if (!confirm(`Are you sure you want to delete registration for ${name}?`)) {
            return;
        }

        try {
            const res = await fetch(`/api/events/${eventId}/registrations/${registrationId}`, {
                method: 'DELETE'
            });

            const data = await res.json();

            if (data.success) {
                toast.success('Registration deleted successfully');
                fetchRegistrations();
            } else {
                toast.error(data.message || 'Failed to delete registration');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete registration');
        }
    };

    const handleDeclareResults = async () => {
        const updates: Array<{ registrationId: string; result: any }> = [];

        // Add top 3 winners
        if (declareResultsForm.first) {
            updates.push({
                registrationId: declareResultsForm.first,
                result: { position: '1st' }
            });
        }
        if (declareResultsForm.second) {
            updates.push({
                registrationId: declareResultsForm.second,
                result: { position: '2nd' }
            });
        }
        if (declareResultsForm.third) {
            updates.push({
                registrationId: declareResultsForm.third,
                result: { position: '3rd' }
            });
        }

        // Add custom results
        declareResultsForm.customResults.forEach(custom => {
            if (custom.registrationId) {
                updates.push({
                    registrationId: custom.registrationId,
                    result: {
                        position: 'participated',
                        remarks: custom.remarks
                    }
                });
            }
        });

        if (updates.length === 0) {
            toast.error('Please select at least one winner');
            return;
        }

        try {
            // Update all results
            const promises = updates.map(update =>
                fetch(`/api/events/${eventId}/registrations/${update.registrationId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ result: update.result })
                })
            );

            const responses = await Promise.all(promises);
            const results = await Promise.all(responses.map(r => r.json()));

            const failed = results.filter(r => !r.success);
            if (failed.length > 0) {
                toast.error(`Failed to update ${failed.length} result(s)`);
            } else {
                toast.success('All results declared successfully!');
                setShowDeclareResultsModal(false);
                setDeclareResultsForm({
                    first: '',
                    second: '',
                    third: '',
                    customResults: []
                });
                fetchRegistrations();
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to declare results');
        }
    };

    const addCustomResult = () => {
        setDeclareResultsForm({
            ...declareResultsForm,
            customResults: [...declareResultsForm.customResults, { registrationId: '', position: 'participated', remarks: '' }]
        });
    };

    const removeCustomResult = (index: number) => {
        const updated = [...declareResultsForm.customResults];
        updated.splice(index, 1);
        setDeclareResultsForm({ ...declareResultsForm, customResults: updated });
    };

    const updateCustomResult = (index: number, field: string, value: string) => {
        const updated = [...declareResultsForm.customResults];
        updated[index] = { ...updated[index], [field]: value };
        setDeclareResultsForm({ ...declareResultsForm, customResults: updated });
    };

    const openDeclareResultsModal = () => {
        // Pre-populate with existing results
        const first = registrations.find(r => r.result?.position === '1st')?._id || '';
        const second = registrations.find(r => r.result?.position === '2nd')?._id || '';
        const third = registrations.find(r => r.result?.position === '3rd')?._id || '';

        setDeclareResultsForm({
            first,
            second,
            third,
            customResults: []
        });
        setShowDeclareResultsModal(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'registered':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'attended':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'cancelled':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'banned':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'disqualified':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getResultBadge = (result?: Registration['result']) => {
        if (!result?.position) return null;

        const colors = {
            '1st': 'bg-yellow-100 text-yellow-800 border-yellow-300',
            '2nd': 'bg-gray-100 text-gray-800 border-gray-300',
            '3rd': 'bg-amber-100 text-amber-800 border-amber-300',
            'participated': 'bg-purple-100 text-purple-800 border-purple-300',
            'custom': 'bg-indigo-100 text-indigo-800 border-indigo-300'
        };

        return (
            <div className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border ${colors[result.position as keyof typeof colors]}`}>
                <IoMdTrophy />
                {result.position === 'custom' && result.customPosition ? result.customPosition : result.position}
            </div>
        );
    };

    const stats = {
        total: registrations.length,
        registered: registrations.filter(r => r.status === 'registered').length,
        attended: registrations.filter(r => r.status === 'attended').length,
        cancelled: registrations.filter(r => r.status === 'cancelled').length,
        withResults: registrations.filter(r => r.result?.position).length
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">
                                {event?.name || 'Event'} Registrations
                            </h2>
                            <p className="text-sm text-gray-600">
                                Manage all registrations for this {event?.eventType || 'event'}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={openDeclareResultsModal}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <IoMdTrophy />
                                Declare Results
                            </button>
                            <button
                                onClick={() => router.push(`/admin/dashboard/events/${eventId}`)}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
                            >
                                Back to Event
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-xs text-gray-600 uppercase">Total</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-xs text-green-600 uppercase">Registered</p>
                        <p className="text-2xl font-bold text-green-800">{stats.registered}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-xs text-blue-600 uppercase">Attended</p>
                        <p className="text-2xl font-bold text-blue-800">{stats.attended}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-xs text-gray-600 uppercase">Cancelled</p>
                        <p className="text-2xl font-bold text-gray-800">{stats.cancelled}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-xs text-purple-600 uppercase">Results</p>
                        <p className="text-2xl font-bold text-purple-800">{stats.withResults}</p>
                    </div>
                </div>

                {/* Registrations List */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">All Registrations</h3>
                    </div>
                    <div className="p-6">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-skin-deep mx-auto"></div>
                                <p className="text-gray-500 mt-4">Loading registrations...</p>
                            </div>
                        ) : error ? (
                            <p className="text-red-600 text-sm text-center py-12">{error}</p>
                        ) : registrations.length === 0 ? (
                            <p className="text-gray-500 text-center py-12">No registrations found.</p>
                        ) : (
                            <div className="space-y-4">
                                {registrations.map((reg, index) => (
                                    <div
                                        key={reg._id}
                                        className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-sm font-semibold text-gray-500">#{index + 1}</span>
                                                    <h3 className="font-bold text-gray-800 text-lg">{reg.name}</h3>
                                                    {reg.teamName && (
                                                        <span className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full border border-purple-200">
                                                            <HiUserGroup />
                                                            {reg.teamName}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-semibold">Email:</span> {reg.email}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-semibold">Phone:</span> {reg.phone}
                                                    </p>
                                                </div>

                                                {reg.teamMembers && reg.teamMembers.length > 0 && (
                                                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                                        <p className="text-xs font-semibold text-gray-700 mb-2">Team Members:</p>
                                                        <div className="space-y-2">
                                                            {reg.teamMembers.map((member, idx) => (
                                                                <div key={idx} className="text-xs text-gray-600">
                                                                    <span className="font-medium">{idx + 1}. {member.name}</span>
                                                                    {' • '}{member.email}{' • '}{member.phone}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-2 mt-3">
                                                    <span className={`px-3 py-1 text-xs rounded-full font-medium border ${getStatusColor(reg.status)}`}>
                                                        {reg.status.toUpperCase()}
                                                    </span>
                                                    {getResultBadge(reg.result)}
                                                    {reg.result?.remarks && (
                                                        <span className="text-xs text-gray-600 italic">"{reg.result.remarks}"</span>
                                                    )}
                                                </div>

                                                <p className="text-xs text-gray-500 mt-2">
                                                    Registered: {new Date(reg.registeredAt).toLocaleString('en-US', {
                                                        dateStyle: 'medium',
                                                        timeStyle: 'short'
                                                    })}
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => handleDelete(reg._id, reg.name)}
                                                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition-colors flex items-center gap-1"
                                                    title="Delete Registration"
                                                >
                                                    <HiTrash />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Declare Results Modal */}
            {showDeclareResultsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <IoMdTrophy className="text-yellow-500" />
                                Declare Event Results
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Select winners and participants for {event?.name}
                            </p>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Top 3 Winners */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-800">🏆 Top 3 Winners</h4>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">🥇 1st Place</label>
                                    <select
                                        value={declareResultsForm.first}
                                        onChange={(e) => setDeclareResultsForm({ ...declareResultsForm, first: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="">Select Winner</option>
                                        {registrations.map(reg => (
                                            <option key={reg._id} value={reg._id}>
                                                {reg.teamName ? `${reg.teamName} (${reg.name})` : reg.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">🥈 2nd Place</label>
                                    <select
                                        value={declareResultsForm.second}
                                        onChange={(e) => setDeclareResultsForm({ ...declareResultsForm, second: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="">Select Winner</option>
                                        {registrations
                                            .filter(r => r._id !== declareResultsForm.first)
                                            .map(reg => (
                                                <option key={reg._id} value={reg._id}>
                                                    {reg.teamName ? `${reg.teamName} (${reg.name})` : reg.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">🥉 3rd Place</label>
                                    <select
                                        value={declareResultsForm.third}
                                        onChange={(e) => setDeclareResultsForm({ ...declareResultsForm, third: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="">Select Winner</option>
                                        {registrations
                                            .filter(r => r._id !== declareResultsForm.first && r._id !== declareResultsForm.second)
                                            .map(reg => (
                                                <option key={reg._id} value={reg._id}>
                                                    {reg.teamName ? `${reg.teamName} (${reg.name})` : reg.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            {/* Other Participants */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-gray-800">👥 Other Participants</h4>
                                    <button
                                        onClick={addCustomResult}
                                        className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 text-sm rounded-lg transition-colors"
                                    >
                                        + Add Participant
                                    </button>
                                </div>

                                {declareResultsForm.customResults.map((custom, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-gray-700">Participant {index + 1}</label>
                                            <button
                                                onClick={() => removeCustomResult(index)}
                                                className="text-red-600 hover:text-red-700 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <select
                                            value={custom.registrationId}
                                            onChange={(e) => updateCustomResult(index, 'registrationId', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value="">Select Participant</option>
                                            {registrations
                                                .filter(r =>
                                                    r._id !== declareResultsForm.first &&
                                                    r._id !== declareResultsForm.second &&
                                                    r._id !== declareResultsForm.third
                                                )
                                                .map(reg => (
                                                    <option key={reg._id} value={reg._id}>
                                                        {reg.teamName ? `${reg.teamName} (${reg.name})` : reg.name}
                                                    </option>
                                                ))}
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Remarks (optional)"
                                            value={custom.remarks}
                                            onChange={(e) => updateCustomResult(index, 'remarks', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex gap-3 bg-gray-50 sticky bottom-0">
                            <button
                                onClick={() => {
                                    setShowDeclareResultsModal(false);
                                    setDeclareResultsForm({
                                        first: '',
                                        second: '',
                                        third: '',
                                        customResults: []
                                    });
                                }}
                                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeclareResults}
                                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-semibold"
                            >
                                Declare Results
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
