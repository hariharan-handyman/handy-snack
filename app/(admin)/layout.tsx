'use client';

import AdminSidebar from '@/components/admin/Sidebar';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user && pathname !== '/login') {
            router.push('/login');
        }
    }, [user, loading, pathname, router]);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <div className="text-xs font-black uppercase tracking-[0.5em] animate-pulse">Checking Authorization...</div>
            </div>
        );
    }

    if (!user && pathname !== '/login') return null;

    if (pathname === '/login') return <>{children}</>;

    return (
        <div className="flex bg-[#F8FAFC] min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8 lg:p-16 h-screen overflow-y-auto no-scrollbar">
                {children}
            </main>
        </div>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <ProtectedLayout>{children}</ProtectedLayout>
        </AuthProvider>
    );
}
