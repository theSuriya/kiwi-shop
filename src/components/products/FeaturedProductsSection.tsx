import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import type { Product } from '@/types';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProductsSection({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No featured products available at the moment.</p>;
  }

  return (
    <section className="py-12 md:py-16 bg-secondary/30 rounded-lg shadow-inner">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">Featured Products</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Check out our handpicked selection of top-quality sports gear.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/products" passHref legacyBehavior>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors group">
              View All Products <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
