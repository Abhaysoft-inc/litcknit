'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Member {
    _id: string;
    name: string;
    role: string;
    year: string;
    department: string;
    email?: string;
    phone?: string;
    photo?: string;
    position: number;
}

export default function MembersManagement() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await fetch('/api/members');
            const data = await res.json();
            setMembers(data.data || []);
        } catch (error) {
            console.error('Failed to fetch members:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteMember = async (id: string) => {
        if (!confirm('Are you sure you want to delete this member?')) return;

        try {
            const res = await fetch(`/api/members/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMembers(members.filter(m => m._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete member:', error);
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-32 bg-gray-100 rounded animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Team Members</h2>
                    <Link
                        href="/api/members/new"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        + Add Member
                    </Link>
                </div>
            </div>

            <div className="p-6">
                {members.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No members found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {members.map((member) => (
                            <div
                                key={member._id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-3">
                                    {member.photo ? (
                                        <img
                                            src={member.photo}
                                            alt={member.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xl">
                                            {member.name.charAt(0)}
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-semibold text-gray-800 truncate">
                                            {member.name}
                                        </h3>
                                        <p className="text-sm text-blue-600 font-medium">
                                            {member.role}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                                            <span>{member.year}</span>
                                            <span>•</span>
                                            <span>{member.department}</span>
                                        </div>
                                        {member.email && (
                                            <p className="text-xs text-gray-500 truncate mt-1">
                                                📧 {member.email}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <Link
                                        href={`/api/members/${member._id}`}
                                        className="flex-1 px-3 py-1.5 text-sm text-center bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteMember(member._id)}
                                        className="flex-1 px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
