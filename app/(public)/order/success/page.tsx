'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('id');

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-2xl text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl"
                >
                    <CheckCircle size={48} className="text-white" />
                </motion.div>

                <div className="space-y-6 mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Transaction Verified</span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter leading-none">
                        ORDER COMPLETED<span className="text-primary text-8xl">.</span>
                    </h1>
                    <p className="text-dark/40 font-bold max-w-md mx-auto leading-relaxed">
                        Your craft is being prepared. We've synced your details with our warehouse via Shiprocket.
                    </p>
                </div>

                <div className="bg-white rounded-[2.5rem] p-10 border border-dark/5 shadow-2xl text-left space-y-8 relative overflow-hidden mb-12">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-2">Tracking Identification</p>
                        <p className="text-2xl font-black italic tracking-tight">{orderId || 'PROCESS-PENDING'}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-dark/5">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-dark/5 flex items-center justify-center text-dark">
                                <Truck size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-dark/30">Delivery</p>
                                <p className="text-xs font-black">2-4 Business Days</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-dark/5 flex items-center justify-center text-dark">
                                <ShoppingBag size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-dark/30">Confirmation</p>
                                <p className="text-xs font-black">Email Dispatched</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <Link href="/shop" className="w-full sm:w-auto">
                        <button className="w-full h-16 px-10 bg-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-primary transition-all flex items-center justify-center gap-3 group">
                            Continue Shopping
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                    <Link href="/" className="w-full sm:w-auto underline-offset-8 decoration-2 decoration-accent/30 hover:decoration-accent transition-all">
                        <span className="text-xs font-black uppercase tracking-widest italic">Return to Landing</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <Suspense fallback={
                <div className="pt-40 text-center animate-pulse text-xs font-black uppercase tracking-[0.5em]">
                    Finalizing Credentials...
                </div>
            }>
                <SuccessContent />
            </Suspense>
            <Footer />
        </main>
    );
}
