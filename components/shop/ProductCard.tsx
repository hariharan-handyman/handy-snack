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
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-[2rem] p-4 border border-dark/5 shadow-sm hover:shadow-2xl transition-all duration-500"
        >
            <div className="relative aspect-[4/5] rounded-[1.5rem] bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden mb-6">
                {/* Antigravity floating on hover */}
                <motion.div
                    whileHover={{ y: -10, rotate: 2, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-full h-full p-8 flex items-center justify-center relative z-10"
                >
                    <div className="w-full h-full bg-white/40 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-inner border border-white/50">
                        <span className="text-dark/20 font-black text-2xl italic uppercase tracking-tighter rotate-[-10deg]">
                            {product.category}
                        </span>
                    </div>
                </motion.div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-white/80 backdrop-blur-md border border-white text-[9px] font-black uppercase tracking-widest text-dark rounded-full shadow-sm">
                        {product.category}
                    </span>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <button
                        onClick={toggleFavorite}
                        className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-lg backdrop-blur-md border",
                            isFavorite ? "bg-primary border-primary text-white" : "bg-white/80 border-white text-dark hover:bg-primary hover:text-white"
                        )}
                    >
                        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-white/80 border border-white text-dark flex items-center justify-center shadow-lg backdrop-blur-md hover:bg-secondary hover:text-white transition-all">
                        <Share2 size={18} />
                    </button>
                </div>

                {/* Add to Cart Overlay */}
                <div className="absolute inset-x-4 bottom-4 z-20 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                        onClick={handleAddToCart}
                        className="w-full h-12 bg-dark text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-accent flex items-center justify-center gap-2 transition-all"
                    >
                        <ShoppingCart size={16} /> Add to Cart
                    </button>
                </div>
            </div>

            <div className="px-2 pb-2 space-y-3">
                <div className="flex justify-between items-start">
                    <Link href={`/shop/${product.slug}`} className="group/title">
                        <h3 className="text-lg font-black tracking-tight text-dark group-hover/title:text-primary transition-colors leading-tight">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <span className="text-xl font-black text-dark">₹{product.price}</span>
                        <span className="text-[10px] font-bold text-dark/30 uppercase tracking-widest mt-1">/ KG</span>
                    </div>
                    {product.offer && (
                        <span className="text-[9px] font-black bg-accent/10 text-accent px-2 py-1 rounded-md uppercase tracking-widest">
                            {product.offer}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
