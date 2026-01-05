import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="bg-skin-darker text-skin-lightest">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-8 md:px-20 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* About Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <Image
                                src="/litc-logo.png"
                                alt="LITC Logo"
                                width={50}
                                height={50}
                                className="rounded-full brightness-0 invert"
                            />
                            <h3 className="text-2xl font-serif font-bold">Literary Council KNIT</h3>
                        </div>
                        <p className="text-skin-light leading-relaxed">
                            Literary Council of KNIT Sultanpur - where words come alive and creativity knows no bounds.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <a
                                href="#"
                                className="w-10 h-10 bg-skin-light/20 hover:bg-skin-light hover:text-skin-deep rounded-full flex items-center justify-center transition-all duration-300">
                                <FaFacebookF />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-skin-light/20 hover:bg-skin-light hover:text-skin-deep rounded-full flex items-center justify-center transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-skin-light/20 hover:bg-skin-light hover:text-skin-deep rounded-full flex items-center justify-center transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-skin-light/20 hover:bg-skin-light hover:text-skin-deep rounded-full flex items-center justify-center transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-serif font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-skin-light hover:text-skin-lightest transition-colors duration-300">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-skin-light hover:text-skin-lightest transition-colors duration-300">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-skin-light hover:text-skin-lightest transition-colors duration-300">
                                    Posts
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-skin-light hover:text-skin-lightest transition-colors duration-300">
                                    Team
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-tan-light hover:text-beige-light transition-colors duration-300">
                                    Join Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Our Clubs */}
                    <div>
                        <h4 className="text-xl font-serif font-semibold mb-6">Our Clubs</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-skin-light hover:text-skin-lightest transition-colors duration-300">
                                    Debate Club
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-skin-light hover:text-skin-lightest transition-colors duration-300">
                                    Kavita Club
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-skin-light hover:text-skin-lightest transition-colors duration-300">
                                    Funtoosh Club
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-skin-light hover:text-skin-lightest transition-colors duration-300">
                                    Bookpool Club
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-tan-light hover:text-beige-light transition-colors duration-300">
                                    Content Team
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-serif font-semibold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-skin-light">
                                <FaMapMarkerAlt className="text-lg mt-1 shrink-0" />
                                <span>Kamla Nehru Institute of Technology, Sultanpur, UP 228118</span>
                            </li>
                            <li className="flex items-center gap-3 text-skin-light">
                                <FaEnvelope className="text-lg shrink-0" />
                                <a href="mailto:litc@knit.ac.in" className="hover:text-skin-lightest transition-colors duration-300">
                                    litc@knit.ac.in
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-skin-light">
                                <FaPhone className="text-lg shrink-0" />
                                <a href="tel:+911234567890" className="hover:text-skin-lightest transition-colors duration-300">
                                    +91 12345 67890
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-skin-light/20">
                <div className="max-w-7xl mx-auto px-8 md:px-20 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-skin-light text-sm">
                        <p>
                            © {new Date().getFullYear()} Literary Council KNIT Sultanpur. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link href="#" className="hover:text-skin-lightest transition-colors duration-300">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="hover:text-skin-lightest transition-colors duration-300">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
