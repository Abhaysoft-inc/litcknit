"use client"

import React, { useState } from "react"
import Image from "next/image"
import { HiMenu, HiX } from "react-icons/hi"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="relative z-10 px-6 md:px-10 py-4 bg-beige-light">
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
                        width={40}
                        height={48}
                        className="object-fill md:w-[60px] md:h-[50px]"
                    />
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-5 text-lg">
                    <li><a href="#events" className="hover:text-skin-deep">Events</a></li>
                    <li><a href="#posts" className="hover:text-skin-deep">Posts</a></li>
                    <li><a href="#members" className="hover:text-skin-deep">Members</a></li>
                    <li><a href="#about" className="hover:text-skin-deep">About</a></li>
                    <li><a href="#contact" className="hover:text-skin-deep">Contact</a></li>
                </ul>

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
                    "md:hidden bg-beige-light border-t border-tan-light/30 shadow-lg overflow-hidden transform transition-all duration-300 origin-top " +
                    (isMenuOpen
                        ? "max-h-96 opacity-100 mt-3"
                        : "max-h-0 opacity-0 mt-0 pointer-events-none")
                }
            >
                <ul className="flex flex-col space-y-2 px-6 py-4 text-lg">
                    <li><a href="#events" onClick={() => setIsMenuOpen(false)} className="block hover:text-skin-deep">Events</a></li>
                    <li><a href="#posts" onClick={() => setIsMenuOpen(false)} className="block hover:text-skin-deep">Posts</a></li>
                    <li><a href="#members" onClick={() => setIsMenuOpen(false)} className="block hover:text-skin-deep">Members</a></li>
                    <li><a href="#about" onClick={() => setIsMenuOpen(false)} className="block hover:text-skin-deep">About</a></li>
                    <li><a href="#contact" onClick={() => setIsMenuOpen(false)} className="block hover:text-skin-deep">Contact</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
