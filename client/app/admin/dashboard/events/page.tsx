import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EventsManagement from '@/components/dashboard/EventsManagement';

export default function AdminEventsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-1">Events</h2>
                    <p className="text-sm text-gray-600">Manage all club events from here.</p>
                </div>
                <EventsManagement />
            </div>
        </DashboardLayout>
    );
}
