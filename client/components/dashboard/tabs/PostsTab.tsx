import React from 'react'
import { MdAdd } from 'react-icons/md'

export default function PostsTab() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Posts Management</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                    <MdAdd className="w-5 h-5" />
                    <span>Create Post</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Post Title {item}</h4>
                            <p className="text-sm text-gray-600 mb-4">Brief description of the post content...</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Dec 28, 2025</span>
                                <button className="text-sm text-gray-600 hover:text-black">Edit</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
