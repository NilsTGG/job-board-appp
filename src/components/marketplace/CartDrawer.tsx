import React from "react";
import {
  ShoppingCart,
  X,
  Trash2,
  ShoppingBag,
  Sparkles,
  Package,
} from "lucide-react";
import { Product, Shop } from "../../data/shops";

export interface CartItem {
  product: Product;
  shop: Shop;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}) => {
  const totalDiamonds = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-gray-900 border-l border-gray-700 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-blue-400" />
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="relative inline-block mb-6">
                <ShoppingBag className="h-20 w-20 text-gray-600 mx-auto" />
                <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-400 mb-6">
                Discover amazing items from our marketplace shops!
              </p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Browse Products
              </button>
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-xs text-gray-400">
                  💡 <span className="text-blue-400 font-medium">Pro tip:</span>{" "}
                  Check out our top sellers in the Building Materials category!
                </p>
              </div>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex gap-4"
              >
                {/* Image */}
                <div className="w-16 h-16 bg-gray-700 rounded-md flex-shrink-0 overflow-hidden">
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                      No Img
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-white font-medium truncate text-base">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label={`Remove ${item.product.name} from cart`}
                      title="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-300 mb-2">
                    Sold by: {item.shop.name}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-gray-900 rounded-lg px-2 py-1.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="text-gray-300 hover:text-white hover:bg-gray-700 w-7 h-7 flex items-center justify-center rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label={`Decrease quantity of ${item.product.name}`}
                      >
                        −
                      </button>
                      <span
                        className="text-white text-base font-medium w-6 text-center"
                        aria-label={`Quantity: ${item.quantity}`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="text-gray-300 hover:text-white hover:bg-gray-700 w-7 h-7 flex items-center justify-center rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label={`Increase quantity of ${item.product.name}`}
                      >
                        +
                      </button>
                    </div>
                    <div className="text-yellow-400 font-bold text-lg">
                      {item.product.price * item.quantity} 💎
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 bg-gray-900">
          {/* Delivery Fee Notice - Shown BEFORE checkout */}
          <div className="mb-4 p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-blue-300 text-sm font-medium mb-1">
              <Package className="h-4 w-4" />
              Flat Delivery Fee
            </div>
            <p className="text-gray-300 text-sm">
              <span className="text-yellow-400 font-bold">+4 💎</span> delivery
              will be added at checkout
            </p>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-300 font-medium">Subtotal</span>
            <span className="text-2xl font-bold text-yellow-400">
              {totalDiamonds} 💎
            </span>
          </div>
          <button
            onClick={onCheckout}
            disabled={cartItems.length === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500 text-white py-3 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label={
              cartItems.length === 0
                ? "Cart is empty"
                : `Proceed to checkout with ${cartItems.length} items`
            }
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
