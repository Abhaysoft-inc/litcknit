import React from 'react'
import { MdEvent, MdArticle, MdPeople, MdAdd } from 'react-icons/md'

interface QuickActionsProps {
    setActiveTab: (tab: string) => void
}

export default function QuickActions({ setActiveTab }: QuickActionsProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
                <button
                    onClick={() => setActiveTab('events')}
                    className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <span className="flex items-center space-x-3">
                        <MdEvent className="w-5 h-5" />
                        <span>Create New Event</span>
                    </span>
                    <MdAdd className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setActiveTab('posts')}
                    className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <span className="flex items-center space-x-3">
                        <MdArticle className="w-5 h-5" />
                        <span>Create New Post</span>
                    </span>
                    <MdAdd className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setActiveTab('members')}
                    className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <span className="flex items-center space-x-3">
                        <MdPeople className="w-5 h-5" />
                        <span>Add New Member</span>
                    </span>
                    <MdAdd className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
