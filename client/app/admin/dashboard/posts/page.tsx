import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PostsManagement from '@/components/dashboard/PostsManagement';

export default function AdminPostsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-1">Posts</h2>
                    <p className="text-sm text-gray-600">Manage all club posts from here.</p>
                </div>
                <PostsManagement />
            </div>
        </DashboardLayout>
    );
}
