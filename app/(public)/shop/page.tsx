'use client';

import React, { useState, useEffect } from 'react';
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

import { getProducts, getCategories } from '@/lib/actions';

export default function ShopPage() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [prods, cats] = await Promise.all([
                    getProducts(),
                    getCategories()
                ]);
                setProducts(prods);
                setCategories(cats);
            } catch (error) {
                console.error('Error loading shop data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const categorySlug = categories.find(c => c.id === p.categoryId)?.name || 'All';
        const matchesCategory = activeCategory === 'All' || categorySlug === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-white relative">
            <Navbar />

            <section className="pt-40 pb-32">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20 border-b border-gray-100 pb-12">
                        <div className="space-y-4 max-w-2xl">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Professional Selection</span>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-dark leading-none uppercase">
                                Our <span className="text-accent">Collection.</span>
                            </h1>
                        </div>

                        <div className="w-full lg:w-auto">
                            <ProductFilters
                                search={search}
                                setSearch={setSearch}
                                activeCategory={activeCategory}
                                setActiveCategory={setActiveCategory}
                                categories={['All', ...categories.map(c => c.name)]}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-40 text-center space-y-4">
                            <div className="w-10 h-10 border-2 border-dark border-t-accent rounded-full animate-spin mx-auto" />
                            <p className="text-[10px] font-bold uppercase tracking-widest text-dark/30">Syncing Collection...</p>
                        </div>
                    ) : (
                        <>
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
                            >
                                {filteredProducts.map((prod) => (
                                    <ProductCard key={prod.id} product={prod} />
                                ))}
                            </motion.div>

                            {filteredProducts.length === 0 && (
                                <div className="py-40 text-center">
                                    <h3 className="text-xl font-bold text-dark/20 uppercase tracking-widest">No products found.</h3>
                                    <button
                                        onClick={() => { setSearch(''); setActiveCategory('All'); }}
                                        className="mt-6 text-[10px] font-bold text-accent uppercase tracking-widest border-b border-accent pb-1"
                                    >
                                        Clear search
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
