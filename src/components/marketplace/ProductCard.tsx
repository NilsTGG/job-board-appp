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
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105 group">
      {/* Image Placeholder */}
      <div className="h-48 bg-gray-700/50 flex items-center justify-center relative overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="h-16 w-16 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
        )}

        {/* Shop Badge - using inline style for dynamic color */}
        <div
          className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold text-white shadow-md"
          style={{ backgroundColor: badgeColor }}
        >
          {shop.name}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-white text-lg leading-tight">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 bg-gray-900/50 px-2 py-1 rounded text-yellow-400 font-bold">
            <span>💎</span>
            <span>{product.price}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <button
          onClick={() => onAddToCart(product, shop)}
          className="w-full bg-gray-700 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group-hover:bg-blue-600"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
