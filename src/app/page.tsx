
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import FeaturedProductsSection from '@/components/products/FeaturedProductsSection';
import { getFeaturedProducts } from '@/lib/products';
import type { ProductCategory } from '@/types';
import { Footprints, Zap, Shield, Award } from 'lucide-react'; 
import Image from 'next/image';

const categories: { name: ProductCategory; icon: React.ElementType; description: string, dataAiHint: string }[] = [
  { name: 'Running', icon: Footprints, description: 'Gear up for your best run yet.', dataAiHint: 'running track' },
  { name: 'Football', icon: Zap, description: 'Dominate the field with top cleats and apparel.', dataAiHint: 'football stadium' },
  { name: 'Basketball', icon: Shield, description: 'Elevate your game with the latest court essentials.', dataAiHint: 'basketball court' },
  { name: 'Tennis', icon: Award, description: 'Serve up style and performance on the court.', dataAiHint: 'tennis court' },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/80 to-secondary text-primary-foreground py-20 md:py-32 rounded-xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <Image src="https://placehold.co/1200x600.png" alt="Abstract sports background" layout="fill" objectFit="cover" data-ai-hint="sports stadium abstract" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Your Adventure Starts Here
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto">
            Discover top-tier sports equipment and apparel. KwikShop Sports brings you the best in quality and performance.
          </p>
          <Link href="/products" passHref legacyBehavior>
            <Button size="lg" variant="default" className="text-lg px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90 transition-transform transform hover:scale-105">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProductsSection products={featuredProducts} />

      {/* Shop by Category Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Shop by Category</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Find exactly what you need for your favorite sport.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category) => (
              <Link key={category.name} href={`/products?category=${category.name}`} className="block group">
                <div className="relative bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 hover:scale-[1.02] overflow-hidden">
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-300">
                     <Image src={`https://placehold.co/400x300.png`} alt={`${category.name} category background`} layout="fill" objectFit="cover" data-ai-hint={category.dataAiHint} />
                  </div>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <category.icon className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]" />
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
