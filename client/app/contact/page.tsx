'use client';

import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function ContactPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        alert('Message sent! We will get back to you soon.')
    }

    return (
        <div>
            <Navbar />

            <section className="py-20 px-8 md:px-20 bg-skin-lightest min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif text-skin-darkest mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-skin-deep max-w-3xl mb-12">
                        Have questions or want to join our literary community? We&apos;d love to hear from you!
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-serif text-skin-deep mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-skin-deep font-semibold mb-2">Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border border-skin-lighter rounded-lg focus:outline-none focus:border-skin-base"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-skin-deep font-semibold mb-2">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 border border-skin-lighter rounded-lg focus:outline-none focus:border-skin-base"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-skin-deep font-semibold mb-2">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border border-skin-lighter rounded-lg focus:outline-none focus:border-skin-base"
                                        placeholder="What's this about?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-skin-deep font-semibold mb-2">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border border-skin-lighter rounded-lg focus:outline-none focus:border-skin-base resize-none"
                                        placeholder="Tell us what's on your mind..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-skin-base to-skin-medium hover:from-skin-medium hover:to-skin-deep text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h2 className="text-2xl font-serif text-skin-deep mb-6">Contact Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <FaMapMarkerAlt className="text-skin-base text-xl mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-skin-darkest mb-1">Address</h3>
                                            <p className="text-skin-medium">
                                                Literary Council<br />
                                                KNIT Sultanpur<br />
                                                Sultanpur, Uttar Pradesh
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <FaEnvelope className="text-skin-base text-xl mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-skin-darkest mb-1">Email</h3>
                                            <p className="text-skin-medium">literarycouncil@knit.ac.in</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <FaPhone className="text-skin-base text-xl mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-skin-darkest mb-1">Phone</h3>
                                            <p className="text-skin-medium">+91 1234567890</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h2 className="text-2xl font-serif text-skin-deep mb-6">Follow Us</h2>
                                <div className="flex gap-4">
                                    <a
                                        href="#"
                                        className="w-12 h-12 bg-skin-lighter hover:bg-skin-base rounded-full flex items-center justify-center text-skin-deep hover:text-white transition-all"
                                    >
                                        <FaFacebook className="text-xl" />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-12 h-12 bg-skin-lighter hover:bg-skin-base rounded-full flex items-center justify-center text-skin-deep hover:text-white transition-all"
                                    >
                                        <FaInstagram className="text-xl" />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-12 h-12 bg-skin-lighter hover:bg-skin-base rounded-full flex items-center justify-center text-skin-deep hover:text-white transition-all"
                                    >
                                        <FaTwitter className="text-xl" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
