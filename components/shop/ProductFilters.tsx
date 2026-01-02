'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function ProductFilters({ search, setSearch, activeCategory, setActiveCategory, categories }: any) {
    return (
        <div className="flex flex-col md:flex-row gap-8 w-full items-center justify-center">
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
                <div className="relative flex items-center bg-white border-b border-dark/10 group focus-within:border-accent transition-all">
                    <Search className="text-dark/20" size={14} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Products..."
                        className="w-full h-12 pl-4 pr-4 text-[10px] font-bold text-dark outline-none bg-transparent placeholder:text-dark/10 uppercase tracking-[0.2em]"
                    />
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar max-w-full pb-1">
                {categories.map((cat: string) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                            "text-[10px] font-extrabold uppercase tracking-[0.2em] transition-all whitespace-nowrap pb-2 border-b-2",
                            activeCategory === cat
                                ? "text-dark border-dark"
                                : "text-dark/20 border-transparent hover:text-dark/40"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
