import { db } from './index';
import { categories, products } from './schema';

async function main() {
    console.log('Seeding started...');

    // 1. Clear existing (optional)
    // await db.delete(products);
    // await db.delete(categories);

    // 2. Insert Categories
    const catRes = await db.insert(categories).values([
        { name: 'Mixtures', slug: 'mixtures' },
        { name: 'Health Snacks', slug: 'health' },
        { name: 'Baked Treats', slug: 'baked' },
    ]).returning();

    const mixtureId = catRes.find(c => c.slug === 'mixtures')?.id;
    const healthId = catRes.find(c => c.slug === 'health')?.id;
    const bakedId = catRes.find(c => c.slug === 'baked')?.id;

    // 3. Insert Products
    await db.insert(products).values([
        {
            name: 'Madrasi Mixture',
            slug: 'madrasi-mixture',
            categoryId: mixtureId,
            description: 'A crunchy blend of omapodi, boondi, peanuts and traditional spices.',
            price: '220.00',
            stock: 50,
            images: ['https://ik.imagekit.io/dwrcmlcqk/mixtures/madrasi.jpg'],
            offer: true
        },
        {
            name: 'Corn Mixture',
            slug: 'corn-mixture',
            categoryId: mixtureId,
            description: 'Golden corn flakes tossed with peanuts and kadi patta.',
            price: '180.00',
            stock: 30,
            images: ['https://ik.imagekit.io/dwrcmlcqk/mixtures/corn.jpg'],
        },
        {
            name: 'Millet Cookies',
            slug: 'millet-cookies',
            categoryId: healthId,
            description: 'Ragi and Bajra mixed with jaggery for a healthy crunch.',
            price: '280.00',
            stock: 20,
            images: ['https://ik.imagekit.io/dwrcmlcqk/health/millet-cookies.jpg'],
        },
        {
            name: 'Roasted Makhana',
            slug: 'roasted-makhana',
            categoryId: healthId,
            description: 'Fox nuts roasted with rock salt and pepper.',
            price: '350.00',
            stock: 15,
            images: ['https://ik.imagekit.io/dwrcmlcqk/health/makhana.jpg'],
        },
        {
            name: 'Baked Namakpara',
            slug: 'baked-namakpara',
            categoryId: bakedId,
            description: 'Our signature whole wheat baked salt crackers.',
            price: '150.00',
            stock: 40,
            images: ['https://ik.imagekit.io/dwrcmlcqk/baked/namakpara.jpg'],
        }
    ]);

    console.log('Seeding finished successfully!');
}

main().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
