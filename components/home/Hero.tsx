'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
            {/* Vibrant Background Glows */}
            <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 w-[30vw] h-[30vw] bg-accent/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />

            {/* Floating Snacks - Modern Style */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            y: [0, -40, 0],
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5
                        }}
                        className="absolute hidden lg:block"
                        style={{
                            top: `${15 + (i * 12)}%`,
                            left: i % 2 === 0 ? `${5 + (i * 3)}%` : 'auto',
                            right: i % 2 !== 0 ? `${5 + (i * 3)}%` : 'auto',
                        }}
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center p-4">
                            <img
                                src={i % 2 === 0 ? "/snack-bowl-mixture.png" : "/snack-chakli.png"}
                                alt="Snack"
                                className="w-full h-full object-contain filter drop-shadow-lg"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-20">
                <div className="flex flex-col items-center text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm shadow-sm group">
                            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">New Taste Sensation</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-dark italic italic-accent">
                            CRUNCHY <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent drop-shadow-sm">MAGIC.</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-dark/70 font-bold max-w-2xl mx-auto leading-normal"
                    >
                        Pure handmade joy delivered to your doorstep.
                        Experience the heritage of taste redefined for the modern snacker.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center gap-6"
                    >
                        <Link href="/shop" className="w-full sm:w-auto">
                            <Button size="lg" className="h-16 px-12 text-sm font-black rounded-2xl bg-dark text-white hover:bg-primary transition-all shadow-[0_20px_40px_rgba(0,0,0,0.15)] group relative overflow-hidden">
                                <span className="relative z-10 flex items-center gap-3">
                                    SHOP NOW <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </span>
                            </Button>
                        </Link>
                        <Link href="/story" className="w-full sm:w-auto">
                            <Button variant="ghost" size="lg" className="h-16 px-12 text-sm font-black rounded-2xl border-2 border-dark/10 text-dark hover:border-secondary transition-all">
                                OUR STORY
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Side Text */}
            <div className="absolute bottom-12 left-0 right-0 overflow-hidden pointer-events-none opacity-5">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="flex gap-20 whitespace-nowrap text-[120px] font-black italic tracking-tighter"
                >
                    <span>MURUKKU • MIXTURE • CHIPS • COOKIES • MILLET BITES • SEV • PAKODA •</span>
                    <span>MURUKKU • MIXTURE • CHIPS • COOKIES • MILLET BITES • SEV • PAKODA •</span>
                </motion.div>
            </div>
        </section>
    );
}
