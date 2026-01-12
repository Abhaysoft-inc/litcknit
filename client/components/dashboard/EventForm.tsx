'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface EventFormProps {
    eventId?: string;
}

export default function EventForm({ eventId }: EventFormProps) {
    const isEdit = !!eventId;
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(!!eventId);
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [form, setForm] = useState({
        name: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        maxParticipants: 50,
        registrationDeadline: '',
        status: 'Upcoming',
        eventType: 'individual',
        teamSize: 1,
        prizes: '',
        poster: '',
        rulebook: '',
    });

    useEffect(() => {
        if (eventId) {
            fetchEvent();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventId]);

    const fetchEvent = async () => {
        try {
            const res = await fetch(`/api/events/${eventId}`);
            const data = await res.json();
            if (data.success && data.data) {
                const e = data.data;
                setForm({
                    name: e.name || '',
                    description: e.description || '',
                    date: e.date ? new Date(e.date).toISOString().slice(0, 10) : '',
                    time: e.time || '',
                    venue: e.venue || '',
                    maxParticipants: e.maxParticipants || 50,
                    registrationDeadline: e.registrationDeadline
                        ? new Date(e.registrationDeadline).toISOString().slice(0, 10)
                        : '',
                    status: e.status || 'Upcoming',
                    eventType: e.eventType || 'individual',
                    teamSize: e.teamSize || 1,
                    prizes: e.prizes || '',
                    poster: e.poster || '',
                    rulebook: e.rulebook || '',
                });
            } else {
                setError(data.message || 'Failed to load event');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to load event');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                name === 'maxParticipants' || name === 'teamSize' ? Number(value) || 0 : value,
        }));
    };

    const handleFileUpload = async (file: File, fileType: 'image' | 'pdf') => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileType', fileType);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Upload failed');
            }

            toast.success(`${fileType === 'image' ? 'Poster' : 'Rulebook'} uploaded successfully`);
            return data.data.url;
        } catch (err: any) {
            toast.error(err.message || 'Upload failed');
            throw err;
        } finally {
            setUploading(false);
        }
    };

    const handlePosterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size should be less than 5MB');
            return;
        }

        try {
            const url = await handleFileUpload(file, 'image');
            setForm((prev) => ({ ...prev, poster: url }));
        } catch (err) {
            console.error('Poster upload failed:', err);
        }
    };

    const handleRulebookChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (file.type !== 'application/pdf') {
            toast.error('Please select a PDF file');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            toast.error('PDF size should be less than 10MB');
            return;
        }

        try {
            const url = await handleFileUpload(file, 'pdf');
            setForm((prev) => ({ ...prev, rulebook: url }));
        } catch (err) {
            console.error('Rulebook upload failed:', err);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            const payload = {
                ...form,
                date: form.date ? new Date(form.date).toISOString() : undefined,
                registrationDeadline: form.registrationDeadline
                    ? new Date(form.registrationDeadline).toISOString()
                    : undefined,
            };

            const res = await fetch(eventId ? `/api/events/${eventId}` : '/api/events', {
                method: eventId ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                const message = data.message || 'Something went wrong';
                setError(message);
                toast.error(message);
            } else {
                const message = eventId ? 'Event updated successfully' : 'Event created successfully';
                setSuccess(message);
                toast.success(message);

                // After successful create/update, go back to events list
                router.push('/admin/dashboard/events');
            }
        } catch (err) {
            console.error(err);
            setError('Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <p className="text-gray-500">Loading event...</p>;
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                {isEdit ? 'Edit Event' : 'Create New Event'}
            </h2>

            {error && (
                <p className="mb-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
                    {error}
                </p>
            )}
            {success && (
                <p className="mb-3 text-sm text-green-600 bg-green-50 border border-green-100 rounded px-3 py-2">
                    {success}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                        <input
                            type="text"
                            name="venue"
                            value={form.venue}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <input
                            type="text"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                            placeholder="e.g. 3:00 PM"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Registration Deadline</label>
                        <input
                            type="date"
                            name="registrationDeadline"
                            value={form.registrationDeadline}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                        <input
                            type="number"
                            name="maxParticipants"
                            value={form.maxParticipants}
                            onChange={handleChange}
                            min={1}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                        <select
                            name="eventType"
                            value={form.eventType}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="individual">Individual</option>
                            <option value="team">Team</option>
                        </select>
                    </div>
                </div>

                {form.eventType === 'team' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                        <input
                            type="number"
                            name="teamSize"
                            value={form.teamSize}
                            onChange={handleChange}
                            min={1}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prizes</label>
                    <textarea
                        name="prizes"
                        value={form.prizes}
                        onChange={handleChange}
                        rows={2}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Event Poster
                        </label>
                        <div className="space-y-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePosterChange}
                                disabled={uploading}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {form.poster && (
                                <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200">
                                    <Image
                                        src={form.poster}
                                        alt="Event poster preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            {uploading && (
                                <p className="text-xs text-blue-600">Uploading...</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rulebook (PDF)
                        </label>
                        <div className="space-y-2">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleRulebookChange}
                                disabled={uploading}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {form.rulebook && (
                                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                    </svg>
                                    <a
                                        href={form.rulebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline truncate"
                                    >
                                        View Rulebook PDF
                                    </a>
                                </div>
                            )}
                            {uploading && (
                                <p className="text-xs text-blue-600">Uploading...</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {submitting ? (isEdit ? 'Updating...' : 'Creating...') : isEdit ? 'Update Event' : 'Create Event'}
                    </button>
                </div>
            </form>
        </div>
    );
}
