'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function ProductCard({ product }: { product: any }) {
    const { addToCart } = useCart();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem('hm-favs') || '[]');
        setIsFavorite(favs.some((f: any) => f.id === product.id));
    }, [product.id]);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const favs = JSON.parse(localStorage.getItem('hm-favs') || '[]');
        let newFavs;
        if (isFavorite) {
            newFavs = favs.filter((f: any) => f.id !== product.id);
        } else {
            newFavs = [...favs, product];
        }
        localStorage.setItem('hm-favs', JSON.stringify(newFavs));
        setIsFavorite(!isFavorite);
        window.dispatchEvent(new Event('favoritesChanged'));
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({ ...product, quantity: 1, image: '' });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-white transition-all duration-500 overflow-hidden"
        >
            <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden mb-6">
                {/* Product Image Placeholder (ImageKit will be here) */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full flex items-center justify-center relative z-10"
                >
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                        <span className="text-dark/5 font-black text-4xl uppercase tracking-[0.2em] rotate-[-15deg] select-none">
                            Premium
                        </span>
                    </div>
                </motion.div>

                {/* Quick Actions - Floating Hover */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 z-20 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-400">
                    <button
                        onClick={toggleFavorite}
                        className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center transition-all bg-white shadow-xl border border-gray-100",
                            isFavorite ? "text-accent" : "text-dark/40 hover:text-accent"
                        )}
                    >
                        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white border border-gray-100 text-dark/40 flex items-center justify-center shadow-xl hover:text-dark transition-all">
                        <Share2 size={20} />
                    </button>
                    <button
                        onClick={handleAddToCart}
                        className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-xl hover:bg-accent transition-all"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>

                {/* Sale Badge */}
                {product.offer && (
                    <div className="absolute top-6 left-6 z-20">
                        <span className="px-4 py-1.5 bg-accent text-white text-[9px] font-bold uppercase tracking-[0.2em]">
                            Best Offer
                        </span>
                    </div>
                )}
            </div>

            <div className="space-y-4 pb-12 text-center">
                <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-dark/20">{product.category}</p>
                    <Link href={`/shop/${product.slug}`}>
                        <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-dark hover:text-accent transition-colors px-4">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                <div className="flex items-center justify-center gap-3">
                    <span className="text-lg font-extrabold text-dark tracking-tighter">₹{product.price}</span>
                    <span className="text-[10px] font-bold text-dark/10 uppercase tracking-[0.2em]">/ Per KG</span>
                </div>
            </div>
        </motion.div>
    );
}
