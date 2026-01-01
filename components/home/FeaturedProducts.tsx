'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ShoppingCart, Heart } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
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
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary/10 border border-secondary/20">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Community Favorites</span>
                        </div>
                        <h2 className="text-5xl font-black tracking-tighter text-dark">FEATURED TREATS</h2>
                    </div>
                    <Link href="/shop">
                        <Button variant="ghost" className="group h-14 px-8 rounded-2xl border-2 border-dark/5 hover:border-primary transition-all font-black text-xs uppercase tracking-widest">
                            View Collection <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {MOCK_PRODUCTS.map((prod) => (
                        <ProductCard key={prod.id} product={prod} />
                    ))}
                </div>
            </div>
        </section>
    );
}
