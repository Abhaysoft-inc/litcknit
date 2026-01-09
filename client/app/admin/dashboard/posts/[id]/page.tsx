'use client';

import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PostForm from '@/components/dashboard/PostForm';

export default function EditPostPage() {
    const params = useParams();
    const id = params?.id as string | undefined;

    if (!id) return null;

    return (
        <DashboardLayout>
            <PostForm postId={id} />
        </DashboardLayout>
    );
}
