"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Heart, Search, Menu, X, Home, List, Info, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ALL_CATEGORIES, type ProductCategory } from '@/types';
import React from 'react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/products', label: 'All Products', icon: List }, // Combined "Shop by Category" into "All Products" with filtering
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavLinkItem = ({ href, label, icon: Icon, isMobile = false }: { href: string; label: string; icon: React.ElementType; isMobile?: boolean}) => (
    <Link href={href} passHref legacyBehavior>
      <Button
        variant={pathname === href ? 'secondary' : 'ghost'}
        className={`justify-start w-full text-sm md:text-base ${isMobile ? 'py-3' : ''} transition-colors duration-200 ease-in-out`}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
        aria-current={pathname === href ? "page" : undefined}
      >
        <Icon className="mr-2 h-5 w-5" />
        {label}
      </Button>
    </Link>
  );
  
  const CategoryDropdown = ({ isMobile = false }: { isMobile?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={pathname.startsWith('/products') && !navLinks.find(l => l.href === pathname) ? 'secondary' : 'ghost'} 
          className={`justify-start w-full text-sm md:text-base ${isMobile ? 'py-3' : ''} transition-colors duration-200 ease-in-out`}
        >
          <List className="mr-2 h-5 w-5" />
          Shop by Category
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {ALL_CATEGORIES.map((category) => (
          <Link key={category} href={`/products?category=${category}`} passHref legacyBehavior>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => isMobile && setIsMobileMenuOpen(false)}
            >
              {category}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <ShoppingBag className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl text-primary">KwikShop</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            link.label === "All Products" 
            ? <CategoryDropdown key={link.href}/> 
            : <NavLinkItem key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[200px] md:w-[250px] rounded-lg bg-muted focus:bg-background transition-colors"
              aria-label="Search products"
            />
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b">
                     <Link href="/" className="flex items-center gap-2" prefetch={false} onClick={() => setIsMobileMenuOpen(false)}>
                        <ShoppingBag className="h-6 w-6 text-primary" />
                        <span className="font-semibold text-lg text-primary">KwikShop</span>
                      </Link>
                    <SheetClose asChild>
                       <Button variant="ghost" size="icon">
                          <X className="h-6 w-6" />
                          <span className="sr-only">Close Menu</span>
                        </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex-grow p-4 space-y-2">
                    {navLinks.map((link) => (
                       link.label === "All Products" 
                       ? <CategoryDropdown key={link.href} isMobile={true}/> 
                       : <NavLinkItem key={link.href} {...link} isMobile={true} />
                    ))}
                     <div className="relative sm:hidden pt-4">
                      <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="pl-8 w-full rounded-lg bg-muted focus:bg-background transition-colors"
                        aria-label="Search products"
                      />
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
