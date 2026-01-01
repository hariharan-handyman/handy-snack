'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { createProduct, getCategories } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
    const { register, handleSubmit, reset } = useForm();
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        const data = await getCategories();
        setCategories(data);
    }

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            await createProduct({
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                stock: parseFloat(data.stock),
                category: data.category,
                images: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            alert('Product created successfully!');
            reset();
            router.push('/products');
        } catch (error) {
            alert('Failed to create product. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-16">
            <div className="space-y-4">
                <span className="text-sm font-black uppercase tracking-widest opacity-30 italic">Inventory</span>
                <h1 className="text-6xl font-black tracking-tighter italic">NEW PRODUCT</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 bg-black/5 p-16 rounded-[4rem] border border-black/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Product Name</label>
                        <input {...register('name', { required: true })} className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Category</label>
                        <select {...register('category', { required: true })} className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium">
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.slug}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Price per KG (₹)</label>
                        <input {...register('price', { required: true })} type="number" step="0.01" className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Initial Stock (KG)</label>
                        <input {...register('stock', { required: true })} type="number" step="0.01" className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium" />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Description</label>
                        <textarea {...register('description')} className="w-full bg-white border-none rounded-[2rem] py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium min-h-[150px]" />
                    </div>
                </div>

                <div className="pt-8 flex gap-4">
                    <Button type="submit" size="lg" className="flex-1 shadow-2xl" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Product'}
                    </Button>
                    <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
