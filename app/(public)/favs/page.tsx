'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/shop/ProductCard';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<any[]>([]);

    useEffect(() => {
        const savedFavs = localStorage.getItem('hm-favs');
        if (savedFavs) {
            setFavorites(JSON.parse(savedFavs));
        }
    }, []);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-32 pb-24">
                <div className="container mx-auto px-4">
                    <div className="space-y-4 mb-16">
                        <span className="text-sm font-bold uppercase tracking-widest opacity-40">Your Likes</span>
                        <h1 className="text-6xl font-black tracking-tighter">FAVORITES</h1>
                    </div>

                    {favorites.length === 0 ? (
                        <div className="py-24 text-center space-y-8 bg-black/5 rounded-[3rem] border border-dashed border-black/10">
                            <div className="flex justify-center">
                                <Heart size={80} className="opacity-10" />
                            </div>
                            <h3 className="text-2xl font-bold opacity-30">You haven't favorited any snacks yet.</h3>
                            <Link href="/shop" className="inline-block">
                                <Button variant="primary" size="lg">Explore Snacks</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                            {favorites.map((prod) => (
                                <ProductCard key={prod.id} product={prod} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
