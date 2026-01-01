'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function StorySection() {
    return (
        <section className="py-24 bg-black text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <span className="text-sm font-bold uppercase tracking-widest text-white/40 italic">Since 2024</span>
                        <h2 className="text-6xl font-black tracking-tighter leading-none">
                            EMPOWERING <br />
                            <span className="text-transparent [-webkit-text-stroke:1px_white]">HOMES</span>
                        </h2>

                        <div className="space-y-6 text-lg text-white/60 leading-relaxed font-medium">
                            <p>
                                Handyman Technologies isn’t just about snacks; it’s about a silent revolution. We believe that true hygiene starts at home, and true empowerment begins with a choice.
                            </p>
                            <p>
                                Handyman Technologies champions women empowerment by partnering with families to deliver their time-honored snacks worldwide. Crafted by 100+ year-old 5th-generation businesses for unbeatable taste.
                            </p>
                            <div className="pt-4">
                                <Link href="/story" className="inline-block px-8 py-3 bg-[#c5890e] rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 transition-transform">
                                    Read Our Story
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <Link href="/story">
                            <div className="aspect-[4/5] rounded-[3rem] bg-white/10 overflow-hidden border border-white/10 group">
                                <img
                                    src="/founder.png"
                                    alt="Founder"
                                    className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                                    <p className="text-xl font-black italic tracking-tighter">Hariharan Jeyaramamoorthy</p>
                                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Founder</p>
                                </div>
                            </div>
                        </Link>

                        {/* Floating decoration */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute -top-10 -right-10 w-40 h-40 bg-[#c5890e]/20 backdrop-blur-3xl rounded-full border border-white/10"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
