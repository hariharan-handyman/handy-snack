'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const CATEGORIES = ['All', 'Mixtures', 'Health', 'Baked'];

export default function ProductFilters({ search, setSearch, activeCategory, setActiveCategory }: any) {
    return (
        <div className="flex flex-col md:flex-row gap-8 w-full lg:w-auto items-center">
            {/* Search Bar */}
            <div className="relative w-full md:w-72 group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center bg-white border border-dark/5 rounded-2xl shadow-sm overflow-hidden transition-all group-focus-within:border-primary">
                    <Search className="ml-5 text-dark/30" size={18} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Look for a snack..."
                        className="w-full h-14 pl-4 pr-6 text-sm font-bold text-dark outline-none bg-transparent placeholder:text-dark/20"
                    />
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex bg-white border border-dark/5 p-2 rounded-2xl shadow-sm overflow-x-auto no-scrollbar max-w-full">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                            "px-8 h-10 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap",
                            activeCategory === cat
                                ? "bg-dark text-white shadow-xl translate-y-[-2px]"
                                : "text-dark/40 hover:text-dark hover:bg-dark/5"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
