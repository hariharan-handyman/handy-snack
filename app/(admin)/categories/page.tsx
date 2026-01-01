'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit3, Trash2 } from 'lucide-react';
import CategoryModal from '@/components/admin/CategoryModal';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
import { Button } from '@/components/ui/Button';
import { getCategories, deleteCategory } from '@/lib/actions';

export default function AdminCategoriesPage() {
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
    }

    const openModal = (cat?: any) => {
        setSelectedCategory(cat || null);
        setIsModalOpen(true);
    };

    async function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this category?')) {
            await deleteCategory(id);
            loadCategories(); // Refresh list
        }
    }

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-12 relative overflow-hidden">
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={loadCategories}
                category={selectedCategory}
            />

            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 relative z-10">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Classification Hub</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter text-dark italic leading-none">
                        CATEGORIES<span className="text-accent text-6xl">.</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="relative flex-1 lg:flex-none">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-dark/30" size={18} />
                        <input
                            type="text"
                            placeholder="Find a category..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full lg:w-80 h-14 bg-white border border-dark/5 rounded-2xl pl-14 pr-6 text-sm font-bold text-dark outline-none focus:border-accent shadow-sm transition-all"
                        />
                    </div>
                    <Button
                        className="h-14 w-14 lg:w-44 rounded-2xl bg-dark text-white shadow-xl hover:bg-accent flex items-center justify-center lg:justify-between px-4 transition-all group"
                        onClick={() => openModal()}
                    >
                        <span className="hidden lg:inline text-xs font-black uppercase tracking-widest">New Segment</span>
                        <Plus size={20} className="group-hover:rotate-180 transition-transform" />
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-dark/5 shadow-2xl overflow-hidden relative z-10">
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="py-40 text-center space-y-4">
                            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-dark/30">Mapping hierarchy...</p>
                        </div>
                    ) : filteredCategories.length === 0 ? (
                        <div className="py-40 text-center">
                            <h3 className="text-2xl font-black text-dark/20 italic uppercase tracking-tighter">No segments found.</h3>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="text-left bg-dark/5">
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.15em] text-dark/40">Segment Info</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.15em] text-dark/40">URL Identifier</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.15em] text-dark/40 text-right">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark/5">
                                {filteredCategories.map((cat) => (
                                    <tr key={cat.id} className="group hover:bg-accent/[0.02] transition-colors">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center text-sm font-black text-dark tracking-tighter shadow-inner ring-1 ring-dark/5">
                                                    {cat.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-dark tracking-tight text-lg">{cat.name}</p>
                                                    <p className="text-[10px] font-bold text-dark/30 uppercase tracking-[0.2em] mt-0.5">SEG-ID: #0{cat.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <code className="text-[10px] font-black bg-dark/5 px-3 py-1.5 rounded-lg text-dark/40 group-hover:bg-dark group-hover:text-white transition-colors uppercase tracking-[0.1em]">
                                                /{cat.slug}
                                            </code>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                                <button
                                                    onClick={() => openModal(cat)}
                                                    className="w-10 h-10 rounded-xl bg-dark text-white flex items-center justify-center hover:bg-primary transition-all shadow-lg active:scale-95"
                                                >
                                                    <Edit3 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(cat.id)}
                                                    className="w-10 h-10 rounded-xl bg-white border border-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-95"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
