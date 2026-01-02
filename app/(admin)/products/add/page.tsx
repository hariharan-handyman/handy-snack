'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { createProduct, getCategories } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AddProductPage() {
    const { register, handleSubmit, reset } = useForm();
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        const data = await getCategories();
        setCategories(data);
    }

    const onSubmit = async (data: any) => {
        if (images.length === 0) {
            alert('Please upload at least one image.');
            return;
        }

        setLoading(true);
        try {
            const slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

            await createProduct({
                name: data.name,
                slug: slug,
                categoryId: parseInt(data.categoryId),
                description: data.description,
                price: data.price.toString(),
                stock: parseInt(data.stock),
                images: images,
                offer: false
            });
            alert('Product created successfully!');
            reset();
            setImages([]);
            router.push('/products');
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20">
            <div className="flex justify-between items-end border-b border-gray-100 pb-8">
                <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Inventory Management</span>
                    <h1 className="text-5xl font-bold tracking-tight text-dark uppercase">Create <span className="text-accent underline underline-offset-8">Product.</span></h1>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40">Product Name</label>
                                <input
                                    {...register('name', { required: true })}
                                    placeholder="Enter product title..."
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:ring-2 focus:ring-accent/20 outline-none font-bold text-sm transition-all"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40">Category</label>
                                <select
                                    {...register('categoryId', { required: true })}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:ring-2 focus:ring-accent/20 outline-none font-bold text-sm transition-all"
                                >
                                    <option value="">Choose category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40">Price (₹)</label>
                                <input
                                    {...register('price', { required: true })}
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:ring-2 focus:ring-accent/20 outline-none font-bold text-sm transition-all"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40">In Stock (Units)</label>
                                <input
                                    {...register('stock', { required: true })}
                                    type="number"
                                    placeholder="0"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:ring-2 focus:ring-accent/20 outline-none font-bold text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-3 text-black">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40">Description</label>
                            <textarea
                                {...register('description')}
                                placeholder="Describe your product details, ingredients, etc..."
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-accent/20 outline-none font-bold text-sm min-h-[200px] transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40">Media Assets</label>
                        <ImageUpload value={images} onChange={setImages} />
                    </div>

                    <div className="space-y-4">
                        <Button type="submit" size="lg" className="h-16 w-full rounded-2xl bg-dark text-white hover:bg-accent transition-all shadow-xl font-bold uppercase tracking-widest text-[10px]" disabled={loading}>
                            {loading ? 'Processing...' : 'Publish Product'}
                        </Button>
                        <Button type="button" variant="ghost" className="w-full font-bold text-dark/40 hover:text-dark uppercase tracking-widest text-[9px]" onClick={() => router.back()}>Discard Changes</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
