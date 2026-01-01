'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Users, Award, Heart } from 'lucide-react';

const benefits = [
    {
        title: "Women Empowerment",
        description: "Direct profits to female-led home units, fostering independence.",
        icon: Users
    },
    {
        title: "Hygienic Excellence",
        description: "FSSAI-compliant, safe processes from village kitchens to you.",
        icon: ShieldCheck
    },
    {
        title: "Low Cost",
        description: "Premium taste without premium prices—value-packed bites.",
        icon: Award
    },
    {
        title: "Fastest Delivery",
        description: "Pan-India in 2-3 days, worldwide express.",
        icon: Truck
    },
    {
        title: "Heritage Taste",
        description: "100+ years of family secrets in every flavorful crunch.",
        icon: Heart
    }
];

export default function StoryPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-32 pb-24 border-b border-black/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-16">
                        <div className="space-y-6 text-center">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-block px-4 py-1 rounded-full bg-black/5 text-[10px] font-black uppercase tracking-[0.2em]"
                            >
                                Our Heritage
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-7xl font-black tracking-tighter leading-none"
                            >
                                5 GENERATIONS OF <br />
                                <span className="text-[#c5890e]">TASTE.</span>
                            </motion.h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="relative group"
                            >
                                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-black/5">
                                    <img
                                        src="/founder.png"
                                        alt="Hariharan Jeyaramamoorthy"
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-[2rem] shadow-2xl border border-black/5">
                                    <p className="text-lg font-black tracking-tighter italic">Hariharan Jeyaramamoorthy</p>
                                    <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest mt-1">Founder, Handyman Tech</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-8"
                            >
                                <h3 className="text-3xl font-black tracking-tighter italic">"Powered by Her Hands."</h3>
                                <div className="space-y-6 text-lg text-black/60 leading-relaxed font-medium">
                                    <p>
                                        Handyman Technologies champions women empowerment by partnering with families to deliver their time-honored snacks worldwide. These hygienic, low-cost delights arrive with fastest delivery, crafted by 100+ year-old 5th-generation businesses for unbeatable taste.
                                    </p>
                                    <p>
                                        Handyman connects visionary women and century-old family artisans—masters of 5th-generation snack recipes—to your doorstep. Every packet embodies hygiene standards, affordable pricing, and lightning-fast global shipping, turning tradition into everyday joy.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-black text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-12 rounded-[3rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
                            >
                                <benefit.icon className="w-10 h-10 text-[#c5890e] mb-6 group-hover:scale-110 transition-transform" />
                                <h4 className="text-xl font-black tracking-tight mb-4 italic">{benefit.title}</h4>
                                <p className="text-white/40 font-medium leading-relaxed">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white overflow-hidden text-center">
                <div className="container mx-auto px-4 space-y-16">
                    <h2 className="text-5xl font-black tracking-tighter italic">OUR TAGLINES</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            "5 Generations of Taste, Powered by Her Hands.",
                            "Hygienic Bites, Global Reach, Women-Led Legacy.",
                            "Affordable Crunch, Lightning Delivery, Timeless Tradition."
                        ].map((tag, i) => (
                            <div key={i} className="p-8 border border-black/5 rounded-3xl font-bold tracking-tight text-lg italic">
                                "{tag}"
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
