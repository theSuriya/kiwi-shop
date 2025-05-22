"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/types';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addFavorite, removeFavorite, isFavorite, isLoaded } = useFavorites();
  const { toast } = useToast();

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if card is wrapped in Link
    e.stopPropagation();
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
      toast({ title: `${product.name} removed from favorites.` });
    } else {
      addFavorite(product);
      toast({ title: `${product.name} added to favorites!`, variant: 'default' });
    }
  };

  const favoriteStatus = isLoaded && isFavorite(product.id);

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col h-full rounded-lg border">
      <Link href={`/products/${product.id}`} className="block group" aria-label={`View details for ${product.name}`}>
        <CardHeader className="p-0">
          <div className="aspect-[4/3] overflow-hidden relative">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={product.dataAiHint || product.category.toLowerCase()}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold mb-1 truncate group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">
            {product.description.substring(0, 60)}...
          </p>
          <p className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        <Link href={`/checkout?productId=${product.id}`} className="w-full sm:w-auto flex-grow" passHref legacyBehavior>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors flex items-center gap-2" size="sm">
            <ShoppingCart size={18} /> Buy Now
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={handleFavoriteToggle}
          aria-pressed={favoriteStatus}
          className={cn(
            "w-full sm:w-auto transition-colors flex items-center gap-2",
            favoriteStatus ? "text-destructive border-destructive hover:bg-destructive/10" : "hover:bg-accent/10"
          )}
          disabled={!isLoaded}
        >
          <Heart size={18} className={cn(favoriteStatus && "fill-destructive")} /> 
          {favoriteStatus ? 'Favorited' : 'Favorite'}
        </Button>
      </CardFooter>
    </Card>
  );
}
