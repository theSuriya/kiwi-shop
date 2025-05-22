import { Users, Target, Zap } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">About KwikShop Sports</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Fueling your passion for sports with high-quality gear and apparel. We are dedicated to helping athletes of all levels achieve their best.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-video rounded-lg shadow-xl overflow-hidden">
           <Image 
            src="https://placehold.co/800x600.png" 
            alt="Team working at KwikShop Sports" 
            layout="fill" 
            objectFit="cover"
            data-ai-hint="team collaboration office"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-foreground">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            KwikShop Sports was founded with a simple mission: to make top-quality sports equipment accessible to everyone. What started as a small local store has grown into a trusted online destination for athletes and sports enthusiasts across the country. We believe that the right gear can make a huge difference in performance and enjoyment, and we're committed to sourcing and providing the best products available.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our team is made up of passionate sports lovers, former athletes, and gear experts who understand your needs. We carefully curate our collection to ensure it meets the highest standards of quality, durability, and innovation.
          </p>
        </div>
      </section>

      <section className="py-12 bg-secondary/30 rounded-lg shadow-inner">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-foreground mb-10">Our Values</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-card p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <Zap className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Performance</h3>
              <p className="text-sm text-muted-foreground">
                We provide gear that helps you perform at your peak, pushing boundaries and achieving new personal bests.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <Users className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">
                We believe in the power of sports to connect people. We strive to support and grow the sports community.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <Target className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Quality</h3>
              <p className="text-sm text-muted-foreground">
                Every product in our store is selected for its superior quality, durability, and craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

       <section className="text-center py-10">
        <h2 className="text-3xl font-semibold text-foreground mb-4">Join Our Journey</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Whether you're a seasoned pro or just starting out, KwikShop Sports is here to support your athletic endeavors. Explore our range and find everything you need to succeed.
        </p>
      </section>
    </div>
  );
}
