import React from 'react'
import { useRouter } from 'next/navigation'

interface TeamMember {
    name: string
    email: string
    phone: string
}

interface Event {
    eventType: 'individual' | 'team'
    status: string
}

interface RegistrationFormProps {
    event: Event
    formData: {
        name: string
        email: string
        phone: string
        teamName: string
    }
    teamMembers: TeamMember[]
    isRegistrationOpen: boolean
    submitting: boolean
    spotsLeft: number
    eventId: string | string[]
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onTeamMemberChange: (index: number, field: keyof TeamMember, value: string) => void
    onSubmit: (e: React.FormEvent) => void
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    event,
    formData,
    teamMembers,
    isRegistrationOpen,
    submitting,
    spotsLeft,
    eventId,
    onInputChange,
    onTeamMemberChange,
    onSubmit,
}) => {
    const router = useRouter()

    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-serif text-skin-deep mb-6">Registration Form</h2>

            {!isRegistrationOpen && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-600 font-semibold">
                        {event.status === 'Completed' ? 'This event has ended.' :
                            event.status === 'Cancelled' ? 'This event has been cancelled.' :
                                spotsLeft <= 0 ? 'This event is full.' :
                                    'Registration is currently closed.'}
                    </p>
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                    <h3 className="text-lg font-semibold text-skin-deep mb-4">
                        {event.eventType === 'team' ? 'Team Leader Information' : 'Personal Information'}
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-skin-darker mb-1">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={onInputChange}
                                required
                                disabled={!isRegistrationOpen}
                                className="w-full border border-skin-lighter rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-skin-deep disabled:bg-gray-100"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-skin-darker mb-1">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={onInputChange}
                                required
                                disabled={!isRegistrationOpen}
                                className="w-full border border-skin-lighter rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-skin-deep disabled:bg-gray-100"
                                placeholder="your.email@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-skin-darker mb-1">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={onInputChange}
                                required
                                disabled={!isRegistrationOpen}
                                className="w-full border border-skin-lighter rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-skin-deep disabled:bg-gray-100"
                                placeholder="10-digit mobile number"
                                pattern="[6-9][0-9]{9}"
                            />
                            <p className="text-xs text-skin-darker mt-1">Format: 10 digits starting with 6-9</p>
                        </div>
                    </div>
                </div>

                {/* Team Information */}
                {event.eventType === 'team' && (
                    <div>
                        <h3 className="text-lg font-semibold text-skin-deep mb-4">Team Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-skin-darker mb-1">
                                    Team Name *
                                </label>
                                <input
                                    type="text"
                                    name="teamName"
                                    value={formData.teamName}
                                    onChange={onInputChange}
                                    required
                                    disabled={!isRegistrationOpen}
                                    className="w-full border border-skin-lighter rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-skin-deep disabled:bg-gray-100"
                                    placeholder="Enter your team name"
                                />
                            </div>

                            {/* Team Members */}
                            <div>
                                <label className="block text-sm font-medium text-skin-darker mb-3">
                                    Team Members ({teamMembers.length} required)
                                </label>
                                {teamMembers.map((member, index) => (
                                    <div key={index} className="mb-6 p-4 bg-skin-lightest rounded-lg">
                                        <h4 className="font-semibold text-skin-deep mb-3">Member {index + 1}</h4>
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                value={member.name}
                                                onChange={(e) => onTeamMemberChange(index, 'name', e.target.value)}
                                                required
                                                disabled={!isRegistrationOpen}
                                                className="w-full border border-skin-lighter rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-skin-deep disabled:bg-gray-100"
                                                placeholder="Full Name"
                                            />
                                            <input
                                                type="email"
                                                value={member.email}
                                                onChange={(e) => onTeamMemberChange(index, 'email', e.target.value)}
                                                required
                                                disabled={!isRegistrationOpen}
                                                className="w-full border border-skin-lighter rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-skin-deep disabled:bg-gray-100"
                                                placeholder="Email Address"
                                            />
                                            <input
                                                type="tel"
                                                value={member.phone}
                                                onChange={(e) => onTeamMemberChange(index, 'phone', e.target.value)}
                                                required
                                                disabled={!isRegistrationOpen}
                                                className="w-full border border-skin-lighter rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-skin-deep disabled:bg-gray-100"
                                                placeholder="Phone Number"
                                                pattern="[6-9][0-9]{9}"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                    {isRegistrationOpen ? (
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-skin-deep text-white font-semibold py-4 px-6 rounded-xl hover:bg-skin-darker transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'Registering...' : 'Complete Registration'}
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => router.push(`/events/${eventId}`)}
                            className="w-full bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl cursor-not-allowed"
                        >
                            Registration Closed
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default RegistrationForm
