import React from "react";
import { ShoppingBag, MapPin, ExternalLink } from "../icons";
import { SHOPS } from "../data/shops";

interface ShopPartnersProps {
  onNavigateToMarketplace: () => void;
}

const ShopPartners: React.FC<ShopPartnersProps> = ({
  onNavigateToMarketplace,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-xl shadow-lg mb-4">
          <ShoppingBag className="h-6 w-6 text-white" />
          <h2 className="text-2xl font-bold text-white">Partner Shops</h2>
        </div>
        <p className="text-gray-400 max-w-xl mx-auto">
          Browse our partner shops for great deals on Minecraft items. Click any
          shop to visit the marketplace!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SHOPS.map((shop) => (
          <button
            key={shop.id}
            onClick={onNavigateToMarketplace}
            className="group bg-gray-800 rounded-xl border border-gray-700 p-6 text-left hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors flex items-center gap-2">
                  {shop.name}
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-gray-400">by {shop.owner}</p>
              </div>
              <div className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                {shop.products.length} items
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4">{shop.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin className="h-4 w-4" />
                <span>
                  {shop.coords.x}, {shop.coords.y}, {shop.coords.z}
                </span>
              </div>
              <span className="text-purple-400 text-sm font-medium group-hover:underline">
                Browse Shop →
              </span>
            </div>

            {/* Preview of products */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex flex-wrap gap-2">
                {shop.products.slice(0, 3).map((product) => (
                  <span
                    key={product.id}
                    className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded"
                  >
                    {product.name.split("(")[0].trim()}
                  </span>
                ))}
                {shop.products.length > 3 && (
                  <span className="bg-purple-600/20 text-purple-400 text-xs px-2 py-1 rounded">
                    +{shop.products.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* CTA to marketplace */}
      <div className="text-center mt-8">
        <button
          onClick={onNavigateToMarketplace}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
        >
          <ShoppingBag className="h-5 w-5" />
          Visit Full Marketplace
        </button>
      </div>
    </div>
  );
};

export default ShopPartners;
