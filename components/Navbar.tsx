'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Search, Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useCart } from '@/context/CartContext';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cart } = useCart();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                isScrolled ? 'bg-white/80 backdrop-blur-md py-3 border-black/10' : 'bg-transparent py-5 border-transparent'
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="hover:scale-105 transition-transform">
                    <img src="/logo.png" alt="Handyman Logo" className="h-10 w-auto" />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                'text-sm font-medium hover:text-orange-500 transition-colors relative group',
                                pathname === link.href ? 'text-black' : 'text-black/60'
                            )}
                        >
                            {link.name}
                            <motion.span
                                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"
                                layoutId={pathname === link.href ? 'underline' : undefined}
                            />
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-5 text-black">
                    <button className="hover:scale-110 transition-transform">
                        <Search size={20} />
                    </button>
                    <Link href="/favs" className="hover:scale-110 transition-transform relative">
                        <Heart size={20} />
                    </Link>
                    <Link href="/cart" className="hover:scale-110 transition-transform relative">
                        <ShoppingCart size={20} />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                    <button
                        className="md:hidden hover:scale-110 transition-transform"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-black/5 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
