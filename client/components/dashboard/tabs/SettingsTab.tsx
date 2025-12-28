import React from 'react'

export default function SettingsTab() {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Settings</h3>

            <div className="bg-white rounded-lg shadow p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Council Name
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                        defaultValue="Literary Council"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email
                    </label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                        defaultValue="contact@litcouncil.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        About
                    </label>
                    <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                        defaultValue="Brief description about the literary council..."
                    />
                </div>

                <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                    Save Changes
                </button>
            </div>
        </div>
    )
}
