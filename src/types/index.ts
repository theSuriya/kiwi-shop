
export type ProductCategory = 'Running' | 'Football' | 'Basketball' | 'Tennis';

export const ALL_CATEGORIES: ProductCategory[] = ['Running', 'Football', 'Basketball', 'Tennis'];

export type ProductColor = {
  id: string;
  name: string;
  hex: string; // e.g., '#FF0000'
  image?: string; // Optional: specific image for this color
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string; // Default image URL
  images?: string[]; // Additional image URLs for gallery
  colors?: ProductColor[];
  defaultColorId?: string; // Default selected color ID
  featured?: boolean;
  dataAiHint?: string; // for placeholder images
};
