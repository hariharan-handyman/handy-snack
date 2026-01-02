'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Search, Menu, X, User } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useCart } from '@/context/CartContext';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navLinks = [
    { name: 'Shop All', href: '/shop' },
    { name: 'New Arrivals', href: '/shop?sort=newest' },
    { name: 'Best Sellers', href: '/shop?sort=popular' },
    { name: 'Our Story', href: '/story' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cart } = useCart();
    const [favCount, setFavCount] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const updateFavCount = () => {
            const favs = JSON.parse(localStorage.getItem('hm-favs') || '[]');
            setFavCount(favs.length);
        };
        updateFavCount();
        window.addEventListener('favoritesChanged', updateFavCount);
        return () => window.removeEventListener('favoritesChanged', updateFavCount);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-gray-100',
                isScrolled ? 'py-0' : 'py-2'
            )}
        >
            {/* Announcement Bar */}
            <div className="bg-black text-[9px] font-bold text-white py-2 text-center uppercase tracking-[0.3em]">
                Free Shipping on Orders Above ₹999
            </div>

            <div className="container mx-auto px-6">
                {/* Main Header Row */}
                <div className="flex items-center justify-between h-24">
                    {/* Left: Search (Desktop) / Menu (Mobile) */}
                    <div className="flex items-center w-1/3">
                        <button className="hidden md:flex items-center gap-3 text-dark/30 hover:text-dark transition-colors">
                            <Search size={18} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Search</span>
                        </button>
                        <button
                            className="md:hidden text-dark"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    {/* Center: Logo (Always Centered) */}
                    <div className="flex justify-center flex-1 md:flex-none md:w-1/3">
                        <Link href="/" className="flex flex-col items-center group">
                            <span className="text-3xl md:text-4xl font-black tracking-[-0.1em] text-dark uppercase flex flex-col items-center leading-none text-center">
                                <span className="text-[10px] tracking-[0.4em] mb-2 text-accent">Handyman</span>
                                <span>Technologies</span>
                            </span>
                        </Link>
                    </div>

                    {/* Right: Icons */}
                    <div className="flex items-center justify-end w-1/3 gap-4 md:gap-8">
                        <Link href="/favs" className="hidden md:flex text-dark/40 hover:text-dark transition-colors relative">
                            <Heart size={20} />
                            {favCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-accent text-white text-[8px] font-bold rounded-full flex items-center justify-center animate-pulse">
                                    {favCount}
                                </span>
                            )}
                        </Link>
                        <Link href="/cart" className="text-dark hover:text-accent transition-colors relative group flex items-center gap-2">
                            <ShoppingBag size={22} />
                            <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest">Cart ({cart.length})</span>
                            <span className="md:hidden absolute -top-1.5 -right-1.5 bg-black text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cart.length}
                            </span>
                        </Link>
                        <Link href="/login" className="hidden md:block text-dark/40 hover:text-dark transition-colors">
                            <User size={20} />
                        </Link>
                    </div>
                </div>

                {/* Secondary Navigation Row (Desktop Only) */}
                <div className="hidden md:flex items-center justify-center gap-16 h-12 border-t border-gray-50">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                'text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative pb-1 group',
                                pathname === link.href ? 'text-dark' : 'text-dark/30 hover:text-dark'
                            )}
                        >
                            {link.name}
                            <span className={cn(
                                "absolute bottom-0 left-0 h-[2px] bg-dark transition-all duration-300",
                                pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                            )} />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-white z-[100] flex flex-col"
                    >
                        <div className="p-10 flex justify-between items-center bg-gray-50">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Menu</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-xl">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-12 space-y-12">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-5xl font-black uppercase tracking-tighter hover:text-accent transition-colors block"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="pt-12 border-t border-gray-100 grid grid-cols-2 gap-8">
                                <Link href="/favs" onClick={() => setIsMobileMenuOpen(false)} className="text-[10px] font-bold uppercase tracking-widest text-dark/40">Wishlist ({favCount})</Link>
                                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-[10px] font-bold uppercase tracking-widest text-dark/40">Account</Link>
                            </div>
                        </div>
                        <div className="p-10 border-t border-gray-100 flex justify-center">
                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-dark/10">Handyman Technologies &copy; 2024</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
