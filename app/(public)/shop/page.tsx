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
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-32 pb-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                        <div className="space-y-4">
                            <span className="text-sm font-bold uppercase tracking-widest opacity-40">Our Collection</span>
                            <h1 className="text-4xl font-black tracking-tighter">THE SNACK SHOP</h1>
                        </div>

                        <ProductFilters
                            search={search}
                            setSearch={setSearch}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
                    >
                        {filteredProducts.map((prod) => (
                            <ProductCard key={prod.id} product={prod} />
                        ))}
                    </motion.div>

                    {filteredProducts.length === 0 && (
                        <div className="py-24 text-center">
                            <h3 className="text-2xl font-bold opacity-20">No snacks found for your selection.</h3>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
