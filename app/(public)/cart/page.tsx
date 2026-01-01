'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-32 pb-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Cart Items */}
                        <div className="lg:w-2/3 space-y-12">
                            <div className="space-y-4">
                                <span className="text-sm font-bold uppercase tracking-widest opacity-40">Your Selection</span>
                                <h1 className="text-6xl font-black tracking-tighter">THE CART</h1>
                            </div>

                            {cart.length === 0 ? (
                                <div className="py-24 text-center space-y-8 bg-black/5 rounded-[3rem] border border-dashed border-black/10">
                                    <div className="flex justify-center">
                                        <ShoppingBag size={80} className="opacity-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold opacity-30">Your cart is currently empty.</h3>
                                    <Link href="/shop" className="inline-block">
                                        <Button variant="primary" size="lg">Start Shopping</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <AnimatePresence>
                                        {cart.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className="flex flex-col sm:flex-row items-center gap-8 p-8 bg-black/5 rounded-[2.5rem] relative group border border-transparent hover:border-black/5 transition-all"
                                            >
                                                <div className="w-32 h-32 rounded-3xl bg-black/10 flex items-center justify-center text-black/20 font-black italic text-xs uppercase p-4 rotate-[-10deg] group-hover:rotate-0 transition-transform">
                                                    {item.category}
                                                </div>

                                                <div className="flex-1 space-y-2 text-center sm:text-left">
                                                    <h3 className="text-xl font-bold">{item.name}</h3>
                                                    <p className="font-medium text-black/40">₹{item.price}/kg</p>
                                                </div>

                                                <div className="flex items-center gap-6 bg-white rounded-full px-6 py-3 shadow-sm">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-orange-500 transition-colors">
                                                        <Minus size={18} />
                                                    </button>
                                                    <span className="font-black w-8 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-orange-500 transition-colors">
                                                        <Plus size={18} />
                                                    </button>
                                                </div>

                                                <div className="text-center sm:text-right min-w-[100px]">
                                                    <p className="text-xl font-black italic">₹{item.price * item.quantity}</p>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="sm:absolute sm:top-6 sm:right-6 text-black/20 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* Price Summary */}
                        {cart.length > 0 && (
                            <div className="lg:w-1/3">
                                <div className="sticky top-32 bg-black text-white rounded-[3rem] p-12 space-y-8 shadow-2xl overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                    <h3 className="text-2xl font-black tracking-tighter italic">SUMMARY</h3>

                                    <div className="space-y-4">
                                        <div className="flex justify-between text-white/60">
                                            <span>Subtotal</span>
                                            <span className="text-white font-bold">₹{subtotal}</span>
                                        </div>
                                        <div className="flex justify-between text-white/60">
                                            <span>Shipping</span>
                                            <span className="text-white font-bold">Calculated at checkout</span>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Total</p>
                                            <p className="text-5xl font-black italic">₹{subtotal}</p>
                                        </div>
                                    </div>

                                    <Link href="/checkout" className="block pt-4">
                                        <Button variant="secondary" size="lg" className="w-full text-lg">
                                            Secure Checkout
                                        </Button>
                                    </Link>

                                    <Link href="/shop" className="flex items-center justify-center gap-2 text-white/40 text-sm hover:text-white transition-colors pt-4">
                                        <ArrowLeft size={16} /> Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
