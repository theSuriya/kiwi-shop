import type { Product, ProductCategory, ProductColor } from '@/types';

const sampleColors: ProductColor[] = [
  { id: 'red', name: 'Red', hex: '#EF4444' },
  { id: 'blue', name: 'Blue', hex: '#3B82F6' },
  { id: 'green', name: 'Green', hex: '#22C55E' },
  { id: 'black', name: 'Black', hex: '#000000' },
];

export const products: Product[] = [
  {
    id: 'running-shoe-1',
    name: 'Speedster Pro Runner',
    description: 'Lightweight and responsive running shoes designed for speed and comfort. Perfect for marathon runners and daily joggers.',
    price: 129.99,
    category: 'Running',
    image: 'https://placehold.co/600x400.png',
    images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    colors: [sampleColors[0], sampleColors[1]],
    defaultColorId: 'red',
    featured: true,
    dataAiHint: 'running shoe',
  },
  {
    id: 'football-cleats-1',
    name: 'Striker Elite Cleats',
    description: 'Dominate the field with these high-performance football cleats. Engineered for agility and precision.',
    price: 99.50,
    category: 'Football',
    image: 'https://placehold.co/600x400.png',
    featured: true,
    dataAiHint: 'football cleats',
  },
  {
    id: 'basketball-sneakers-1',
    name: 'HoopsMaster High-Tops',
    description: 'Elevate your game with these supportive and stylish basketball sneakers. Excellent grip and ankle support.',
    price: 149.00,
    category: 'Basketball',
    image: 'https://placehold.co/600x400.png',
    colors: [sampleColors[2], sampleColors[3]],
    defaultColorId: 'green',
    dataAiHint: 'basketball sneaker',
  },
  {
    id: 'tennis-racket-1',
    name: 'AcePro Tennis Racket',
    description: 'A balanced tennis racket for players of all levels. Offers a great blend of power and control.',
    price: 79.99,
    category: 'Tennis',
    image: 'https://placehold.co/600x400.png',
    featured: true,
    dataAiHint: 'tennis racket',
  },
  {
    id: 'running-shorts-1',
    name: 'AeroFlow Running Shorts',
    description: 'Breathable and lightweight running shorts with moisture-wicking technology. Stay cool and dry on your runs.',
    price: 45.00,
    category: 'Running',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'running shorts',
  },
  {
    id: 'football-jersey-1',
    name: 'Victory Football Jersey',
    description: 'Official team replica football jersey. Made with comfortable, breathable fabric.',
    price: 85.00,
    category: 'Football',
    image: 'https://placehold.co/600x400.png',
    colors: [sampleColors[1], sampleColors[3]],
    defaultColorId: 'blue',
    dataAiHint: 'football jersey',
  },
  {
    id: 'basketball-1',
    name: 'ProGrip Basketball',
    description: 'Official size and weight basketball with superior grip and durability. Suitable for indoor and outdoor play.',
    price: 29.99,
    category: 'Basketball',
    image: 'https://placehold.co/600x400.png',
    featured: true,
    dataAiHint: 'basketball ball',
  },
  {
    id: 'tennis-balls-1',
    name: 'Championship Tennis Balls (3-Pack)',
    description: 'High-quality, durable tennis balls for competitive play and practice. Consistent bounce and performance.',
    price: 9.99,
    category: 'Tennis',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'tennis balls',
  },
   {
    id: 'running-jacket-1',
    name: 'WindGuard Running Jacket',
    description: 'Lightweight, wind-resistant jacket perfect for all-weather running. Features reflective details for visibility.',
    price: 75.99,
    category: 'Running',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'running jacket',
  },
  {
    id: 'football-gloves-1',
    name: 'Guardian Goalie Gloves',
    description: 'Professional-grade goalie gloves offering maximum grip and protection. Latex palm for superior ball control.',
    price: 59.99,
    category: 'Football',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'goalie gloves',
  },
  {
    id: 'basketball-shorts-1',
    name: 'CourtKing Basketball Shorts',
    description: 'Comfortable and breathable basketball shorts with a relaxed fit. Ideal for practice and game day.',
    price: 39.99,
    category: 'Basketball',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'basketball shorts',
  },
  {
    id: 'tennis-skirt-1',
    name: 'FlexFit Tennis Skirt',
    description: 'Stylish and functional tennis skirt with built-in shorts. Provides comfort and freedom of movement.',
    price: 54.99,
    category: 'Tennis',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'tennis skirt',
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
