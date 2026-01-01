import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createOrder } from '@/lib/actions';

export async function POST(req: Request) {
    try {
        const { amount, customer, items } = await req.json();

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.error('Razorpay API keys are missing');
            return NextResponse.json({ error: 'Payment configuration error' }, { status: 500 });
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amount * 100, // amount in the smallest currency unit (paise)
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                shipping_name: customer.name,
                shipping_address: customer.address,
                shipping_city: customer.city,
                shipping_mobile: customer.mobile,
                shipping_pincode: customer.pincode,
                shipping_email: customer.email,
                items_summary: items.map((i: any) => `${i.name} x${i.quantity}`).join(', ')
            }
        };

        const order = await razorpay.orders.create(options);

        // Save locally as pending - matching schema.ts jsonb/decimal structure
        await createOrder({
            userData: {
                name: customer.name,
                email: customer.email,
                mobile: customer.mobile,
                address: customer.address,
                pincode: customer.pincode,
                city: customer.city,
                state: customer.state
            },
            items: items, // Drizzle handles object to jsonb
            total: amount.toString(),
            status: 'pending',
            razorpayOrderId: order.id
        });

        return NextResponse.json(order);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
