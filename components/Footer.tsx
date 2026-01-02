'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white text-dark pt-32 pb-20 border-t border-gray-100 px-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2 space-y-12">
                        <Link href="/" className="group">
                            <span className="text-4xl font-black tracking-[-0.1em] text-dark uppercase flex flex-col leading-none">
                                <span className="text-xs tracking-[0.4em] mb-2 text-accent">Handyman</span>
                                <span>Technologies</span>
                            </span>
                        </Link>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-dark/30 max-w-md leading-loose">
                            Redefining the standard of premium Indian snacks.
                            Built on tradition, evolved for excellence.
                        </p>

                        <div className="flex items-center gap-10">
                            {['Instagram', 'Twitter', 'LinkedIn'].map((app) => (
                                <a key={app} href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark/30 hover:text-dark transition-colors">
                                    {app}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-10">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">Quick Links</h4>
                        <ul className="space-y-6">
                            {['Shop All', 'Collections', 'Sustainability', 'Our Story'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark/30 hover:text-dark transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact/Newsletter */}
                    <div className="space-y-10">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">Newsletter</h4>
                        <div className="space-y-8">
                            <div className="relative group border-b border-dark/10 focus-within:border-dark transition-all">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-transparent py-4 text-[10px] font-bold uppercase tracking-[0.2em] outline-none placeholder:text-dark/10"
                                />
                                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark transition-all">
                                    Subscribe →
                                </button>
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-dark/20">
                                Be the first to know about new arrivals.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-32 pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-10">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-dark/10">
                        &copy; 2024 Handyman Technologies Ltd.
                    </p>
                    <div className="flex gap-10 text-[9px] font-bold uppercase tracking-[0.3em] text-dark/10">
                        <Link href="#" className="hover:text-dark transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-dark transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
