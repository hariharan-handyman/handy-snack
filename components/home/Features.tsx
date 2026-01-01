'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Users, Leaf } from 'lucide-react';

const features = [
    {
        title: 'Women Empowerment',
        description: 'Empowering women across India through sustainable home-based production units.',
        icon: Users,
    },
    {
        title: 'FSSAI Hygienic',
        description: 'Strict adherence to safety standards. Hygiene in every step, from our home to yours.',
        icon: ShieldCheck,
    },
    {
        title: 'Pan-India Delivery',
        description: 'Fast and reliable shipping across the country, fetching the best flavors to your door.',
        icon: Truck,
    },
    {
        title: 'Health-Focused',
        description: 'Millet-based snacks and baked treats crafted for a healthier lifestyle.',
        icon: Leaf,
    },
];

export default function Features() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-3xl bg-black/5 hover:bg-black hover:text-white transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-black/5 group-hover:bg-white/10 flex items-center justify-center mb-6">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-sm opacity-60 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
