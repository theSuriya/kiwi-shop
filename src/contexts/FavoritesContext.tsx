
'use client';

import type { Product } from '@/types';
import React, { createContext, useState, useEffect, useCallback, ReactNode, useContext } from 'react';
import { useToast } from '@/hooks/use-toast';

const FAVORITES_KEY = 'kwikshop_favorites';

interface FavoritesContextType {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  isLoaded: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedFavorites = localStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites from localStorage", error);
        setFavorites([]); // Ensure it's an array on error
      }
      setIsLoaded(true); // Set isLoaded after attempting to setFavorites
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
      }
    }
  }, [favorites, isLoaded]);

  const addFavorite = useCallback((product: Product) => {
    if (!isLoaded) {
        toast({ title: "Favorites still loading", description: "Please try adding again in a moment.", variant: "default" });
        return;
    }
    setFavorites((prevFavorites) => {
      if (prevFavorites.find(fav => fav.id === product.id)) {
        return prevFavorites; // Already a favorite
      }
      return [...prevFavorites, product];
    });
  }, [isLoaded, toast]);

  const removeFavorite = useCallback((productId: string) => {
    if (!isLoaded) {
        toast({ title: "Favorites still loading", description: "Please try removing again in a moment.", variant: "default" });
        return;
    }
    setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== productId));
  }, [isLoaded, toast]);

  const isFavorite = useCallback((productId: string): boolean => {
    if (!isLoaded) return false;
    return !!favorites.find(fav => fav.id === productId);
  }, [favorites, isLoaded]);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, isLoaded }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
