'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF8F0] via-[#F5E6D3] to-[#FFF8F0]">
            {/* Background Image Collage - Subtle Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.08] grayscale">
                <img
                    src="/hero-collage.png"
                    alt="Handyman Snacks"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8F0]/90 to-[#F5E6D3]/80" />
            </div>

            {/* Antigravity Floating Snacks - 10 Premium Products - Better Aligned */}
            <div className="absolute inset-0 pointer-events-none z-10">
                {/* Top Row - Distributed evenly */}
                <motion.div
                    animate={{ y: [-15, 15, -15], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[8%] left-[3%] w-32 h-32 drop-shadow-[0_15px_30px_rgba(197,137,14,0.15)] opacity-50"
                >
                    <img src="/snack-bowl-mixture.png" alt="Bowl Mixture" className="w-full h-full object-contain" />
                </motion.div>

                <motion.div
                    animate={{ y: [10, -10, 10], scale: [1, 1.05, 1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute top-[5%] left-[22%] w-36 h-36 drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)] opacity-50"
                >
                    <img src="/snack-ribbon-pakoda.png" alt="Ribbon Pakoda" className="w-full h-full object-contain" />
                </motion.div>

                <motion.div
                    animate={{ y: [-8, 8, -8], rotate: [0, -6, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[10%] right-[20%] w-34 h-34 drop-shadow-[0_15px_30px_rgba(197,137,14,0.15)] opacity-50"
                >
                    <img src="/snack-boondi.png" alt="Boondi" className="w-full h-full object-contain" />
                </motion.div>

                <motion.div
                    animate={{ y: [12, -12, 12], rotate: [0, 8, 0] }}
                    transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="absolute top-[6%] right-[3%] w-38 h-38 drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] opacity-50"
                >
                    <img src="/snack-karasev.png" alt="Karasev" className="w-full h-full object-contain" />
                </motion.div>

                {/* Middle Row - Sides only to avoid center content */}
                <motion.div
                    animate={{ y: [18, -18, 18], x: [-8, 8, -8] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-[35%] left-[2%] w-44 h-44 drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)] opacity-50"
                >
                    <img src="/snack-spicy-peanuts.png" alt="Spicy Peanuts" className="w-full h-full object-contain" />
                </motion.div>

                <motion.div
                    animate={{ y: [-12, 12, -12], rotate: [0, 10, 0] }}
                    transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                    className="absolute top-[38%] right-[1%] w-40 h-40 drop-shadow-[0_20px_40px_rgba(197,137,14,0.2)] opacity-50"
                >
                    <img src="/snack-vadai.png" alt="Vadai" className="w-full h-full object-contain" />
                </motion.div>

                {/* Bottom Row - Well distributed */}
                <motion.div
                    animate={{ y: [8, -8, 8], scale: [0.98, 1.05, 0.98] }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute bottom-[12%] left-[5%] w-36 h-36 drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] opacity-50"
                >
                    <img src="/snack-chakli.png" alt="Chakli" className="w-full h-full object-contain" />
                </motion.div>

                <motion.div
                    animate={{ y: [-14, 14, -14], rotate: [0, -5, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
                    className="absolute bottom-[8%] left-[25%] w-38 h-38 drop-shadow-[0_20px_40px_rgba(197,137,14,0.17)] opacity-50"
                >
                    <img src="/snack-thattai.png" alt="Thattai" className="w-full h-full object-contain" />
                </motion.div>

                <motion.div
                    animate={{ y: [10, -10, 10], x: [6, -6, 6] }}
                    transition={{ duration: 8.8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="absolute bottom-[15%] right-[23%] w-42 h-42 drop-shadow-[0_25px_50px_rgba(0,0,0,0.2)] opacity-50"
                >
                    <img src="/snack-murukku-bowl.png" alt="Murukku Bowl" className="w-full h-full object-contain" />
                </motion.div>

                <motion.div
                    animate={{ y: [-10, 10, -10], rotate: [0, 6, 0] }}
                    transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut", delay: 4.5 }}
                    className="absolute bottom-[10%] right-[4%] w-40 h-40 drop-shadow-[0_20px_40px_rgba(197,137,14,0.18)] opacity-50"
                >
                    <img src="/snack-murukku-bowl-2.png" alt="Murukku Bowl 2" className="w-full h-full object-contain" />
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

                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] text-[#2B1810]">
                        TASTE THE <br />
                        <span className="text-[#c5890e]">TRADITION.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-[#4A2C1F]/80 font-bold max-w-2xl mx-auto leading-tight italic">
                        Deliciously crunchy, 100% hygienic, and crafted by women artisans. <br />
                        <span className="text-sm font-black uppercase tracking-widest opacity-60 mt-4 block text-[#A67C52]">Mixtures • Murukku • Millet Bites</span>
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-6">
                        <Link href="/shop" className="w-full md:w-auto">
                            <Button size="lg" className="px-10 py-4 text-base rounded-full shadow-[0_15px_35px_rgba(197,137,14,0.25)] bg-[#c5890e] hover:bg-[#D4715A] text-white transition-all">
                                Start Snacking
                            </Button>
                        </Link>
                        <Link href="/story" className="w-full md:w-auto">
                            <Button variant="outline" size="lg" className="px-10 py-4 text-base rounded-full border-2 border-[#4A2C1F] text-[#2B1810] hover:bg-[#4A2C1F] hover:text-[#FFF8F0] transition-all">
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
