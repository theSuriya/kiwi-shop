
"use client";

import ProductCard from '@/components/products/ProductCard';
import { useFavorites } from '@/contexts/FavoritesContext'; // Updated import
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HeartCrack, ShoppingBag } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading favorites...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Your Favorite Items</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Here are the products you've saved. Ready to make them yours?
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-lg shadow-md">
          <HeartCrack className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold text-foreground mb-3">No Favorites Yet!</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any products to your favorites.
          </p>
          <Link href="/products" passHref legacyBehavior>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
              <ShoppingBag className="mr-2 h-5 w-5" /> Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
