'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, List, ClipboardList, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/products', icon: ShoppingBag },
    { name: 'Categories', href: '/categories', icon: List },
    { name: 'Orders', href: '/orders', icon: ClipboardList },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <aside className="w-72 h-screen sticky top-0 bg-dark text-white p-8 flex flex-col justify-between shrink-0 overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

            <div className="space-y-12 relative z-10">
                <Link href="/" className="hover:scale-105 transition-transform flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-black italic">HM</span>
                    </div>
                    <div>
                        <span className="text-xl font-black italic tracking-tighter block leading-none">HANDYMAN</span>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mt-1 block">Admin Core</span>
                    </div>
                </Link>

                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-5 py-4 text-sm font-bold tracking-tight rounded-2xl transition-all group",
                                pathname === item.href
                                    ? "bg-white/10 text-white shadow-xl border border-white/10"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon size={18} className={cn(
                                "transition-colors",
                                pathname === item.href ? "text-primary" : "text-inherit group-hover:text-primary"
                            )} />
                            {item.name}
                            {pathname === item.href && (
                                <motion.div layoutId="activeNav" className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#FF9FF3]" />
                            )}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="space-y-4 relative z-10">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30">System Status</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#00D2D3]" />
                        <span className="text-xs font-bold text-white/60">Server Online</span>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-4 px-5 py-4 text-sm font-bold text-red-500 hover:text-red-400 hover:bg-red-500/5 transition-all rounded-2xl"
                >
                    <LogOut size={18} /> Logout
                </button>
            </div>
        </aside>
    );
}
