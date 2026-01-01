'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Users, AlertCircle, Calendar } from 'lucide-react';

const stats = [
    { name: 'Total Revenue', value: '₹1,24,500', icon: TrendingUp, change: '+12% from last week' },
    { name: 'Orders Today', value: '42', icon: ShoppingBag, change: '8 pending shipment' },
    { name: 'Active Customers', value: '850', icon: Users, change: '15 new today' },
    { name: 'Low Stock', value: '3 Items', icon: AlertCircle, change: 'Requires attention', urgent: true },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-3">
                    <span className="text-xs font-black uppercase tracking-widest opacity-30 italic">Handyman Technologies</span>
                    <h1 className="text-4xl font-black tracking-tighter italic">DASHBOARD</h1>
                </div>

                <div className="flex items-center gap-4 bg-black/5 p-2 rounded-2xl border border-black/5">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm text-xs font-bold italic">
                        <Calendar size={14} className="opacity-40" />
                        <span>Filter Range:</span>
                        <select className="bg-transparent border-none outline-none focus:ring-0 cursor-pointer">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>This Month</option>
                            <option>This Year</option>
                            <option>Custom Range</option>
                        </select>
                    </div>
                    <div className="text-right pr-4 border-l border-black/10 transition-all hidden md:block">
                        <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest leading-none mb-1">Current Date</p>
                        <p className="text-sm font-black italic">{new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid - 2x2 */}
            <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-8 rounded-[3rem] bg-black/5 border border-transparent hover:border-black/5 transition-all group flex flex-col`}
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${stat.urgent ? 'bg-red-500 text-white' : 'bg-black text-white'}`}>
                            <stat.icon size={20} />
                        </div>
                        <p className="text-xs font-bold opacity-40 uppercase tracking-widest mb-3">{stat.name}</p>
                        <h3 className="text-3xl md:text-4xl font-black italic mb-3 break-words">{stat.value}</h3>
                        <p className={`text-[10px] font-bold uppercase tracking-tight break-words ${stat.urgent ? 'text-red-500' : 'opacity-40'}`}>
                            {stat.change}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
                <div className="space-y-8">
                    <h3 className="text-2xl font-black tracking-tighter italic">RECENT ORDERS</h3>
                    <div className="bg-black/5 rounded-[3rem] p-10 min-h-[400px] border border-black/5">
                        <div className="space-y-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between pb-6 border-b border-black/5 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-xs font-black">#0{i}</div>
                                        <div>
                                            <p className="font-bold text-sm">Customer Name</p>
                                            <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">₹2,400 • 3 Items</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest rounded-full">Pending</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="text-2xl font-black tracking-tighter italic">INVENTORY ALERTS</h3>
                    <div className="bg-black/5 rounded-[3rem] p-10 border border-black/5 flex items-center justify-center">
                        <p className="text-sm font-bold opacity-20 uppercase tracking-widest">All systems nominal.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
