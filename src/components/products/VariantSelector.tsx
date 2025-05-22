"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ProductColor } from '@/types';
import { Check } from 'lucide-react';

interface VariantSelectorProps<T extends { id: string; name: string; [key: string]: any }> {
  label: string;
  variants: T[];
  selectedVariantId: string | undefined;
  onSelectVariant: (variantId: string) => void;
  variantRenderer?: (variant: T, isSelected: boolean) => React.ReactNode; // Custom renderer for variants
}

export default function VariantSelector<T extends { id: string; name: string; hex?: string }>({
  label,
  variants,
  selectedVariantId,
  onSelectVariant,
  variantRenderer,
}: VariantSelectorProps<T>) {
  
  if (!variants || variants.length === 0) return null;

  const defaultRenderer = (variant: T, isSelected: boolean) => {
    if (variant.hex) { // Specifically for colors
      return (
        <Button
          key={variant.id}
          variant="outline"
          size="icon"
          onClick={() => onSelectVariant(variant.id)}
          className={cn(
            "h-10 w-10 rounded-full border-2 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus:ring-primary",
            isSelected ? 'border-primary scale-110 shadow-md' : 'border-muted-foreground/50 hover:border-primary/70'
          )}
          style={{ backgroundColor: variant.hex }}
          aria-label={`Select color ${variant.name}`}
          aria-pressed={isSelected}
          title={variant.name}
        >
          {isSelected && <Check className="h-5 w-5 text-white mix-blend-difference" />}
        </Button>
      );
    }
    // Default for other variants (e.g., size)
    return (
      <Button
        key={variant.id}
        variant={isSelected ? 'default' : 'outline'}
        onClick={() => onSelectVariant(variant.id)}
        className="transition-colors duration-200"
        aria-pressed={isSelected}
      >
        {variant.name}
      </Button>
    );
  };

  const renderFunc = variantRenderer || defaultRenderer;

  return (
    <div>
      <h3 className="text-sm font-medium text-foreground mb-2">{label}:</h3>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => renderFunc(variant, selectedVariantId === variant.id))}
      </div>
    </div>
  );
}
