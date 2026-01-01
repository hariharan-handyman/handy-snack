'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

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
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({ ...product, quantity: 1, image: '' });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10 }}
            className="group relative"
        >
            <div className="relative aspect-[4/5] rounded-[2.5rem] bg-black/5 overflow-hidden mb-6">
                {/* Antigravity floating on hover */}
                <motion.div
                    whileHover={{ y: -20, rotate: 2, scale: 1.1 }}
                    className="w-full h-full p-12 flex items-center justify-center"
                >
                    <div className="w-full h-full bg-black/10 rounded-3xl flex items-center justify-center text-black/20 font-black text-xl italic uppercase tracking-tighter rotate-[-5deg]">
                        {product.category}
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-300">
                    <button
                        onClick={toggleFavorite}
                        className={`w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all scale-90 hover:scale-100 ${isFavorite ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
                    >
                        <Heart size={20} fill={isFavorite ? "white" : "none"} />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center hover:bg-black hover:text-white transition-all scale-90 hover:scale-100">
                        <Share2 size={20} />
                    </button>
                    <button
                        onClick={handleAddToCart}
                        className="w-12 h-12 rounded-full bg-black text-white shadow-2xl flex items-center justify-center hover:bg-[#a6740c] transition-all scale-90 hover:scale-100"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>

                {/* Offer Badge */}
                {product.offer && (
                    <div className="absolute top-6 left-6 px-4 py-1 bg-[#c5890e] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        OFFER
                    </div>
                )}
            </div>

            <div className="space-y-2 text-center px-4">
                <Link href={`/shop/${product.slug}`}>
                    <h3 className="text-xl font-bold tracking-tight hover:text-[#c5890e] transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-center justify-center gap-3">
                    <span className="font-black text-lg">₹{product.price}</span>
                    <span className="text-sm opacity-40 font-medium tracking-widest uppercase">Per KG</span>
                </div>
            </div>
        </motion.div>
    );
}
