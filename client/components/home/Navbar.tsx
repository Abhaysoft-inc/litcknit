"use client"

import React, { useState } from "react"
import Image from "next/image"
import { HiMenu, HiX } from "react-icons/hi"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="relative z-10 px-6 md:px-10 py-4 bg-skin-lightest">
            <div className="flex items-center justify-between">
                {/* Logos */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/foot-logo.png"
                        alt="KNIT Logo"
                        width={40}
                        height={48}
                        className="object-contain md:w-[50px] md:h-[60px]"
                    />
                    <div className="h-10 md:h-12 w-px bg-gray-400" />
                    <Image
                        src="/litc-logo.png"
                        alt="Literary Council Logo"
                        width={55}
                        height={70}
                        className="object-fill md:w-[60px] md:h-[65px]"
                    />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <ul className="flex space-x-5 text-lg">
                        <li>
                            <button
                                onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="hover:text-skin-deep cursor-pointer"
                            >
                                Events
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => document.getElementById('posts-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="hover:text-skin-deep cursor-pointer"
                            >
                                Posts
                            </button>
                        </li>
                        <li><a href="/members" className="hover:text-skin-deep">Members</a></li>
                        <li><a href="/about" className="hover:text-skin-deep">About</a></li>
                        <li><a href="/contact" className="hover:text-skin-deep">Contact</a></li>
                    </ul>
                    <a
                        href="/admin/login"
                        className="bg-black text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Admin
                    </a>
                </div>

                {/* Mobile Button */}
                <button
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    className="md:hidden text-2xl text-skin-deep"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {/* Mobile Dropdown Menu with animation */}
            <div
                className={
                    "md:hidden bg-skin-lightest border-t border-skin-light/30 shadow-lg overflow-hidden transform transition-all duration-300 origin-top " +
                    (isMenuOpen
                        ? "max-h-96 opacity-100 mt-3"
                        : "max-h-0 opacity-0 mt-0 pointer-events-none")
                }
            >
                <ul className="flex flex-col space-y-2 px-6 py-4 text-lg">
                    <li>
                        <button
                            onClick={() => {
                                document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
                                setIsMenuOpen(false);
                            }}
                            className="block hover:text-skin-deep w-full text-left"
                        >
                            Events
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                document.getElementById('posts-section')?.scrollIntoView({ behavior: 'smooth' });
                                setIsMenuOpen(false);
                            }}
                            className="block hover:text-skin-deep w-full text-left"
                        >
                            Posts
                        </button>
                    </li>
                    <li><a href="/members" onClick={() => setIsMenuOpen(false)} className="block hover:text-skin-deep">Members</a></li>
                    <li><a href="/about" onClick={() => setIsMenuOpen(false)} className="block hover:text-skin-deep">About</a></li>
                    <li><a href="/contact" onClick={() => setIsMenuOpen(false)} className="block hover:text-skin-deep">Contact</a></li>
                    <li>
                        <a
                            href="/admin/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="block bg-black text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-center"
                        >
                            Admin
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
