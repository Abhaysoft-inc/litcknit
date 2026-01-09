'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EventForm from '@/components/dashboard/EventForm';

export default function NewEventPage() {
    return (
        <DashboardLayout>
            <EventForm />
        </DashboardLayout>
    );
}
