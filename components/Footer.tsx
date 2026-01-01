import Link from 'next/link';
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold tracking-tighter">HANDYMAN</h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Empowering women through hygienic, home-based snack production.
                            Taste the heart in every bite.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
                            <li><Link href="/story" className="hover:text-white transition-colors">Our Story</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li className="flex items-center gap-3">
                                <MapPin size={16} /> 7/23, Baba Nagar, Pappampatti, Coimbatore
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} /> +91 9042387152
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={16} /> handyman.tech.in@gmail.com
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-xs text-white/40">
                    <p>© {new Date().getFullYear()} Handyman Technologies. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
