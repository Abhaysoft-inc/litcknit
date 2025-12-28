import React from 'react'
import { MdAdd } from 'react-icons/md'

export default function MembersTab() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Members Management</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                    <MdAdd className="w-5 h-5" />
                    <span>Add Member</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span className="font-medium">M{item}</span>
                                </div>
                                <div className="flex-1">
                                    <h5 className="font-semibold text-gray-900">Member Name</h5>
                                    <p className="text-sm text-gray-600">member{item}@email.com</p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button className="text-sm text-gray-600 hover:text-black">View</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
