'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function AddProductPage() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        alert('Product Added (Placeholder)');
        console.log(data);
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
                        <input {...register('name')} className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Category</label>
                        <select {...register('category')} className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium">
                            <option>Mixtures</option>
                            <option>Health</option>
                            <option>Baked</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Price per KG (₹)</label>
                        <input {...register('price')} type="number" className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Initial Stock (KG)</label>
                        <input {...register('stock')} type="number" className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium" />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Description</label>
                        <textarea {...register('description')} className="w-full bg-white border-none rounded-[2rem] py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium min-h-[150px]" />
                    </div>
                </div>

                <div className="pt-8 flex gap-4">
                    <Button type="submit" size="lg" className="flex-1 shadow-2xl">Create Product</Button>
                    <Button type="button" variant="outline" size="lg" onClick={() => window.history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
