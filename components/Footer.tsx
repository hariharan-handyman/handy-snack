import Link from 'next/link';
import { Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-dark text-white pt-24 pb-12 overflow-hidden relative">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                                <span className="text-white font-black italic">HM</span>
                            </div>
                            <span className="text-2xl font-black italic tracking-tighter">HANDYMAN</span>
                        </Link>
                        <p className="text-white/50 text-sm leading-relaxed max-w-xs font-medium">
                            Crafting the finest handmade snacks with love and tradition.
                            Empowering women, one bite at a time.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-primary">Discover</h4>
                        <ul className="space-y-4 text-sm font-bold text-white/50">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/shop" className="hover:text-white transition-colors">Shop Snacks</Link></li>
                            <li><Link href="/story" className="hover:text-white transition-colors">Our Journey</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">Help Center</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-secondary">Connect</h4>
                        <ul className="space-y-4 text-sm font-medium text-white/50">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-accent shrink-0" />
                                <span>7/23, Baba Nagar, Pappampatti, Coimbatore</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-accent shrink-0" />
                                <span>+91 9042387152</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-accent shrink-0" />
                                <span>handyman.tech.in@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-accent">Join Us</h4>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Newsletter</p>
                            <div className="flex gap-2">
                                <input type="text" placeholder="Your email" className="bg-transparent text-xs font-bold outline-none flex-1" />
                                <button className="text-accent hover:text-white transition-colors"><ArrowRight size={16} /></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
                        © {new Date().getFullYear()} Handyman Technologies. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/20">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
