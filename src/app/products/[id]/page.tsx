
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getProductById } from '@/lib/products';
import type { Product, ProductColor } from '@/types';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext'; // Updated import
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import ProductImageGallery from '@/components/products/ProductImageGallery';
import VariantSelector from '@/components/products/VariantSelector';
import { cn } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { addFavorite, removeFavorite, isFavorite, isLoaded: favoritesLoaded } = useFavorites();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(undefined);
  const [currentImage, setCurrentImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (params.id) {
      const fetchedProduct = getProductById(params.id as string);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        const defaultCol = fetchedProduct.colors?.find(c => c.id === fetchedProduct.defaultColorId) || fetchedProduct.colors?.[0];
        setSelectedColor(defaultCol);
        setCurrentImage(defaultCol?.image || fetchedProduct.image);
      } else {
        router.push('/products'); 
      }
    }
  }, [params.id, router]);

  useEffect(() => {
    if (selectedColor && selectedColor.image) {
      setCurrentImage(selectedColor.image);
    } else if (product) {
      setCurrentImage(product.image);
    }
  }, [selectedColor, product]);


  if (!product || !favoritesLoaded) { // Ensure favorites are loaded before rendering actions
    return <div className="container mx-auto px-4 py-8 text-center">Loading product details...</div>;
  }

  const favoriteStatus = isFavorite(product.id);

  const handleFavoriteToggle = () => {
    if (favoriteStatus) {
      removeFavorite(product.id);
      toast({ title: `${product.name} removed from favorites.` });
    } else {
      addFavorite(product);
      toast({ title: `${product.name} added to favorites!`, variant: 'default' });
    }
  };

  const handleColorSelect = (colorId: string) => {
    const color = product.colors?.find(c => c.id === colorId);
    setSelectedColor(color);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-6 group">
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Products
      </Button>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <ProductImageGallery 
          productName={product.name}
          defaultImage={currentImage || product.image}
          additionalImages={product.images}
          dataAiHint={product.dataAiHint || product.category.toLowerCase()}
        />

        <div className="space-y-6 py-4">
          <Badge variant="outline" className="text-sm">{product.category}</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">{product.name}</h1>
          
          <p className="text-3xl font-semibold text-primary">${product.price.toFixed(2)}</p>
          
          <Separator />

          <div className="prose prose-sm sm:prose-base text-muted-foreground">
            <h2 className="text-xl font-semibold text-foreground mb-2">Description</h2>
            <p>{product.description}</p>
          </div>

          {product.colors && product.colors.length > 0 && (
             <VariantSelector
              label="Available Colors"
              variants={product.colors}
              selectedVariantId={selectedColor?.id}
              onSelectVariant={handleColorSelect}
            />
          )}
          
          <Separator />

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              size="lg" 
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
              onClick={() => router.push(`/checkout?productId=${product.id}`)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className={cn(
                "flex-1 transition-colors",
                favoriteStatus ? "text-destructive border-destructive hover:bg-destructive/10" : "hover:bg-accent/10"
              )}
              onClick={handleFavoriteToggle}
              disabled={!favoritesLoaded} // This check is good
              aria-pressed={favoriteStatus}
            >
              <Heart className={cn("mr-2 h-5 w-5", favoriteStatus && "fill-destructive")} /> 
              {favoriteStatus ? 'Favorited' : 'Add to Favorites'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
