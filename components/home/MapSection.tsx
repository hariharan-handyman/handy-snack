'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function MapSection() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="rounded-[3rem] overflow-hidden bg-black/5 p-4 md:p-8 flex flex-col lg:flex-row gap-8 min-h-[600px]">
                    <div className="lg:w-1/3 flex flex-col justify-center p-8 space-y-12">
                        <div>
                            <h2 className="text-4xl font-black tracking-tighter mb-4">FIND US</h2>
                            <p className="text-black/60 font-medium italic">Visit our headquarters or reach out for bulk orders.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold">Address</h4>
                                    <p className="text-sm opacity-60">7/23, behind Chenthoor Nagar, Baba Nagar, Pappampatti, Coimbatore, Tamil Nadu 641016</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold">Phone</h4>
                                    <p className="text-sm opacity-60">+91 XXXXXXXXXX</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold">Email</h4>
                                    <p className="text-sm opacity-60">info@handyman.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 h-[400px] lg:h-auto rounded-[2.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.4716484392474!2d77.0621376!3d10.9829378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859f979720475%3A0xc02e4d077c98030!2sBaba%20Nagar%2C%20Pappampatti%2C%20Tamil%20Nadu%20641016!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
