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
    const [favCount, setFavCount] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track favorites count
    useEffect(() => {
        const updateFavCount = () => {
            const favs = JSON.parse(localStorage.getItem('hm-favs') || '[]');
            setFavCount(favs.length);
        };

        updateFavCount();
        window.addEventListener('favoritesChanged', updateFavCount);

        return () => window.removeEventListener('favoritesChanged', updateFavCount);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'Our Story', href: '/story' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                isScrolled ? 'bg-white/80 backdrop-blur-lg py-4 border-primary/20 shadow-lg' : 'bg-transparent py-6 border-transparent'
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="hover:scale-105 transition-transform flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-black italic">HM</span>
                    </div>
                    <span className="text-2xl font-black italic tracking-tighter text-dark">HANDYMAN</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                'text-sm font-bold tracking-tight hover:text-primary transition-colors relative group',
                                pathname === link.href ? 'text-secondary' : 'text-dark/70'
                            )}
                        >
                            {link.name}
                            <motion.span
                                className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full transition-all group-hover:w-full"
                                layoutId={pathname === link.href ? 'underline' : undefined}
                            />
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-6">
                    <button className="w-10 h-10 rounded-full hover:bg-primary/10 flex items-center justify-center transition-colors">
                        <Search size={20} className="text-dark" />
                    </button>
                    <Link href="/favs" className="w-10 h-10 rounded-full hover:bg-primary/10 flex items-center justify-center transition-colors relative group">
                        <Heart size={20} className="text-dark group-hover:text-primary transition-colors" />
                        {favCount > 0 && (
                            <span className="absolute top-1 right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-bounce">
                                {favCount}
                            </span>
                        )}
                    </Link>
                    <Link href="/cart" className="w-12 h-12 rounded-2xl bg-dark text-white flex items-center justify-center shadow-xl hover:bg-secondary transition-all relative">
                        <ShoppingCart size={20} />
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                    <button
                        className="md:hidden w-10 h-10 flex items-center justify-center"
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
