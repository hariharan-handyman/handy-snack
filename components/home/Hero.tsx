'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
            <div className="container mx-auto px-6 flex flex-col items-center text-center space-y-16">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl space-y-12"
                >
                    <div className="space-y-6">
                        <motion.span
                            initial={{ opacity: 0, tracking: '0.1em' }}
                            animate={{ opacity: 1, tracking: '0.4em' }}
                            transition={{ duration: 1 }}
                            className="text-[10px] font-bold uppercase text-accent"
                        >
                            Handmade Excellence
                        </motion.span>
                        <h1 className="text-7xl md:text-[9.5rem] font-extrabold leading-[0.8] tracking-[-0.05em] uppercase text-dark">
                            Purity <span className="text-gray-100">Defined.</span>
                        </h1>
                    </div>

                    <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-dark/40 max-w-2xl mx-auto leading-loose">
                        Discover the essence of authentic Indian snacks. <br className="hidden md:block" />
                        Preserving tradition, crafted for the modern palate.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-6">
                        <Link href="/shop" className="w-full md:w-auto h-16 px-16 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent transition-all shadow-2xl flex items-center justify-center">
                            Shop Collection
                        </Link>
                        <Link href="/story" className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark/40 hover:text-dark border-b border-dark/10 pb-2 transition-all">
                            Our Story
                        </Link>
                    </div>
                </motion.div>

                {/* Hero Image - Centered and Bordered */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative w-full max-w-5xl aspect-[21/9] bg-gray-50 overflow-hidden border border-gray-100"
                >
                    <img
                        src="/snack-bowl-mixture.png"
                        alt="Premium Snacks"
                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/5" />
                </motion.div>
            </div>

            {/* Background Texture/Accents */}
            <div className="absolute bottom-10 left-10 hidden lg:block">
                <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-dark/10 vertical-text pb-40">
                    Est. 2024 / Handyman Tech
                </div>
            </div>

            <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden lg:block">
                <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-dark/10 vertical-text pt-40 rotate-180">
                    Traditional Indian Craft
                </div>
            </div>
        </section>
    );
}
