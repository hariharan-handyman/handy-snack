'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Firebase login logic here
        alert('Logging in...');
        window.location.href = '/dashboard';
    };

    return (
        <main className="min-h-screen bg-white flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-12"
            >
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-black tracking-tighter italic">ADMIN PORTAL</h1>
                    <p className="text-black/40 font-bold uppercase tracking-widest text-xs">Handyman Technologies</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/5 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium"
                            placeholder="admin@handyman.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/5 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none font-medium"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <Button type="submit" size="lg" className="w-full shadow-2xl">
                        Authorize Access
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-[10px] font-bold opacity-20 uppercase tracking-widest transition-opacity hover:opacity-100 cursor-default">
                        Secured by Firebase Admin SDK
                    </p>
                </div>
            </motion.div>
        </main>
    );
}
