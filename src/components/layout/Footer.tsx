import Link from 'next/link';
import { ShoppingBag, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4" prefetch={false}>
              <ShoppingBag className="h-7 w-7 text-primary" />
              <span className="font-bold text-xl text-primary">KwikShop</span>
            </Link>
            <p className="text-sm">
              Your one-stop shop for the best sports gear and apparel.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link href="/favorites" className="hover:text-primary transition-colors">My Favorites</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={24} /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={24} /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={24} /></Link>
            </div>
             <p className="text-sm mt-4">
              123 Sports Avenue, Suite 100 <br />
              Anytown, USA 12345
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-xs">
          <p>&copy; {new Date().getFullYear()} KwikShop Sports. All rights reserved.</p>
          <p className="mt-1">Designed with passion for sports enthusiasts.</p>
        </div>
      </div>
    </footer>
  );
}
