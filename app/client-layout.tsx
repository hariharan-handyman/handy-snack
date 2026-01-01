'use client';

import RootLayout from "@/app/layout";
import { CartProvider } from "@/context/CartContext";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CartProvider>
            {children}
        </CartProvider>
    );
}
