'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit3, Trash2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
import { Button } from '@/components/ui/Button';
import { getProducts, deleteProduct } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminProductsPage() {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    }

    async function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
            loadProducts(); // Refresh list
        }
    }

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-12 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-secondary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 relative z-10">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Inventory Core</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter text-dark italic leading-none">
                        PRODUCTS<span className="text-secondary text-6xl">.</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="relative flex-1 lg:flex-none">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-dark/30" size={18} />
                        <input
                            type="text"
                            placeholder="Find a product..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full lg:w-80 h-14 bg-white border border-dark/5 rounded-2xl pl-14 pr-6 text-sm font-bold text-dark outline-none focus:border-primary shadow-sm transition-all"
                        />
                    </div>
                    <Link href="/products/add">
                        <Button className="h-14 w-14 lg:w-40 rounded-2xl bg-dark text-white shadow-xl hover:bg-primary flex items-center justify-center lg:justify-between px-4 transition-all group">
                            <span className="hidden lg:inline text-xs font-black uppercase tracking-widest">New Craft</span>
                            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-dark/5 shadow-2xl overflow-hidden relative z-10">
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="py-40 text-center space-y-4">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-dark/30">Syncing database...</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="py-40 text-center">
                            <h3 className="text-2xl font-black text-dark/20 italic uppercase tracking-tighter">No crafts found.</h3>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="text-left bg-dark/5">
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.15em] text-dark/40">Identification</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.15em] text-dark/40">Category</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.15em] text-dark/40">Market Value</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.15em] text-dark/40">Availability</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.15em] text-dark/40 text-right">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark/5">
                                {filteredProducts.map((prod) => (
                                    <tr key={prod.id} className="group hover:bg-primary/[0.02] transition-colors">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-sm font-black text-dark tracking-tighter shadow-inner ring-1 ring-dark/5">
                                                    {prod.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-dark tracking-tight text-lg">{prod.name}</p>
                                                    <p className="text-[10px] font-bold text-dark/30 uppercase tracking-[0.2em] mt-0.5">ID: #CRAFT-0{prod.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="px-3 py-1 bg-secondary/10 text-secondary text-[9px] font-black uppercase tracking-widest rounded-lg">
                                                {prod.category}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8 font-black text-dark tracking-tight">₹{prod.price} <span className="text-[10px] text-dark/30 font-bold uppercase ml-1">Per KG</span></td>
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <div className={cn(
                                                        "w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]",
                                                        prod.stock < 20 ? "text-red-500 bg-red-500" : "text-accent bg-accent"
                                                    )} />
                                                    <span className={cn(
                                                        "text-xs font-black uppercase tracking-widest",
                                                        prod.stock < 20 ? "text-red-500" : "text-dark/60"
                                                    )}>
                                                        {prod.stock} Units
                                                    </span>
                                                </div>
                                                <div className="w-24 h-1 bg-dark/5 rounded-full overflow-hidden">
                                                    <div
                                                        className={cn("h-full transition-all duration-1000", prod.stock < 20 ? "bg-red-500 text-red-500" : "bg-accent text-accent")}
                                                        style={{ width: `${Math.min(100, (prod.stock / 100) * 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                                <Link href={`/products/edit/${prod.id}`}>
                                                    <button className="w-10 h-10 rounded-xl bg-dark text-white flex items-center justify-center hover:bg-secondary transition-all shadow-lg active:scale-95">
                                                        <Edit3 size={16} />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(prod.id)}
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
