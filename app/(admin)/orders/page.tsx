'use client';

import React, { useState, useEffect } from 'react';
import { getOrders, deleteOrder } from '@/lib/actions';
import { Trash2, Eye, Truck, Package, Search, Filter } from 'lucide-react';
import OrderDetailsModal from '@/components/admin/OrderDetailsModal';

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const data = await getOrders();
            setOrders(data || []);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            await deleteOrder(id);
            loadOrders();
        }
    };

    const handleViewDetails = (order: any) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const formatDate = (date: any) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-100 pb-10">
                <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Order Processing</span>
                    <h1 className="text-5xl font-bold tracking-tight text-dark uppercase">Recent <span className="text-accent underline underline-offset-8">Orders.</span></h1>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/20" size={16} />
                        <input
                            placeholder="Find an order..."
                            className="w-full h-12 pl-11 pr-6 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-accent/20 transition-all font-bold"
                        />
                    </div>
                    <button className="h-12 px-6 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-dark/40 hover:text-dark hover:border-dark/10 transition-all group">
                        <Filter size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="py-40 text-center space-y-4">
                    <div className="w-10 h-10 border-2 border-dark border-t-accent rounded-full animate-spin mx-auto" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-dark/30">Syncing database...</p>
                </div>
            ) : (
                <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-dark/40">Order Hash</th>
                                    <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-dark/40">Customer</th>
                                    <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-dark/40 text-center">Payment ID</th>
                                    <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-dark/40 text-center">Status</th>
                                    <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-dark/40 text-right">Total</th>
                                    <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-dark/40 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-dark uppercase tracking-tight">#{order.id}</span>
                                                <span className="text-[9px] font-bold text-dark/20 uppercase tracking-widest mt-1">{formatDate(order.createdAt)}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-dark uppercase">{order.customerName}</span>
                                                <span className="text-[9px] font-bold text-dark/30 lowercase tracking-widest mt-1">{order.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-center">
                                            <span className="text-[10px] font-mono font-bold text-accent/60 px-3 py-1 bg-accent/5 rounded-lg border border-accent/10">{order.razorpayPaymentId || 'N/A'}</span>
                                        </td>
                                        <td className="px-10 py-8 text-center">
                                            <div className="flex justify-center">
                                                <span className={cn(
                                                    "px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border",
                                                    order.status === 'Completed' ? "bg-green-50 text-green-600 border-green-100" : "bg-amber-50 text-amber-600 border-amber-100"
                                                )}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <span className="text-sm font-bold text-dark">₹{order.totalAmount}</span>
                                        </td>
                                        <td className="px-10 py-8 text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => handleViewDetails(order)}
                                                    className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-dark/40 hover:text-dark hover:shadow-lg transition-all"
                                                    title="View Details"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-dark/40 hover:text-[#C5890E] hover:shadow-lg transition-all"
                                                    title="Logistics"
                                                >
                                                    <Truck size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(order.id)}
                                                    className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-dark/40 hover:text-red-500 hover:shadow-lg transition-all"
                                                    title="Remove Order"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {orders.length === 0 && (
                        <div className="py-24 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                                <Package className="text-dark/10 w-8 h-8" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-dark/30 uppercase tracking-widest">No orders recorded yet</p>
                                <p className="text-[10px] font-bold text-dark/10 uppercase tracking-[0.2em]">Synchronization active</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <OrderDetailsModal
                order={selectedOrder}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
