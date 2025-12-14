import { useState } from "react";
import ServiceRequestApp from "./ServiceRequestApp";
import MarketplaceApp from "./MarketplaceApp";
import Navigation from "./components/Navigation";
import { Package, ShoppingBag } from "lucide-react";

export type ViewMode = "services" | "marketplace";

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>("services");

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Global Navigation Shell */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg h-20">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setCurrentView("services")}
          >
            <div className="relative">
              <Package className="h-8 w-8 text-blue-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-lg">
                Because You Won't™
              </div>
              <div className="text-xs text-gray-400">Minecraft Services</div>
            </div>
          </div>

          {/* View Switcher */}
          <div className="flex bg-gray-800 p-1.5 rounded-xl border border-gray-700 shadow-inner">
            <button
              onClick={() => setCurrentView("services")}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${
                currentView === "services"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 scale-105"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <Package className="h-4 w-4" />
              <span className="font-medium">Services</span>
              {currentView === "services" && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              )}
            </button>
            <button
              onClick={() => setCurrentView("marketplace")}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${
                currentView === "marketplace"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/25 scale-105"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="font-medium">Marketplace</span>
              {currentView === "marketplace" && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="pt-20">
        {currentView === "services" ? (
          <ServiceRequestApp />
        ) : (
          <MarketplaceApp />
        )}
      </div>
    </div>
  );
}

export default App;
