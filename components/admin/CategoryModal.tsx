'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, AlertCircle } from 'lucide-react';
import { createCategory, updateCategory } from '@/lib/actions';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    category?: any; // If provided, we're editing
}

export default function CategoryModal({ isOpen, onClose, onSuccess, category }: CategoryModalProps) {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (category) {
            setName(category.name);
            setSlug(category.slug);
        } else {
            setName('');
            setSlug('');
        }
        setError('');
    }, [category, isOpen]);

    const handleNameChange = (val: string) => {
        setName(val);
        if (!category) {
            setSlug(val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !slug) {
            setError('Both name and slug are required.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            if (category) {
                await updateCategory(category.id, { name, slug });
            } else {
                await createCategory({ name, slug });
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-dark/5"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="p-10 relative z-10">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-accent">Segment Editor</span>
                                    </div>
                                    <h2 className="text-3xl font-black tracking-tighter text-dark italic">
                                        {category ? 'EDIT' : 'NEW'} CATEGORY
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-12 h-12 rounded-2xl bg-dark/5 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all group"
                                >
                                    <X size={20} className="group-hover:rotate-90 transition-transform" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-dark/30 ml-4">Display Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => handleNameChange(e.target.value)}
                                            placeholder="e.g. Millet Snacks"
                                            className="w-full h-16 bg-dark/5 border-none rounded-2xl px-6 text-sm font-bold text-dark outline-none focus:ring-2 focus:ring-accent transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-dark/30 ml-4">URL Identifier (Slug)</label>
                                        <div className="relative">
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-dark/20 font-bold text-sm">/</span>
                                            <input
                                                type="text"
                                                value={slug}
                                                onChange={(e) => setSlug(e.target.value)}
                                                placeholder="millet-snacks"
                                                className="w-full h-16 bg-dark/5 border-none rounded-2xl pl-10 pr-6 text-sm font-bold text-dark/60 outline-none focus:ring-2 focus:ring-accent transition-all font-mono"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl text-red-500"
                                    >
                                        <AlertCircle size={18} />
                                        <p className="text-xs font-bold">{error}</p>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-16 bg-dark text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-accent disabled:opacity-50 transition-all flex items-center justify-center gap-3 group"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Save size={18} className="group-hover:scale-110 transition-transform" />
                                            {category ? 'Sync Changes' : 'Initialize Segment'}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
