'use client';

import React from 'react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
            <div className="container mx-auto px-6 flex flex-col items-center text-center space-y-16">
                {/* Text Content */}
                <div className="max-w-4xl space-y-12">
                    <div className="space-y-6">
                        <span className="text-[10px] font-bold uppercase text-accent tracking-[0.4em]">
                            Handmade Excellence
                        </span>
                        <h1 className="text-7xl md:text-[9.5rem] font-extrabold leading-[0.8] tracking-[-0.05em] uppercase text-dark">
                            Purity <span className="text-gray-100">Defined.</span>
                        </h1>
                    </div>

                    <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-dark/40 max-w-2xl mx-auto leading-loose">
                        Discover the essence of authentic Indian snacks. <br className="hidden md:block" />
                        Preserving tradition, crafted for the modern palate.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-6">
                        <Link href="/shop" className="w-full md:w-auto h-16 px-16 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent transition-all shadow-2xl flex items-center justify-center">
                            Shop Collection
                        </Link>
                        <Link href="/story" className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark/40 hover:text-dark border-b border-dark/10 pb-2 transition-all">
                            Our Story
                        </Link>
                    </div>
                </div>
            </div>

            {/* Background Texture/Accents */}
            <div className="absolute bottom-10 left-10 hidden lg:block">
                <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-dark/10 vertical-text pb-40">
                    Est. 2024 / Handyman Tech
                </div>
            </div>

            <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden lg:block">
                <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-dark/10 vertical-text pt-40 rotate-180">
                    Traditional Indian Craft
                </div>
            </div>
        </section>
    );
}
