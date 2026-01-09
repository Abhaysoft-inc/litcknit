'use client';

import { useEffect, useState } from 'react';

interface Stats {
    totalEvents: number;
    upcomingEvents: number;
    totalPosts: number;
    totalRegistrations: number;
}

export default function DashboardStats() {
    const [stats, setStats] = useState<Stats>({
        totalEvents: 0,
        upcomingEvents: 0,
        totalPosts: 0,
        totalRegistrations: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [eventsRes, postsRes] = await Promise.all([
                fetch('/api/events'),
                fetch('/api/posts')
            ]);

            const eventsData = await eventsRes.json();
            const postsData = await postsRes.json();

            const events = eventsData.data || [];
            const upcomingEvents = events.filter((e: any) =>
                new Date(e.date) >= new Date() && e.status !== 'Completed'
            );

            let totalRegistrations = 0;
            events.forEach((event: any) => {
                if (event.registrations) {
                    totalRegistrations += event.registrations.filter(
                        (r: any) => r.status === 'registered'
                    ).length;
                }
            });

            setStats({
                totalEvents: events.length,
                upcomingEvents: upcomingEvents.length,
                totalPosts: postsData.data?.length || 0,
                totalRegistrations
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Events',
            value: stats.totalEvents,
            icon: '📅',
            color: 'bg-blue-500'
        },
        {
            title: 'Upcoming Events',
            value: stats.upcomingEvents,
            icon: '🎯',
            color: 'bg-green-500'
        },
        {
            title: 'Total Posts',
            value: stats.totalPosts,
            icon: '📝',
            color: 'bg-purple-500'
        },
        {
            title: 'Total Registrations',
            value: stats.totalRegistrations,
            icon: '✅',
            color: 'bg-pink-500'
        }
    ];

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {statCards.map((card, index) => (
                <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
                        </div>
                        <div className={`${card.color} text-white text-3xl p-3 rounded-lg`}>
                            {card.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
