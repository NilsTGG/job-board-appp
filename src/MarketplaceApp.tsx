import { useState, useMemo, useEffect } from "react";
import { ShoppingCart, Search, Receipt } from "lucide-react";
import { SHOPS, Product, Shop } from "./data/shops";
import ShopSidebar from "./components/marketplace/ShopSidebar";
import ProductCard from "./components/marketplace/ProductCard";
import CartDrawer, { CartItem } from "./components/marketplace/CartDrawer";
import CheckoutModal from "./components/marketplace/CheckoutModal";
import OrderConfirmation from "./components/marketplace/OrderConfirmation";
import { ProductCardSkeleton } from "./components/Skeleton";

const MarketplaceApp = () => {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    let products: { product: Product; shop: Shop }[] = [];

    // Flatten all products from all shops
    SHOPS.forEach((shop) => {
      shop.products.forEach((product) => {
        products.push({ product, shop });
      });
    });

    // Apply filters
    return products.filter(({ product, shop }) => {
      if (selectedShopId && shop.id !== selectedShopId) return false;
      if (selectedCategory && product.category !== selectedCategory)
        return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          shop.name.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedShopId, selectedCategory, searchQuery]);

  // Cart actions
  const addToCart = (product: Product, shop: Shop) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, shop, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = async (orderDetails: any) => {
    console.log("Order Confirmed:", orderDetails);
    // Build a readable message for forwarding
    const itemsText = orderDetails.cartItems
      .map((i: any) => `• ${i.quantity}x ${i.product.name} (${i.shop.name})`)
      .join("\n");
    const coords = `${orderDetails.userLocation.x}, ${orderDetails.userLocation.y}, ${orderDetails.userLocation.z}`;
    const content = `New Order Received:\n${itemsText}\n\nIGN: ${orderDetails.ign}\nDiscord: ${orderDetails.discord}\nCoords: ${coords}\nDelivery Fee: ${orderDetails.deliveryFee} 💎\nTotal: ${orderDetails.total} 💎`;

    // Prefer Formspree (works with static hosting / GitHub Pages). If VITE_FORMSPREE_FORM_ID is set,
    // post the order to Formspree and let Formspree forward it to Discord (or other integrations).
    const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID;
    if (formspreeId) {
      try {
        const r = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            message: content,
            ign: orderDetails.ign,
            discord: orderDetails.discord,
            coords,
            items: itemsText,
            deliveryFee: orderDetails.deliveryFee,
            total: orderDetails.total,
          }),
        });

        if (!r.ok) {
          console.error("Formspree error", r.status, await r.text());
          return {
            ok: false,
            message: `Failed to send to Formspree (status ${r.status}).`,
          };
        }

        // Try to parse a response body for additional info (submission id/message)
        let body: any = null;
        try {
          body = await r.json();
        } catch (err) {
          // ignore parse errors
        }

        const respMessage =
          body?.message ||
          body?.success ||
          "Order sent via Formspree successfully.";
        const submissionId =
          body?.id || body?.submission_id || body?.data?.id || null;

        // Persist last order (helps implement a persistent receipt / confirmation page)
        try {
          const stored = {
            ...orderDetails,
            submittedAt: new Date().toISOString(),
            submissionId,
          };
          localStorage.setItem("lastOrder", JSON.stringify(stored));
        } catch (err) {
          // ignore localStorage errors
        }

        setIsCheckoutOpen(false);
        setCartItems([]);
        setOrderSuccess(true);
        setTimeout(() => setOrderSuccess(false), 5000);

        return { ok: true, message: respMessage };
      } catch (err) {
        console.error("Error sending to Formspree", err);
        return {
          ok: false,
          message: "Network error sending order to Formspree.",
        };
      }
    }

    // Fallback: direct Discord webhook (client-side). This exposes the webhook URL in the bundle and is less secure,
    // but works for quick setups on static hosting.
    const webhook = import.meta.env.VITE_DISCORD_WEBHOOK;
    if (!webhook) {
      return {
        ok: false,
        message:
          "No submission method configured (VITE_FORMSPREE_FORM_ID or VITE_DISCORD_WEBHOOK).",
      };
    }

    try {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!r.ok) {
        console.error("Discord webhook error", r.status, await r.text());
        return {
          ok: false,
          message: `Failed to send to Discord (status ${r.status}).`,
        };
      }

      // Success
      setIsCheckoutOpen(false);
      setCartItems([]);
      setOrderSuccess(true);
      setTimeout(() => setOrderSuccess(false), 5000);

      return { ok: true, message: "Order sent to Discord successfully." };
    } catch (err) {
      console.error("Error sending to Discord", err);
      return { ok: false, message: "Network error sending order to Discord." };
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      {/* Header / Search Bar */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search items, shops, or categories..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-800">
                {cartItems.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <ShopSidebar
          selectedShopId={selectedShopId}
          selectedCategory={selectedCategory}
          onSelectShop={setSelectedShopId}
          onSelectCategory={setSelectedCategory}
        />

        {/* Product Grid */}
        <div className="flex-1">
          {orderSuccess && (
            <div
              className="mb-6 bg-green-900/30 border border-green-600/50 text-green-200 p-4 rounded-xl flex items-center justify-between gap-3 animate-slideIn"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-600 p-2 rounded-full">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold">Order Placed Successfully! 🎉</div>
                  <div className="text-sm opacity-80">
                    Est. delivery: ~15-30 min • Check Discord for updates
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowReceipt(true)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Receipt className="h-4 w-4" />
                View Receipt
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Skeleton loading state
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </>
            ) : (
              filteredProducts.map(({ product, shop }) => (
                <ProductCard
                  key={`${shop.id}-${product.id}`}
                  product={product}
                  shop={shop}
                  onAddToCart={addToCart}
                />
              ))
            )}
          </div>

          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <Search className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p className="text-xl font-medium">No products found</p>
              <p>Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onConfirmOrder={handleConfirmOrder}
      />

      {/* Order Confirmation / Receipt Modal */}
      <OrderConfirmation
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
      />
    </div>
  );
};

export default MarketplaceApp;
