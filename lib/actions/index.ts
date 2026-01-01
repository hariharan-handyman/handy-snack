'use server';

import { db } from '@/lib/db';
import { products, categories, orders } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Categories
export async function getCategories() {
    return await db.select().from(categories);
}

// Products
export async function getProducts() {
    return await db.select().from(products).orderBy(desc(products.createdAt));
}

export async function createProduct(data: any) {
    const res = await db.insert(products).values(data).returning();
    revalidatePath('/shop');
    revalidatePath('/products');
    return res[0];
}

export async function deleteProduct(id: number) {
    await db.delete(products).where(eq(products.id, id));
    revalidatePath('/shop');
    revalidatePath('/products');
}

// Orders
export async function getOrders() {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
}
