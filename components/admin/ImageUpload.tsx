'use client';

import React, { useState } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const authenticator = async () => {
    try {
        const response = await fetch('/api/imagekit-auth');
        if (!response.ok) throw new Error('Auth failed');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

interface ImageUploadProps {
    value: string[];
    onChange: (urls: string[]) => void;
    maxImages?: number;
}

export default function ImageUpload({ value = [], onChange, maxImages = 4 }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const onError = (err: any) => {
        console.error('Upload error:', err);
        setUploading(false);
    };

    const onSuccess = (res: any) => {
        onChange([...value, res.url]);
        setUploading(false);
    };

    const removeImage = (urlToRemove: string) => {
        onChange(value.filter((url) => url !== urlToRemove));
    };

    return (
        <IKContext
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {value.map((url) => (
                        <div key={url} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group">
                            <img src={url} alt="Product" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                            <button
                                onClick={() => removeImage(url)}
                                className="absolute top-2 right-2 w-8 h-8 bg-dark/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}

                    {value.length < maxImages && (
                        <div className={cn(
                            "relative aspect-square rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-3 transition-all",
                            uploading ? "bg-gray-50 opacity-50" : "hover:border-accent/40 hover:bg-accent/5"
                        )}>
                            {uploading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin text-accent" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-dark/40">Uploading...</span>
                                </>
                            ) : (
                                <>
                                    <Upload className="w-6 h-6 text-dark/20" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-dark/40">Add Image</span>
                                    <IKUpload
                                        fileName="product_image.png"
                                        tags={["product"]}
                                        useUniqueFileName={true}
                                        onError={onError}
                                        onSuccess={onSuccess}
                                        onUploadStart={() => setUploading(true)}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </>
                            )}
                        </div>
                    )}
                </div>

                {value.length === 0 && !uploading && (
                    <div className="p-12 border border-gray-100 rounded-3xl bg-gray-50 flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                            <ImageIcon className="text-dark/10 w-8 h-8" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark/30">Upload product images (Max {maxImages})</p>
                    </div>
                )}
            </div>
        </IKContext>
    );
}
