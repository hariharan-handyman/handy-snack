import { pgTable, serial, varchar, text, decimal, boolean, timestamp, jsonb, date } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    slug: text('slug').unique().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    slug: text('slug').unique().notNull(),
    categoryId: serial('category_id').references(() => categories.id),
    description: text('description').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    offer: boolean('offer').default(false).notNull(),
    stock: serial('stock').notNull(),
    images: text('images').array().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    userData: jsonb('user_data').notNull(), // { name, email, mobile, address, pincode, city, state }
    items: jsonb('items').notNull(), // Array<{ id, name, price, quantity, image }>
    total: decimal('total', { precision: 10, scale: 2 }).notNull(),
    status: varchar('status', { length: 20 }).default('pending').notNull(),
    razorpayOrderId: varchar('razorpay_order_id'),
    razorpayPaymentId: varchar('razorpay_payment_id'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const discounts = pgTable('discounts', {
    id: serial('id').primaryKey(),
    code: varchar('code', { length: 50 }).unique().notNull(),
    percent: serial('percent').notNull(),
    expiry: date('expiry').notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
