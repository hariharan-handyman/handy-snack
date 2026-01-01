'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { CreditCard, Truck, MapPin, User, Phone, Mail } from 'lucide-react';
import Script from 'next/script';

const checkoutSchema = z.object({
    name: z.string().min(3, 'Name is too short'),
    email: z.string().email('Invalid email'),
    mobile: z.string().regex(/^[0-9]{10}$/, 'Invalid mobile number (10 digits)'),
    address: z.string().min(10, 'Full address please'),
    pincode: z.string().regex(/^[0-9]{6}$/, 'Invalid pincode (6 digits)'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
    const { cart, subtotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CheckoutForm>({
        resolver: zodResolver(checkoutSchema),
    });

    const pincode = watch('pincode');

    useEffect(() => {
        if (pincode?.length === 6) {
            fetch(`https://api.postalpincode.in/pincode/${pincode}`)
                .then(res => res.json())
                .then(data => {
                    if (data[0].Status === "Success") {
                        const postOffice = data[0].PostOffice[0];
                        setValue('city', postOffice.District);
                        setValue('state', postOffice.State);
                    }
                });
        }
    }, [pincode, setValue]);

    const handlePayment = async (data: CheckoutForm) => {
        setLoading(true);
        try {
            // 1. Create Order on Server
            const res = await fetch('/api/razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: subtotal }),
            });
            const order = await res.json();

            // 2. Open Razorpay Checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Handyman Technologies",
                description: "Snack Order Payment",
                order_id: order.id,
                handler: function (response: any) {
                    alert('Payment Successful: ' + response.razorpay_payment_id);
                    clearCart();
                    window.location.href = `/order/success?id=${order.id}`;
                },
                prefill: {
                    name: data.name,
                    email: data.email,
                    contact: data.mobile
                },
                theme: { color: "#000000" }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            alert('Payment failed to initiate');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <Navbar />

            <section className="pt-32 pb-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Form */}
                        <div className="lg:w-2/3 space-y-12">
                            <div className="space-y-4">
                                <span className="text-sm font-bold uppercase tracking-widest opacity-40">Secure Step</span>
                                <h1 className="text-6xl font-black tracking-tighter">CHECKOUT</h1>
                            </div>

                            <form onSubmit={handleSubmit(handlePayment)} className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest opacity-40 flex items-center gap-2">
                                            <User size={14} /> Full Name
                                        </label>
                                        <input
                                            {...register('name')}
                                            className="w-full bg-black/5 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium"
                                            placeholder="Jane Doe"
                                        />
                                        {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest opacity-40 flex items-center gap-2">
                                            <Phone size={14} /> Mobile (WhatsApp)
                                        </label>
                                        <input
                                            {...register('mobile')}
                                            className="w-full bg-black/5 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium"
                                            placeholder="9876543210"
                                        />
                                        {errors.mobile && <p className="text-xs text-red-500 font-bold">{errors.mobile.message}</p>}
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest opacity-40 flex items-center gap-2">
                                            <Mail size={14} /> Email Address
                                        </label>
                                        <input
                                            {...register('email')}
                                            className="w-full bg-black/5 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium"
                                            placeholder="jane@example.com"
                                        />
                                        {errors.email && <p className="text-xs text-red-500 font-bold">{errors.email.message}</p>}
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest opacity-40 flex items-center gap-2">
                                            <MapPin size={14} /> Full Address
                                        </label>
                                        <textarea
                                            {...register('address')}
                                            className="w-full bg-black/5 border-none rounded-3xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium min-h-[120px]"
                                            placeholder="House No, Street, Landmark..."
                                        />
                                        {errors.address && <p className="text-xs text-red-500 font-bold">{errors.address.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest opacity-40">Pincode</label>
                                        <input
                                            {...register('pincode')}
                                            className="w-full bg-black/5 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium"
                                            placeholder="600001"
                                        />
                                        {errors.pincode && <p className="text-xs text-red-500 font-bold">{errors.pincode.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest opacity-40">City</label>
                                        <input
                                            {...register('city')}
                                            readOnly
                                            className="w-full bg-black/5 border-none rounded-2xl py-4 px-6 opacity-60 cursor-not-allowed font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full text-xl shadow-2xl"
                                        disabled={loading || cart.length === 0}
                                    >
                                        {loading ? 'Processing...' : `Pay ₹${subtotal} Securely`}
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Sidebar Summary */}
                        <div className="lg:w-1/3">
                            <div className="sticky top-32 bg-black/5 rounded-[3rem] p-12 space-y-8 border border-black/5">
                                <h3 className="text-2xl font-black tracking-tighter italic">ORDER ITEMS</h3>

                                <div className="space-y-6">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center text-sm font-bold">
                                            <span className="opacity-60">{item.name} x {item.quantity}</span>
                                            <span>₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8 border-t border-black/10 flex justify-between items-end">
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-1">Total Amount</p>
                                        <p className="text-4xl font-black italic">₹{subtotal}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 p-6 bg-black rounded-3xl text-white">
                                    <Truck size={24} className="shrink-0" />
                                    <p className="text-xs font-medium leading-relaxed opacity-60">
                                        Your order will be shipped within 24-48 hours via our premium delivery partners.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
