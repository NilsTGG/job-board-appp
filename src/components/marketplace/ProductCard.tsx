import React from "react";
import { ShoppingCart, Package } from "lucide-react";
import { Product, Shop } from "../../data/shops";

interface ProductCardProps {
  product: Product;
  shop: Shop;
  onAddToCart: (product: Product, shop: Shop) => void;
}

// Color mapping for shop badges (Tailwind classes don't work dynamically)
const COLOR_MAP: Record<string, string> = {
  "green-500": "#22c55e",
  "green-600": "#16a34a",
  "emerald-500": "#10b981",
  "emerald-600": "#059669",
  "red-500": "#ef4444",
  "red-600": "#dc2626",
  "blue-500": "#3b82f6",
  "blue-600": "#2563eb",
  "sky-500": "#0ea5e9",
  "purple-500": "#a855f7",
  "purple-600": "#9333ea",
  "violet-500": "#8b5cf6",
  "yellow-500": "#eab308",
  "orange-500": "#f97316",
  "amber-500": "#f59e0b",
  "pink-500": "#ec4899",
  "teal-500": "#14b8a6",
  "cyan-500": "#06b6d4",
  "indigo-500": "#6366f1",
  "gray-500": "#6b7280",
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  shop,
  onAddToCart,
}) => {
  const badgeColor = COLOR_MAP[shop.themeColor] || "#2563eb";

  return (
    <article
      className="bg-brand-surface rounded-xl border border-brand-border overflow-hidden hover:border-brand-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10 hover:scale-[1.02] group focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2 focus-within:ring-offset-brand-black"
      aria-label={`${product.name} by ${shop.name} - ${product.price} diamonds`}
    >
      {/* Image Placeholder */}
      <div className="h-48 bg-brand-black flex items-center justify-center relative overflow-hidden group-hover:bg-brand-black transition-colors">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Package className="h-16 w-16 text-gray-700 group-hover:scale-110 transition-transform duration-300" />
        )}

        {/* Shop Badge - using inline style for dynamic color */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1.5 rounded-lg text-sm font-bold text-white shadow-md"
          style={{ backgroundColor: badgeColor }}
        >
          {shop.name}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-bold text-white text-lg leading-tight">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 bg-brand-black border border-brand-border px-2.5 py-1.5 rounded-lg text-yellow-400 font-bold whitespace-nowrap">
            <span aria-hidden="true">💎</span>
            <span>{product.price}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <button
          onClick={() => onAddToCart(product, shop)}
          className="w-full bg-brand-black border border-brand-border hover:bg-brand-primary hover:border-brand-primary text-white py-2.5 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 group-hover:bg-brand-primary group-hover:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-black active:scale-[0.98]"
          aria-label={`Add ${product.name} to cart for ${product.price} diamonds`}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
