'use client';

import React from 'react';
import { Search } from 'lucide-react';

const CATEGORIES = ['All', 'Mixtures', 'Health', 'Baked'];

export default function ProductFilters({ search, setSearch, activeCategory, setActiveCategory }: any) {
    return (
        <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto items-center">
            {/* Search Bar */}
            <div className="relative w-full md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search snacks..."
                    className="w-full bg-black/5 border-none rounded-full py-3 pl-12 pr-6 text-sm font-medium focus:ring-2 focus:ring-black outline-none transition-all"
                />
            </div>

            {/* Category Tabs */}
            <div className="flex bg-black/5 p-1 rounded-full overflow-x-auto no-scrollbar max-w-full">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-black text-white shadow-lg' : 'text-black/40 hover:text-black'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
