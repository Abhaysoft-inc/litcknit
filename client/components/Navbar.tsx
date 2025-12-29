'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MdMenu, MdClose } from 'react-icons/md'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const menuItems = [
        { name: 'Home', href: '/' },
        { name: 'Events', href: '/events' },
        { name: 'About', href: '/about' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Contact', href: '/contact' },
    ]

    return (
        <nav className="bg-[#f5e6d3] border-b border-[#e8d4bd]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logos */}
                    <Link href="/" className="flex items-center space-x-4">
                        {/* LITC Logo */}
                        {/* <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                            <Image
                                src="/litc-logo.png"
                                alt="LITC Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div> */}

                        {/* Text */}
                        <div className="hidden sm:block">
                            <div className="text-xl font-semibold text-gray-800 leading-tight">
                                Literary Council
                            </div>
                            <div className="text-sm text-gray-600">
                                KNIT Sultanpur
                            </div>
                        </div>

                        {/* KNIT Logo */}
                        {/* <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                            <Image
                                src="/knit-logo.png"
                                alt="KNIT Sultanpur Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div> */}
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 hover:text-black font-normal text-base transition-colors duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/admin/login"
                            className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 font-normal"
                        >
                            Admin
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-gray-700 hover:text-black"
                    >
                        {isMenuOpen ? (
                            <MdClose className="w-6 h-6" />
                        ) : (
                            <MdMenu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-3">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-gray-700 hover:text-black font-normal py-2 transition-colors duration-200"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="/admin/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 text-center font-normal"
                            >
                                Admin
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
