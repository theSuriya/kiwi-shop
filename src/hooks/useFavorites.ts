// This file is no longer needed as useFavorites is now exported from '@/contexts/FavoritesContext.tsx'
// You can delete this file after updating all imports.
// For now, to prevent build errors, we'll leave it, but it's effectively deprecated.

"use client";

import type { Product } from '@/types';
import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'kwikshop_favorites_deprecated_hook'; // Changed key to avoid conflict during transition

/**
 * @deprecated This hook is deprecated. Please use `useFavorites` from ` '@/contexts/FavoritesContext'`.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.warn("Using deprecated useFavorites hook. Please switch to context-based useFavorites.");
      try {
        const storedFavorites = localStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites from localStorage (deprecated hook)", error);
        setFavorites([]);
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites to localStorage (deprecated hook)", error);
      }
    }
  }, [favorites, isLoaded]);

  const addFavorite = useCallback((product: Product) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find(fav => fav.id === product.id)) {
        return prevFavorites; 
      }
      return [...prevFavorites, product];
    });
  }, []);

  const removeFavorite = useCallback((productId: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== productId));
  }, []);

  const isFavorite = useCallback((productId: string): boolean => {
    if (!isLoaded) return false;
    return !!favorites.find(fav => fav.id === productId);
  }, [favorites, isLoaded]);

  return { favorites, addFavorite, removeFavorite, isFavorite, isLoaded };
}
