import React, { useState } from "react";
import { Store, Filter, ChevronDown, ChevronUp, X } from "lucide-react";
import { SHOPS } from "../../data/shops";

interface ShopSidebarProps {
  selectedShopId: string | null;
  selectedCategory: string | null;
  onSelectShop: (shopId: string | null) => void;
  onSelectCategory: (category: string | null) => void;
}

const CATEGORIES = [
  { id: "materials", label: "Building Materials" },
  { id: "redstone", label: "Redstone" },
  { id: "tools", label: "Tools & Gear" },
  { id: "food", label: "Food & Potions" },
  { id: "misc", label: "Miscellaneous" },
];

const ShopSidebar: React.FC<ShopSidebarProps> = ({
  selectedShopId,
  selectedCategory,
  onSelectShop,
  onSelectCategory,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<
    "shops" | "categories" | null
  >("shops");

  const COLOR_MAP: Record<string, string> = {
    // Greens
    "green-500": "#22c55e",
    "green-600": "#16a34a",
    "emerald-500": "#10b981",
    "emerald-600": "#059669",
    // Reds
    "red-500": "#ef4444",
    "red-600": "#dc2626",
    // Blues
    "blue-500": "#3b82f6",
    "blue-600": "#2563eb",
    "sky-500": "#0ea5e9",
    // Purples
    "purple-500": "#a855f7",
    "purple-600": "#9333ea",
    "violet-500": "#8b5cf6",
    // Yellows/Oranges
    "yellow-500": "#eab308",
    "orange-500": "#f97316",
    "amber-500": "#f59e0b",
    // Others
    "pink-500": "#ec4899",
    "teal-500": "#14b8a6",
    "cyan-500": "#06b6d4",
    "indigo-500": "#6366f1",
    "gray-500": "#6b7280",
  };

  const activeFiltersCount =
    (selectedShopId ? 1 : 0) + (selectedCategory ? 1 : 0);

  const SidebarContent = () => (
    <>
      {/* Shops Filter */}
      <div>
        <button
          onClick={() =>
            setExpandedSection(expandedSection === "shops" ? null : "shops")
          }
          className="w-full text-lg font-bold text-white mb-4 flex items-center justify-between gap-2 lg:cursor-default"
        >
          <span className="flex items-center gap-2">
            <Store className="h-5 w-5 text-blue-400" />
            Shops
          </span>
          <span className="lg:hidden">
            {expandedSection === "shops" ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </span>
        </button>
        <div
          className={`space-y-2 ${
            expandedSection === "shops" || window.innerWidth >= 1024
              ? "block"
              : "hidden lg:block"
          }`}
        >
          <button
            onClick={() => onSelectShop(null)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
              selectedShopId === null
                ? "bg-blue-600 text-white font-medium"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            All Shops
          </button>
          {SHOPS.map((shop) => {
            const isSelected = selectedShopId === shop.id;
            const style = isSelected
              ? { backgroundColor: COLOR_MAP[shop.themeColor] || undefined }
              : undefined;
            return (
              <button
                key={shop.id}
                onClick={() => onSelectShop(shop.id)}
                aria-pressed={isSelected}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                  isSelected
                    ? "text-white font-medium"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
                style={style}
              >
                {shop.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories Filter */}
      <div>
        <button
          onClick={() =>
            setExpandedSection(
              expandedSection === "categories" ? null : "categories"
            )
          }
          className="w-full text-lg font-bold text-white mb-4 flex items-center justify-between gap-2 lg:cursor-default"
        >
          <span className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-purple-400" />
            Categories
          </span>
          <span className="lg:hidden">
            {expandedSection === "categories" ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </span>
        </button>
        <div
          className={`space-y-2 ${
            expandedSection === "categories" || window.innerWidth >= 1024
              ? "block"
              : "hidden lg:block"
          }`}
        >
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
              selectedCategory === null
                ? "bg-purple-600 text-white font-medium"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                selectedCategory === cat.id
                  ? "bg-purple-600 text-white font-medium"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedShopId || selectedCategory) && (
        <button
          onClick={() => {
            onSelectShop(null);
            onSelectCategory(null);
          }}
          className="w-full mt-4 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
        >
          <X className="h-4 w-4" />
          Clear All Filters
        </button>
      )}
    </>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 flex items-center justify-between text-white font-medium transition-colors hover:bg-gray-750"
        >
          <span className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-purple-400" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </span>
          {isMobileOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {/* Mobile Expanded Filters */}
        {isMobileOpen && (
          <div className="mt-3 bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-6 animate-fadeIn">
            <SidebarContent />
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0 space-y-8">
        <SidebarContent />
      </div>
    </>
  );
};

export default ShopSidebar;
