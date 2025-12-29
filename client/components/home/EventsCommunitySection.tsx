import { FaCalendar, FaUsers } from 'react-icons/fa'

export default function EventsCommunitySection() {
    return (
        <section className="mb-20">
            <div className="bg-gradient-to-r from-amber-900 to-orange-800 rounded-3xl overflow-hidden text-white">
                <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                    <div>
                        <FaCalendar className="w-12 h-12 mb-4" />
                        <h3 className="font-serif text-3xl font-bold mb-4">Upcoming Events</h3>
                        <p className="text-amber-100 mb-6">
                            Join our literary workshops, book readings, and creative writing sessions
                        </p>
                        <button className="bg-white text-amber-900 px-6 py-3 rounded-full font-semibold hover:bg-amber-50 transition">
                            View Calendar
                        </button>
                    </div>
                    <div>
                        <FaUsers className="w-12 h-12 mb-4" />
                        <h3 className="font-serif text-3xl font-bold mb-4">Join Our Community</h3>
                        <p className="text-amber-100 mb-6">
                            Connect with fellow writers, share your work, and grow as a creative artist
                        </p>
                        <button className="bg-white text-amber-900 px-6 py-3 rounded-full font-semibold hover:bg-amber-50 transition">
                            Become a Member
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
