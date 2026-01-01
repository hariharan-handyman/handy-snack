'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Users, AlertCircle, Calendar } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const stats = [
    { name: 'Total Revenue', value: '₹1,24,500', icon: TrendingUp, change: '+12% from last week' },
    { name: 'Orders Today', value: '42', icon: ShoppingBag, change: '8 pending shipment' },
    { name: 'Active Customers', value: '850', icon: Users, change: '15 new today' },
    { name: 'Low Stock', value: '3 Items', icon: AlertCircle, change: 'Requires attention', urgent: true },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-12 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">System Intelligence</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter text-dark italic leading-none">
                        DASHBOARD<span className="text-primary text-6xl">.</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4 bg-white border border-dark/5 p-2 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 px-6 py-3 bg-dark rounded-xl text-[10px] font-black uppercase tracking-widest text-white">
                        <Calendar size={14} className="text-accent" />
                        <span>Filter:</span>
                        <select className="bg-transparent border-none outline-none focus:ring-0 cursor-pointer text-white">
                            <option className="bg-dark">Past 7 Days</option>
                            <option className="bg-dark">Past 30 Days</option>
                            <option className="bg-dark">This Month</option>
                            <option className="bg-dark">This Year</option>
                        </select>
                    </div>
                    <div className="text-right pr-6 pl-4 border-l border-dark/5 hidden lg:block">
                        <p className="text-[9px] font-black text-dark/20 uppercase tracking-[0.2em] mb-1">Live Feed</p>
                        <p className="text-sm font-black text-dark italic">{new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid - 2x2 - Premium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative h-64 p-10 rounded-[2.5rem] bg-white border border-dark/5 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    >
                        {/* Abstract Shape Overlay */}
                        <div className={cn(
                            "absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 transition-all group-hover:scale-150",
                            stat.urgent ? "bg-red-500/10" : "bg-primary/10"
                        )} />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl",
                                    stat.urgent ? "bg-red-500 text-white" : "bg-dark text-white group-hover:bg-primary"
                                )}>
                                    <stat.icon size={24} />
                                </div>
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                                    stat.urgent ? "bg-red-500/10 text-red-500" : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
                                )}>
                                    {stat.change.split(' ')[0]}
                                </span>
                            </div>

                            <div>
                                <p className="text-[10px] font-black text-dark/30 uppercase tracking-[0.25em] mb-2">{stat.name}</p>
                                <h3 className="text-4xl lg:text-5xl font-black text-dark tracking-tighter italic leading-none truncate">
                                    {stat.value}
                                </h3>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black tracking-tighter text-dark underline decoration-primary decoration-4 underline-offset-8">RECENT SALES</h3>
                        <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:text-secondary">View Report</button>
                    </div>
                    <div className="bg-white rounded-[2.5rem] p-10 border border-dark/5 shadow-sm">
                        <div className="space-y-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-dark/5 flex items-center justify-center text-xs font-black group-hover:bg-primary group-hover:text-white transition-colors">#0{i}</div>
                                        <div>
                                            <p className="font-black text-dark tracking-tight">Rajesh Kumar</p>
                                            <p className="text-[9px] font-bold text-dark/30 uppercase tracking-widest mt-1">₹2,400 • COIMBATORE</p>
                                        </div>
                                    </div>
                                    <span className="px-4 py-1.5 bg-accent/10 text-accent text-[9px] font-black uppercase tracking-widest rounded-full">Processing</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="text-2xl font-black tracking-tighter text-dark underline decoration-secondary decoration-4 underline-offset-8">ALERTS</h3>
                    <div className="bg-dark p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                            <AlertCircle size={32} className="text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white uppercase tracking-[0.2em]">Efficiency Analysis</p>
                            <p className="text-[10px] font-medium text-white/40 mt-2 max-w-[200px]">Optimal patterns detected across all production lines.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
