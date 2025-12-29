import React from 'react'
import { MdInfo, MdPeople, MdEmojiEvents } from 'react-icons/md'

interface EventTabsProps {
    activeSection: 'details' | 'registrations' | 'results'
    registrationCount: number
    onTabChange: (tab: 'details' | 'registrations' | 'results') => void
}

export default function EventTabs({ activeSection, registrationCount, onTabChange }: EventTabsProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
            <div className="flex">
                <button
                    onClick={() => onTabChange('details')}
                    className={`flex-1 px-6 py-4 text-sm font-semibold transition-all relative ${activeSection === 'details'
                            ? 'text-black bg-gray-50'
                            : 'text-gray-600 hover:text-black hover:bg-gray-50'
                        }`}
                >
                    <span className="flex items-center justify-center space-x-2">
                        <MdInfo className="w-5 h-5" />
                        <span>Details</span>
                    </span>
                    {activeSection === 'details' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                    )}
                </button>
                <button
                    onClick={() => onTabChange('registrations')}
                    className={`flex-1 px-6 py-4 text-sm font-semibold transition-all relative ${activeSection === 'registrations'
                            ? 'text-black bg-gray-50'
                            : 'text-gray-600 hover:text-black hover:bg-gray-50'
                        }`}
                >
                    <span className="flex items-center justify-center space-x-2">
                        <MdPeople className="w-5 h-5" />
                        <span>Registrations</span>
                        <span className="px-2 py-0.5 text-xs bg-black text-white rounded-full">{registrationCount}</span>
                    </span>
                    {activeSection === 'registrations' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                    )}
                </button>
                <button
                    onClick={() => onTabChange('results')}
                    className={`flex-1 px-6 py-4 text-sm font-semibold transition-all relative ${activeSection === 'results'
                            ? 'text-black bg-gray-50'
                            : 'text-gray-600 hover:text-black hover:bg-gray-50'
                        }`}
                >
                    <span className="flex items-center justify-center space-x-2">
                        <MdEmojiEvents className="w-5 h-5" />
                        <span>Results</span>
                    </span>
                    {activeSection === 'results' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                    )}
                </button>
            </div>
        </div>
    )
}
