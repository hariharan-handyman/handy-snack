'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/shop/ProductCard';
import ProductFilters from '@/components/shop/ProductFilters';
import { motion } from 'framer-motion';

const MOCK_PRODUCTS = [
    { id: 1, name: 'Traditional Mixture', price: 200, category: 'Mixtures', slug: 'traditional-mixture', image: '' },
    { id: 2, name: 'Millet Bites', price: 250, category: 'Health', slug: 'millet-bites', image: '' },
    { id: 3, name: 'Baked Treats', price: 180, category: 'Baked', slug: 'baked-treats', image: '' },
    { id: 4, name: 'Spicy Mixture', price: 220, category: 'Mixtures', slug: 'spicy-mixture', image: '' },
    { id: 5, name: 'Corn Mixture', price: 150, category: 'Mixtures', slug: 'corn-mixture', image: '' },
    { id: 6, name: 'Oats Cookies', price: 300, category: 'Baked', slug: 'oats-cookies', image: '' },
];

export default function ShopPage() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProducts = MOCK_PRODUCTS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-white relative overflow-hidden">
            <Navbar />

            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-accent/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />

            <section className="pt-40 pb-32 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24">
                        <div className="space-y-6 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Discover Excellence</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-dark italic">
                                THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">SNACK</span> <br />
                                <span className="text-dark/20">SHOP.</span>
                            </h1>
                        </div>

                        <div className="w-full lg:w-auto">
                            <ProductFilters
                                search={search}
                                setSearch={setSearch}
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                            />
                        </div>
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12"
                    >
                        {filteredProducts.map((prod) => (
                            <ProductCard key={prod.id} product={prod} />
                        ))}
                    </motion.div>

                    {filteredProducts.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-40 text-center"
                        >
                            <div className="w-24 h-24 bg-dark/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">🔍</span>
                            </div>
                            <h3 className="text-2xl font-black text-dark/30 italic uppercase tracking-tighter">No snacks found.</h3>
                            <p className="text-dark/40 font-bold mt-2">Try adjusting your filters or search term.</p>
                            <button
                                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                                className="mt-8 text-sm font-black text-primary hover:text-secondary uppercase tracking-widest underline underline-offset-8"
                            >
                                Reset All Filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
