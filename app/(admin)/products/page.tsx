'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit3, Trash2 } from 'lucide-react';
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
        <div className="space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-4">
                    <span className="text-sm font-black uppercase tracking-widest opacity-30 italic">Management</span>
                    <h1 className="text-6xl font-black tracking-tighter italic">PRODUCTS</h1>
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
                        <input
                            type="text"
                            placeholder="Search product..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-black/5 border-none rounded-full py-4 pl-12 pr-6 text-sm font-bold focus:ring-2 focus:ring-black outline-none min-w-[280px]"
                        />
                    </div>
                    <Link href="/products/add">
                        <Button size="icon" className="shadow-2xl">
                            <Plus size={24} />
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-black/5 rounded-[4rem] p-8 border border-black/5">
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="text-center py-20">
                            <p className="text-sm font-bold opacity-40">Loading products...</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-sm font-bold opacity-40">No products found.</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-black/5">
                                    <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest opacity-30">Product Name</th>
                                    <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest opacity-30">Category</th>
                                    <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest opacity-30">Price/KG</th>
                                    <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest opacity-30">Stock (KG)</th>
                                    <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest opacity-30 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((prod) => (
                                    <tr key={prod.id} className="group hover:bg-black hover:text-white transition-all">
                                        <td className="px-8 py-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-black/10 group-hover:bg-white/10 flex items-center justify-center text-[10px] font-black italic uppercase shrink-0">
                                                    {prod.name.charAt(0)}
                                                </div>
                                                <p className="font-black text-sm tracking-tight">{prod.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-8 text-xs font-bold opacity-60 group-hover:opacity-100 uppercase tracking-widest">
                                            {prod.category}
                                        </td>
                                        <td className="px-8 py-8 font-black text-sm italic">₹{prod.price}</td>
                                        <td className="px-8 py-8">
                                            <span className={`text-xs font-black uppercase tracking-widest ${prod.stock < 20 ? 'text-red-500' : 'opacity-60 group-hover:opacity-100'}`}>
                                                {prod.stock} Kg
                                            </span>
                                        </td>
                                        <td className="px-8 py-8 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                                                <Link href={`/products/edit/${prod.id}`}>
                                                    <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                                        <Edit3 size={16} />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(prod.id)}
                                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
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
