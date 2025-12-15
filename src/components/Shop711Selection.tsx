import React, { useState, useEffect } from "react";
import { Plus, Trash2, ShoppingCart } from "lucide-react";

// Define the available colors for dyes and glass
const MINECRAFT_COLORS = [
  "White", "Orange", "Magenta", "Light Blue", "Yellow", "Lime", 
  "Pink", "Gray", "Light Gray", "Cyan", "Purple", "Blue", 
  "Brown", "Green", "Red", "Black"
];

// Define product types
type ProductType = 
  | "dye" 
  | "stained_glass" 
  | "glass" 
  | "slime" 
  | "glow_ink" 
  | "tinted_glass";

interface ProductDef {
  id: ProductType;
  name: string;
  hasColor: boolean;
  units: {
    name: string;
    price: number; // diamonds
    quantity: number; // amount of items per unit (e.g. 64 for stack)
    display: string; // "1 stack", "1 shulker"
  }[];
}

const PRODUCTS: ProductDef[] = [
  {
    id: "dye",
    name: "Dye",
    hasColor: true,
    units: [
      { name: "stack", price: 1, quantity: 64, display: "1 Stack (64)" }
    ]
  },
  {
    id: "stained_glass",
    name: "Stained Glass",
    hasColor: true,
    units: [
      { name: "3_stacks", price: 1, quantity: 192, display: "3 Stacks (192)" }
    ]
  },
  {
    id: "glass",
    name: "Regular Glass",
    hasColor: false,
    units: [
      { name: "3_stacks", price: 1, quantity: 192, display: "3 Stacks (192)" },
      { name: "shulker", price: 7, quantity: 1728, display: "1 Shulker Box" }
    ]
  },
  {
    id: "slime",
    name: "Slime Ball",
    hasColor: false,
    units: [
      { name: "3_stacks", price: 1, quantity: 192, display: "3 Stacks (192)" }
    ]
  },
  {
    id: "glow_ink",
    name: "Glow Squid Ink",
    hasColor: false,
    units: [
      { name: "stack", price: 2, quantity: 64, display: "1 Stack (64)" }
    ]
  },
  {
    id: "tinted_glass",
    name: "Tinted Glass",
    hasColor: false,
    units: [
      { name: "stack", price: 2, quantity: 64, display: "1 Stack (64)" }
    ]
  }
];

interface CartItem {
  id: string;
  productId: ProductType;
  color?: string;
  unitName: string;
  count: number;
}

interface Props {
  onUpdate: (description: string, totalPrice: number) => void;
}

const Shop711Selection: React.FC<Props> = ({ onUpdate }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Selection state
  const [selectedProduct, setSelectedProduct] = useState<ProductType>("dye");
  const [selectedColor, setSelectedColor] = useState<string>("White");
  const [selectedUnit, setSelectedUnit] = useState<string>("");

  // Update selected unit when product changes
  useEffect(() => {
    const product = PRODUCTS.find(p => p.id === selectedProduct);
    if (product && product.units.length > 0) {
      setSelectedUnit(product.units[0].name);
    }
  }, [selectedProduct]);

  // Calculate totals and notify parent
  useEffect(() => {
    let total = 0;
    const lines: string[] = [];

    if (cart.length > 0) {
      lines.push("**7/11 Shop Order:**");
      cart.forEach(item => {
        const product = PRODUCTS.find(p => p.id === item.productId);
        const unit = product?.units.find(u => u.name === item.unitName);
        if (product && unit) {
          const itemPrice = unit.price * item.count;
          total += itemPrice;
          
          const colorStr = item.color ? `${item.color} ` : "";
          lines.push(`- ${item.count}x ${unit.display} of ${colorStr}${product.name} (${itemPrice} diamonds)`);
        }
      });
      lines.push(`\n**Total Shop Price: ${total} diamonds**`);
    }

    onUpdate(lines.join("\n"), total);
  }, [cart, onUpdate]);

  const addToCart = () => {
    const product = PRODUCTS.find(p => p.id === selectedProduct);
    if (!product) return;

    const newItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      productId: selectedProduct,
      color: product.hasColor ? selectedColor : undefined,
      unitName: selectedUnit,
      count: 1
    };

    // Check if same item exists to merge
    const existingIndex = cart.findIndex(item => 
      item.productId === newItem.productId && 
      item.color === newItem.color && 
      item.unitName === newItem.unitName
    );

    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex].count += 1;
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newCount = Math.max(1, item.count + delta);
        return { ...item, count: newCount };
      }
      return item;
    }));
  };

  const currentProduct = PRODUCTS.find(p => p.id === selectedProduct);


  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-700 pb-4">
        <div className="p-2 bg-green-600 rounded-lg">
          <ShoppingCart className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">7/11 Shop Selection</h3>
          <p className="text-xs text-gray-400">Select items to add to your order</p>
        </div>
      </div>

      {/* Selection Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Item Type</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value as ProductType)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {PRODUCTS.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {currentProduct?.hasColor && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Color</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {MINECRAFT_COLORS.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Quantity / Unit</label>
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currentProduct?.units.map(u => (
              <option key={u.name} value={u.name}>
                {u.display} - {u.price} diamond{u.price > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={addToCart}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add to Order
          </button>
        </div>
      </div>

      {/* Cart Display */}
      {cart.length > 0 && (
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Current Order</h4>
          <div className="space-y-2">
            {cart.map(item => {
              const product = PRODUCTS.find(p => p.id === item.productId);
              const unit = product?.units.find(u => u.name === item.unitName);
              if (!product || !unit) return null;

              return (
                <div key={item.id} className="flex items-center justify-between bg-gray-800 p-3 rounded border border-gray-700">
                  <div className="flex-1">
                    <div className="text-white font-medium">
                      {item.color ? `${item.color} ` : ""}{product.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {unit.display} • {unit.price} dia/unit
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-gray-700 rounded">
                      <button 
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 text-gray-300 hover:text-white hover:bg-gray-600 rounded-l"
                      >
                        -
                      </button>
                      <span className="px-2 text-white font-mono">{item.count}</span>
                      <button 
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 text-gray-300 hover:text-white hover:bg-gray-600 rounded-r"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-yellow-400 font-bold w-16 text-right">
                      {item.count * unit.price} 💎
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
            <span className="text-gray-300">Total Price:</span>
            <span className="text-xl font-bold text-yellow-400">
              {cart.reduce((sum, item) => {
                const p = PRODUCTS.find(x => x.id === item.productId);
                const u = p?.units.find(x => x.name === item.unitName);
                return sum + (item.count * (u?.price || 0));
              }, 0)} Diamonds
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop711Selection;
