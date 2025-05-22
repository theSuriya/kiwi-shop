"use client";

import { Button } from '@/components/ui/button';
import type { ProductCategory } from '@/types';
import { ALL_CATEGORIES } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryFiltersProps {
  selectedCategory: ProductCategory | null;
  onSelectCategory: (category: ProductCategory | null) => void;
}

export default function CategoryFilters({ selectedCategory, onSelectCategory }: CategoryFiltersProps) {
  const categories: (ProductCategory | null)[] = [null, ...ALL_CATEGORIES]; // Add "All" option

  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      {categories.map((category, index) => (
        <Button
          key={index}
          variant={selectedCategory === category ? 'default' : 'outline'}
          onClick={() => onSelectCategory(category)}
          className={cn(
            "transition-all duration-200 ease-in-out transform hover:scale-105",
            selectedCategory === category ? "bg-primary text-primary-foreground shadow-md" : "bg-card" 
            // hover:bg-accent hover:text-accent-foreground removed as 'outline' variant now handles light blue hover
          )}
        >
          {category === null ? 'All Products' : category}
        </Button>
      ))}
    </div>
  );
}
