"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard';
import CategoryFilters from '@/components/products/CategoryFilters';
import { products as allProductsStatic } from '@/lib/products';
import type { Product, ProductCategory } from '@/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as ProductCategory | null;
  const initialSearchTerm = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Update state if query params change after initial load
    setSelectedCategory(searchParams.get('category') as ProductCategory | null);
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);


  const filteredProducts = useMemo(() => {
    let productsToFilter: Product[] = allProductsStatic;

    if (selectedCategory) {
      productsToFilter = productsToFilter.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      productsToFilter = productsToFilter.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return productsToFilter;
  }, [selectedCategory, searchTerm]);

  if (!mounted) {
     // Optional: Render a loading state or null to avoid hydration issues with searchParams
    return <div className="text-center py-10">Loading products...</div>;
  }

  return (
    <div className="space-y-10">
      <section className="text-center py-8 bg-card rounded-lg shadow-md">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Discover Our Collection</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse through our wide range of high-quality sports products.
        </p>
      </section>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        <div className="relative w-full md:flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-3 w-full rounded-lg border-2 focus:border-primary transition-colors"
            aria-label="Search products"
          />
        </div>
      </div>
      
      <CategoryFilters
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
          <p className="mt-2 text-sm">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}
