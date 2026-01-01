'use client';

import React from 'react';

/**
 * ImageKit Loader for Next.js Image component
 */
export default function imageKitLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
    if (src.startsWith('http')) return src;

    const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
    const path = src.startsWith('/') ? src.substring(1) : src;

    const params = [`w-${width}`];
    if (quality) {
        params.push(`q-${quality}`);
    }
    params.push('f-auto');

    return `${endpoint}/${path}?tr=${params.join(',')}`;
}
