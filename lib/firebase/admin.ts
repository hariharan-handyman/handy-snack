import admin from 'firebase-admin';

const hasAdminConfig = process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY;

if (!admin.apps.length && hasAdminConfig) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
}

export const adminAuth = (admin.apps.length ? admin.auth() : null) as any;
export const adminDb = (admin.apps.length ? admin.firestore() : null) as any;
