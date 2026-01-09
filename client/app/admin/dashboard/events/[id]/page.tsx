'use client';

import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EventForm from '@/components/dashboard/EventForm';

export default function EditEventPage() {
    const params = useParams();
    const id = params?.id as string | undefined;

    if (!id) return null;

    return (
        <DashboardLayout>
            <EventForm eventId={id} />
        </DashboardLayout>
    );
}
