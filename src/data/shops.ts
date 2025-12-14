export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  category: 'materials' | 'tools' | 'redstone' | 'food' | 'misc';
  inStock: boolean;
}

export interface Shop {
  id: string;
  name: string;
  owner: string;
  description: string;
  coords: { x: number; y: number; z: number };
  products: Product[];
  themeColor: string; // Tailwind color class for branding (e.g., 'red-500')
}

// ==========================================
// EDIT SHOPS BELOW THIS LINE
// ==========================================

export const SHOPS: Shop[] = [
  {
    id: '7-eleven',
    name: '7-Eleven',
    owner: 'NilsTG',
    description: 'Convenience at its finest. Open 24/7.',
    coords: { x: 64, y: 105, z: -38 },
    themeColor: 'green-500',
    products: [
      {
        id: 'p1',
        name: 'Cooked Beef (Stack)',
        price: 2,
        description: '64x Juicy steak. Best food source.',
        category: 'food',
        inStock: true,
      },
      {
        id: 'p2',
        name: 'Golden Carrots (Stack)',
        price: 4,
        description: '64x The ultimate saturation food.',
        category: 'food',
        inStock: true,
      },
      {
        id: 'p3',
        name: 'Rocket (Duration 3)',
        price: 1,
        description: 'Stack of 64 firework rockets for elytra flight.',
        category: 'misc',
        inStock: true,
      },
    ],
  },
  {
    id: 'redstone-r-us',
    name: 'Redstone R Us',
    owner: 'MumboJumboFan',
    description: 'All your technical needs in one place.',
    coords: { x: 200, y: 64, z: 200 },
    themeColor: 'red-600',
    products: [
      {
        id: 'r1',
        name: 'Observer',
        price: 1,
        description: 'Watches your blocks.',
        category: 'redstone',
        inStock: true,
      },
      {
        id: 'r2',
        name: 'Piston',
        price: 1,
        description: 'Pushy block.',
        category: 'redstone',
        inStock: true,
      },
      {
        id: 'r3',
        name: 'Sticky Piston',
        price: 2,
        description: 'Very sticky.',
        category: 'redstone',
        inStock: true,
      },
    ],
  },
  {
    id: 'build-mart',
    name: 'Build Mart',
    owner: 'GrianStan',
    description: 'Blocks, blocks, and more blocks.',
    coords: { x: -500, y: 70, z: -150 },
    themeColor: 'blue-500',
    products: [
      {
        id: 'b1',
        name: 'Stone Bricks (Shulker Box)',
        price: 5,
        description: 'Full shulker of stone bricks.',
        category: 'materials',
        inStock: true,
      },
      {
        id: 'b2',
        name: 'Oak Logs (Shulker Box)',
        price: 8,
        description: 'Full shulker of oak logs.',
        category: 'materials',
        inStock: true,
      },
      {
        id: 'b3',
        name: 'Glass (Shulker Box)',
        price: 4,
        description: 'Clear glass.',
        category: 'materials',
        inStock: true,
      },
    ],
  },
];
