'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Truck, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const MOCK_ORDERS = [
    { id: 'ORD001', customer: 'Hari Haran', total: 1200, status: 'Shipped', date: '21 Oct, 2024' },
    { id: 'ORD002', customer: 'Jane Doe', total: 850, status: 'Pending', date: '22 Oct, 2024' },
    { id: 'ORD003', customer: 'John Smith', total: 3400, status: 'Delivered', date: '22 Oct, 2024' },
];

export default function AdminOrdersPage() {
    return (
        <div className="space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-4">
                    <span className="text-sm font-black uppercase tracking-widest opacity-30 italic">Management</span>
                    <h1 className="text-6xl font-black tracking-tighter italic">ORDERS</h1>
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="bg-black/5 border-none rounded-full py-4 pl-12 pr-6 text-sm font-bold focus:ring-2 focus:ring-black outline-none min-w-[280px]"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-black/5 rounded-[4rem] p-8 border border-black/5">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-black/5">
                                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest opacity-30">Order ID</th>
                                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest opacity-30">Customer</th>
                                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest opacity-30">Amount</th>
                                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest opacity-30">Date</th>
                                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest opacity-30">Status</th>
                                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-widest opacity-30 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_ORDERS.map((order) => (
                                <tr key={order.id} className="group hover:bg-black hover:text-white transition-all">
                                    <td className="px-8 py-8 font-black text-sm italic">{order.id}</td>
                                    <td className="px-8 py-8 font-bold text-sm tracking-tight">{order.customer}</td>
                                    <td className="px-8 py-8 font-black text-sm italic">₹{order.total}</td>
                                    <td className="px-8 py-8 text-xs font-bold opacity-60 group-hover:opacity-100 uppercase tracking-widest">{order.date}</td>
                                    <td className="px-8 py-8">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-green-500 text-white' :
                                            order.status === 'Shipped' ? 'bg-blue-500 text-white' :
                                                'bg-[#c5890e] text-white'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-8 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                                            <button title="View Details" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                                <Eye size={16} />
                                            </button>
                                            <button title="Mark Shipped" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
                                                <Truck size={16} />
                                            </button>
                                            <button title="Mark Delivered" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all">
                                                <CheckCircle size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
