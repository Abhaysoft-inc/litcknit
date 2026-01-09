'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PostForm from '@/components/dashboard/PostForm';

export default function NewPostPage() {
    return (
        <DashboardLayout>
            <PostForm />
        </DashboardLayout>
    );
}
