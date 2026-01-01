'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Share2, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const MOCK_PRODUCTS = [
    { id: 1, name: 'Traditional Mixture', price: 200, category: 'Mixtures', slug: 'traditional-mixture', description: 'A timeless blend of crispy lentils, nuts, and traditional spices. Made with hygiene in home-based units.' },
    { id: 2, name: 'Millet Bites', price: 250, category: 'Health', slug: 'millet-bites', description: 'Healthy, crunchy bites made from multi-millets. Perfect for guilt-free snacking.' },
];

export default function ProductDetailPage() {
    const { slug } = useParams();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    const product = MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-32 pb-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
                        {/* Image Gallery */}
                        <div className="lg:w-1/2 space-y-6">
                            <motion.div
                                layoutId={`img-${product.id}`}
                                className="aspect-square rounded-[3rem] bg-black/5 overflow-hidden relative group"
                            >
                                <div className="w-full h-full flex items-center justify-center p-24">
                                    <div className="w-full h-full bg-black/10 rounded-[2.5rem] flex items-center justify-center text-black/20 font-black italic text-4xl uppercase tracking-tighter rotate-[-5deg] group-hover:rotate-0 transition-transform duration-700">
                                        {product.category}
                                    </div>
                                </div>
                            </motion.div>

                            <div className="flex gap-4">
                                {[1, 2, 3].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`w-24 h-24 rounded-2xl bg-black/5 border-2 transition-all ${activeImage === i ? 'border-black' : 'border-transparent opacity-40'}`}
                                    >
                                        <div className="w-full h-full bg-black/10 rounded-xl flex items-center justify-center text-[8px] font-black uppercase">Img {i + 1}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="lg:w-1/2 space-y-10">
                            <div className="space-y-4">
                                <motion.span
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="inline-block px-4 py-1 rounded-full bg-black/5 text-[10px] font-black uppercase tracking-widest"
                                >
                                    {product.category}
                                </motion.span>
                                <h1 className="text-6xl font-black tracking-tighter leading-none">{product.name}</h1>
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl font-black italic">₹{product.price}</span>
                                    <span className="text-sm font-bold opacity-30 uppercase tracking-widest">Available in Stock</span>
                                </div>
                            </div>

                            <p className="text-xl text-black/60 font-medium leading-relaxed max-w-xl">
                                {product.description}
                            </p>

                            <div className="space-y-6 pt-4">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-6 bg-black/5 rounded-full px-8 py-4">
                                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="hover:text-orange-500 transition-colors">
                                            <span className="text-2xl font-bold">−</span>
                                        </button>
                                        <span className="font-black text-xl w-8 text-center">{quantity}</span>
                                        <button onClick={() => setQuantity(q => q + 1)} className="hover:text-orange-500 transition-colors">
                                            <span className="text-2xl font-bold">+</span>
                                        </button>
                                    </div>

                                    <Button
                                        size="lg"
                                        className="flex-1 text-lg shadow-2xl"
                                        onClick={() => addToCart({ ...product, quantity, image: '' } as any)}
                                    >
                                        <ShoppingCart className="mr-3" size={20} /> Add To Cart
                                    </Button>
                                </div>

                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1">
                                        <Heart className="mr-2" size={18} /> Favorite
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        <Share2 className="mr-2" size={18} /> Share
                                    </Button>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-black/5">
                                <div className="text-center space-y-2">
                                    <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mx-auto text-black/40"><ShieldCheck size={20} /></div>
                                    <p className="text-[10px] font-black uppercase tracking-tighter opacity-40">FSSAI Certified</p>
                                </div>
                                <div className="text-center space-y-2">
                                    <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mx-auto text-black/40"><Truck size={20} /></div>
                                    <p className="text-[10px] font-black uppercase tracking-tighter opacity-40">Pan-India Ship</p>
                                </div>
                                <div className="text-center space-y-2">
                                    <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mx-auto text-black/40"><RotateCcw size={20} /></div>
                                    <p className="text-[10px] font-black uppercase tracking-tighter opacity-40">Easy Returns</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
