export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  category: "materials" | "tools" | "redstone" | "food" | "misc";
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
    id: "7-eleven",
    name: "7/11",
    owner: "NilsTG",
    description:
      "Your one-stop convenience shop! Dyes, glass, slime, and more.",
    coords: { x: 64, y: 105, z: -38 },
    themeColor: "green-500",
    products: [
      // Dyes
      {
        id: "dye-all",
        name: "Dyes (All Colors)",
        price: 1,
        description: "1 stack of any color dye. All 16 colors available!",
        image: "/job-board-appp/images/products/dye.png",
        category: "materials",
        inStock: true,
      },
      // Stained Glass
      {
        id: "stained-glass",
        name: "Stained Glass (All Colors)",
        price: 1,
        description: "3 stacks of stained glass per diamond. Any color!",
        image: "/job-board-appp/images/products/stainedglass.png",
        category: "materials",
        inStock: true,
      },
      // Regular Glass
      {
        id: "regular-glass-stacks",
        name: "Regular Glass (Stacks)",
        price: 1,
        description: "3 stacks of regular glass per diamond.",
        image: "/job-board-appp/images/products/regularglass.png",
        category: "materials",
        inStock: true,
      },
      {
        id: "regular-glass-shulker",
        name: "Regular Glass (Shulker)",
        price: 7,
        description: "Full shulker of regular glass.",
        image: "/job-board-appp/images/products/regularglass.png",
        category: "materials",
        inStock: true,
      },
      // Slime Blocks
      {
        id: "slime-block",
        name: "Slime Blocks",
        price: 3,
        description: "1 stack of slime blocks. Can be broken into slime balls!",
        image: "/job-board-appp/images/products/slimeblock.png",
        category: "materials",
        inStock: true,
      },
      // Glow Squid Ink
      {
        id: "glow-ink",
        name: "Glow Squid Ink",
        price: 2,
        description: "1 stack of glow ink sacs.",
        image: "/job-board-appp/images/products/glowsquid.png",
        category: "materials",
        inStock: true,
      },
      // Tinted Glass
      {
        id: "tinted-glass",
        name: "Tinted Glass",
        price: 2,
        description: "1 stack of tinted glass.",
        image: "/job-board-appp/images/products/tintedglass.png",
        category: "materials",
        inStock: true,
      },
    ],
  },
];
