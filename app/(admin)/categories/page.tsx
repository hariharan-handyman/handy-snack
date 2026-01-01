'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit3, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const MOCK_CATEGORIES = [
    { id: 1, name: 'Mixtures', slug: 'mixtures', productCount: 12 },
    { id: 2, name: 'Health', slug: 'health', productCount: 8 },
    { id: 3, name: 'Baked', slug: 'baked', productCount: 15 },
];

export default function AdminCategoriesPage() {
    const [search, setSearch] = useState('');

    return (
        <div className="space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-4">
                    <span className="text-sm font-black uppercase tracking-widest opacity-30 italic">Management</span>
                    <h1 className="text-6xl font-black tracking-tighter italic">CATEGORIES</h1>
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
                        <input
                            type="text"
                            placeholder="Search category..."
                            className="bg-black/5 border-none rounded-full py-4 pl-12 pr-6 text-sm font-bold focus:ring-2 focus:ring-black outline-none min-w-[280px]"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button size="icon" className="shadow-2xl">
                        <Plus size={24} />
                    </Button>
                </div>
            </div>

            <div className="bg-black/5 rounded-[4rem] p-8 border border-black/5">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-black/5">
                                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest opacity-30">Category Name</th>
                                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest opacity-30">Slug</th>
                                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest opacity-30">Products</th>
                                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest opacity-30 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_CATEGORIES.map((cat) => (
                                <tr key={cat.id} className="group hover:bg-black hover:text-white transition-all">
                                    <td className="px-8 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-black/10 group-hover:bg-white/10 flex items-center justify-center text-[10px] font-black italic uppercase shrink-0">
                                                {cat.name.charAt(0)}
                                            </div>
                                            <p className="font-black text-sm tracking-tight">{cat.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8 text-xs font-bold opacity-60 group-hover:opacity-100 tracking-widest">
                                        {cat.slug}
                                    </td>
                                    <td className="px-8 py-8 font-black text-sm italic">{cat.productCount} items</td>
                                    <td className="px-8 py-8 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                                            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                                <Edit3 size={16} />
                                            </button>
                                            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
