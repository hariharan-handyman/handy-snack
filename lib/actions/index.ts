'use server';

import { db } from '@/lib/db';
import { products, categories, orders } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Categories
export async function getCategories() {
    return await db.select().from(categories);
}

export async function createCategory(data: any) {
    const res = await db.insert(categories).values(data).returning();
    revalidatePath('/categories');
    return res[0];
}

export async function updateCategory(id: number, data: any) {
    const res = await db.update(categories).set(data).where(eq(categories.id, id)).returning();
    revalidatePath('/categories');
    return res[0];
}

export async function deleteCategory(id: number) {
    await db.delete(categories).where(eq(categories.id, id));
    revalidatePath('/categories');
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

export async function updateProduct(id: number, data: any) {
    const res = await db.update(products).set(data).where(eq(products.id, id)).returning();
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

export async function createOrder(data: any) {
    const res = await db.insert(orders).values(data).returning();
    revalidatePath('/dashboard');
    return res[0];
}
