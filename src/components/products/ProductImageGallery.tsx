"use client";

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  productName: string;
  defaultImage: string;
  additionalImages?: string[];
  dataAiHint?: string;
}

export default function ProductImageGallery({ 
  productName, 
  defaultImage, 
  additionalImages = [],
  dataAiHint 
}: ProductImageGalleryProps) {
  const allImages = [defaultImage, ...additionalImages];
  const [currentImage, setCurrentImage] = useState(defaultImage);

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square w-full relative overflow-hidden rounded-lg shadow-lg border bg-card">
        <Image
          src={currentImage}
          alt={`Main image of ${productName}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain transition-opacity duration-300 ease-in-out"
          priority // Prioritize loading main image
          data-ai-hint={dataAiHint || "product image"}
        />
      </div>
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(img)}
              className={cn(
                "aspect-square relative overflow-hidden rounded-md border-2 transition-all duration-200",
                currentImage === img ? "border-primary shadow-md scale-105" : "border-transparent hover:border-primary/50"
              )}
              aria-label={`View image ${index + 1} of ${productName}`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1} of ${productName}`}
                fill
                sizes="10vw"
                className="object-cover"
                data-ai-hint={dataAiHint || "product thumbnail"}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
