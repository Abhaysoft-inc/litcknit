import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import EventsManagement from '@/components/dashboard/EventsManagement';
import PostsManagement from '@/components/dashboard/PostsManagement';

export default function AdminDashboard() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h2>
                    <p className="text-blue-100">Manage your club's events and posts efficiently.</p>
                </div>

                {/* Stats Overview */}
                <DashboardStats />

                {/* Events Management */}
                <EventsManagement />

                {/* Posts Management */}
                <PostsManagement />
            </div>
        </DashboardLayout>
    );
}
