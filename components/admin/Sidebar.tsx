'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, List, ClipboardList, Settings, LogOut } from 'lucide-react';

const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/products', icon: ShoppingBag },
    { name: 'Categories', href: '/categories', icon: List },
    { name: 'Orders', href: '/orders', icon: ClipboardList },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-80 h-screen sticky top-0 bg-black text-white p-12 flex flex-col justify-between shrink-0">
            <div className="space-y-16">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter italic">HANDYMAN</h2>
                    <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest mt-1">Admin Dashboard</p>
                </div>

                <nav className="space-y-8">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-4 text-sm font-bold tracking-tight transition-all hover:translate-x-2 ${pathname === item.href ? 'text-white' : 'text-white/40 hover:text-white'}`}
                        >
                            <item.icon size={20} />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            <button className="flex items-center gap-4 text-sm font-bold text-red-500 hover:text-red-400 transition-all">
                <LogOut size={20} /> Logout
            </button>
        </aside>
    );
}
