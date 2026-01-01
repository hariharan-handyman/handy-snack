'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
            {/* Background Image Collage - Subtle Overlay */}
            <div className="absolute inset-0 z-0 opacity-10 grayscale hover:grayscale-0 transition-all duration-1000">
                <img
                    src="/hero-collage.png"
                    alt="Handyman Snacks"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/60" />
            </div>

            {/* Antigravity Floating Snacks */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <motion.div
                    animate={{
                        y: [-20, 20, -20],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[15%] left-[10%] w-48 h-48 drop-shadow-2xl"
                >
                    <img src="/snack-float-1.png" alt="Floating Snack" className="w-full h-full object-contain" />
                </motion.div>

                <motion.div
                    animate={{
                        y: [20, -20, 20],
                        rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[20%] right-[12%] w-56 h-56 drop-shadow-2xl"
                >
                    <img src="/snack-float-2.png" alt="Floating Snack" className="w-full h-full object-contain" />
                </motion.div>

                <motion.div
                    animate={{
                        y: [-15, 15, -15],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[25%] right-[15%] w-32 h-32 opacity-40 blur-[2px]"
                >
                    <img src="/snack-float-1.png" alt="Floating Snack" className="w-full h-full object-contain" />
                </motion.div>
            </div>

            <div className="container mx-auto px-4 relative z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto space-y-10"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-black/5 text-xs font-black tracking-widest uppercase">
                            Premium Indian Snacks
                        </span>
                        <div className="h-px w-24 bg-[#c5890e]" />
                    </motion.div>

                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] text-black">
                        TASTE THE <br />
                        <span className="text-[#c5890e]">TRADITION.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-black/70 font-bold max-w-2xl mx-auto leading-tight italic">
                        Deliciously crunchy, 100% hygienic, and crafted by women artisans. <br />
                        <span className="text-sm font-black uppercase tracking-widest opacity-40 mt-4 block">Mixtures • Murukku • Millet Bites</span>
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6">
                        <Link href="/shop" className="w-full md:w-auto">
                            <Button size="lg" className="px-16 py-8 text-xl rounded-full shadow-[0_20px_50px_rgba(197,137,14,0.3)] bg-[#c5890e] hover:bg-[#a6740c]">
                                Start Snacking
                            </Button>
                        </Link>
                        <Link href="/story" className="w-full md:w-auto">
                            <Button variant="outline" size="lg" className="px-16 py-8 text-xl rounded-full border-2 hover:bg-black hover:text-white transition-all">
                                Our Story
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Parallax Text */}
            <motion.div
                style={{ x: '-50%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-10 left-0 whitespace-nowrap text-[12vw] font-black opacity-[0.03] select-none pointer-events-none italic"
            >
                CRUNCHY MIXTURES • TRADITIONAL MURUKKU • HEALTHY MILLET BITES • BAKED NAMAKPARA •
            </motion.div>
        </section>
    );
}
