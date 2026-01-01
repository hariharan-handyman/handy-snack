'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
            {/* Antigravity Floating Elements (Placeholders for snacks) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 0, x: Math.random() * 100 - 50, opacity: 0 }}
                        animate={{
                            y: [-20, 20, -20],
                            x: [0, 10, -10, 0],
                            opacity: 0.1 + (Math.random() * 0.2)
                        }}
                        transition={{
                            y: { duration: 4 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" },
                            x: { duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" },
                            opacity: { duration: 2 }
                        }}
                        className="absolute rounded-2xl bg-black/5 backdrop-blur-sm"
                        style={{
                            width: Math.random() * 150 + 100,
                            height: Math.random() * 150 + 100,
                            top: `${Math.random() * 80 + 10}%`,
                            left: `${Math.random() * 80 + 10}%`,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-black/5 text-xs font-bold tracking-widest uppercase"
                    >
                        Revolutionary Snack Brand
                    </motion.span>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-black">
                        HYGIENE IN <br />
                        <span className="text-transparent border-t-black [-webkit-text-stroke:1px_black]">EVERY STEP</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-black/60 font-medium max-w-2xl mx-auto">
                        Heart in every bite – Empowering women, delighting you with premium hand-crafted snacks.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                        <Link href="/shop">
                            <Button size="lg" className="px-12">Shop Now</Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="outline" size="lg" className="px-12">Our Story</Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Parallax Text */}
            <motion.div
                style={{ x: '-50%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-10 left-0 whitespace-nowrap text-[12vw] font-black opacity-[0.02] select-none pointer-events-none"
            >
                MIXTURES • MILLET BITES • BAKED TREATS • PURE HYGIENE • WOMEN EMPOWERMENT •
            </motion.div>
        </section>
    );
}
