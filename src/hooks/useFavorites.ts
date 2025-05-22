"use client";

import type { Product } from '@/types';
import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'kwikshop_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedFavorites = localStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites from localStorage", error);
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
        console.error("Failed to save favorites to localStorage", error);
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
    if (!isLoaded) return false; // Don't give an answer until loaded
    return !!favorites.find(fav => fav.id === productId);
  }, [favorites, isLoaded]);

  return { favorites, addFavorite, removeFavorite, isFavorite, isLoaded };
}
