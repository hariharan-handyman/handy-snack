'use client';

import React, { useState, useEffect, use } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { updateProduct, getProduct, getCategories } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { register, handleSubmit, reset, setValue } = useForm();
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const router = useRouter();

    useEffect(() => {
        loadData();
    }, [id]);

    async function loadData() {
        setFetching(true);
        try {
            const [cats, product] = await Promise.all([
                getCategories(),
                getProduct(parseInt(id))
            ]);

            setCategories(cats);

            if (product) {
                setValue('name', product.name);
                setValue('categoryId', product.categoryId);
                setValue('price', product.price);
                setValue('stock', product.stock);
                setValue('description', product.description);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            alert('Error loading product data');
        } finally {
            setFetching(false);
        }
    }

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            // Generate slug from name
            const slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

            await updateProduct(parseInt(id), {
                name: data.name,
                slug: slug,
                categoryId: parseInt(data.categoryId),
                description: data.description,
                price: data.price.toString(),
                stock: parseInt(data.stock),
            });
            alert('Product updated successfully!');
            router.push('/products');
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="py-40 text-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-[10px] font-black uppercase tracking-widest text-dark/30">Loading product details...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-16">
            <div className="space-y-4">
                <span className="text-sm font-black uppercase tracking-widest opacity-30 italic">Editor</span>
                <h1 className="text-6xl font-black tracking-tighter italic">EDIT PRODUCT</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 bg-black/5 p-16 rounded-[4rem] border border-black/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Product Name</label>
                        <input {...register('name', { required: true })} className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Category</label>
                        <select {...register('categoryId', { required: true })} className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium">
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Price per KG (₹)</label>
                        <input {...register('price', { required: true })} type="number" step="0.01" className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Stock (KG)</label>
                        <input {...register('stock', { required: true })} type="number" step="1" className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium" />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Description</label>
                        <textarea {...register('description')} className="w-full bg-white border-none rounded-[2rem] py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium min-h-[150px]" />
                    </div>
                </div>

                <div className="pt-8 flex gap-4">
                    <Button type="submit" size="lg" className="flex-1 shadow-2xl" disabled={loading}>
                        {loading ? 'Saving...' : 'Update Product'}
                    </Button>
                    <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
