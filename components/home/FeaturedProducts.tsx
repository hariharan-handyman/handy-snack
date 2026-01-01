'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ShoppingCart, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import imageKitLoader from '@/lib/imagekit/loader';

const MOCK_PRODUCTS = [
    { id: 1, name: 'Traditional Mixture', price: 200, image: 'traditional-mixture.jpg', category: 'Mixtures' },
    { id: 2, name: 'Millet Bites', price: 250, image: 'millet-bites.jpg', category: 'Health' },
    { id: 3, name: 'Baked Treats', price: 180, image: 'baked-treats.jpg', category: 'Baked' },
    { id: 4, name: 'Spicy Mixture', price: 220, image: 'spicy-mixture.jpg', category: 'Mixtures' },
];

export default function FeaturedProducts() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-12">
                    <div className="space-y-4">
                        <span className="text-sm font-bold uppercase tracking-widest opacity-40">The Best Sellers</span>
                        <h2 className="text-5xl font-black tracking-tighter">FEATURED TREATS</h2>
                    </div>
                    <Link href="/shop">
                        <Button variant="ghost" className="group">
                            View All <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {MOCK_PRODUCTS.map((prod, i) => (
                        <motion.div
                            key={prod.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group"
                        >
                            <div className="relative aspect-square rounded-3xl bg-black/5 overflow-hidden mb-6">
                                {/* Antigravity floating effect on hover */}
                                <motion.div
                                    whileHover={{ y: -20, rotate: 5, scale: 1.05 }}
                                    className="w-full h-full flex items-center justify-center p-8"
                                >
                                    <div className="relative w-full h-full">
                                        {/* Image Placeholder */}
                                        <div className="w-full h-full bg-black/10 rounded-2xl flex items-center justify-center text-black/20 font-bold uppercase tracking-tighter text-2xl rotate-[-10deg]">
                                            {prod.category}
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                                    <button className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                        <Heart size={18} />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-bold text-lg">{prod.name}</h3>
                                <p className="text-black/60 font-medium">₹{prod.price}/kg</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
