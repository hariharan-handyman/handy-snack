'use client';

import React from 'react';
import { X, Package, Truck, CreditCard, User, MapPin, Calendar, ExternalLink } from 'lucide-react';

interface OrderDetailsModalProps {
    order: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
    if (!isOpen || !order) return null;

    const formatDate = (date: any) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest rounded-full">Order Details</span>
                            <span className="text-dark/20 text-xs font-bold uppercase tracking-widest">#{order.id}</span>
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-dark">Order Information</h2>
                    </div>
                    <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-dark/40 hover:text-dark hover:shadow-lg transition-all">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Customer Information */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-dark">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                    <User size={18} className="text-dark/40" />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-widest">Customer Details</h3>
                            </div>
                            <div className="bg-gray-50 rounded-3xl p-6 space-y-4 border border-gray-100/50">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-dark/30 uppercase tracking-widest">Name</span>
                                    <span className="font-bold text-dark uppercase">{order.customerName}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-dark/30 uppercase tracking-widest">Phone</span>
                                    <span className="font-bold text-dark">{order.phone}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-dark/30 uppercase tracking-widest">Email</span>
                                    <span className="font-bold text-dark">{order.email || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-dark/30 uppercase tracking-widest">Date</span>
                                    <span className="font-bold text-dark">{formatDate(order.createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment & Shipping Status */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-dark">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                    <CreditCard size={18} className="text-dark/40" />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-widest">Order Status</h3>
                            </div>
                            <div className="bg-gray-50 rounded-3xl p-6 space-y-4 border border-gray-100/50">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-dark/30 uppercase tracking-widest">Payment ID</span>
                                    <span className="font-bold text-accent font-mono">{order.razorpayPaymentId || 'PENDING'}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-dark/30 uppercase tracking-widest">Status</span>
                                    <span className={cn(
                                        "px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border",
                                        order.status === 'Completed' ? "bg-green-50 text-green-600 border-green-100" : "bg-amber-50 text-amber-600 border-amber-100"
                                    )}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-dark/30 uppercase tracking-widest">Total Amount</span>
                                    <span className="text-lg font-bold text-dark">₹{order.totalAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-dark">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                <MapPin size={18} className="text-dark/40" />
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-widest">Shipping Address</h3>
                        </div>
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100/50">
                            <p className="text-sm font-bold leading-relaxed text-dark leading-loose tracking-wide">
                                {order.address}
                            </p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-dark">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                <Package size={18} className="text-dark/40" />
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-widest">Cart Items</h3>
                        </div>
                        <div className="overflow-hidden border border-gray-100 rounded-3xl">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-dark/40">Product</th>
                                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-dark/40">Price</th>
                                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-dark/40">Qty</th>
                                        <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-dark/40 text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {order.items?.map((item: any, idx: number) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                                                    </div>
                                                    <span className="text-xs font-bold text-dark uppercase">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-xs font-bold text-dark/60">₹{item.price}</td>
                                            <td className="px-8 py-6 text-xs font-bold text-dark/60">{item.quantity}</td>
                                            <td className="px-8 py-6 text-xs font-bold text-dark text-right">₹{item.price * item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Tracking Info */}
                    {order.trackingLink && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-dark">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                    <Truck size={18} className="text-dark/40" />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-widest">Logistics</h3>
                            </div>
                            <a
                                href={order.trackingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-8 bg-accent/5 border border-accent/20 rounded-3xl group hover:bg-accent/10 transition-all"
                            >
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Shiprocket Tracking</p>
                                    <p className="text-sm font-bold text-dark">Track shipment in real-time</p>
                                </div>
                                <ExternalLink size={20} className="text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-8 h-12 bg-dark text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl hover:bg-accent transition-all"
                    >
                        Close Window
                    </button>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
