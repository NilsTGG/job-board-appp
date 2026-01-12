import { useState } from "react";
import ServiceRequestApp from "./ServiceRequestApp";
import MarketplaceApp from "./MarketplaceApp";
import LandingPage from "./components/LandingPage";

import { Package, ShoppingBag, Home } from "lucide-react";

export type ViewMode = "home" | "services" | "marketplace";

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>("home");

  return (
    <div className="min-h-screen bg-brand-black text-white font-sans selection:bg-brand-primary selection:text-white">
      {/* Global Navigation Shell */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-md border-b border-brand-border shadow-lg h-20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentView("home")}
          >
            <div className="relative transform transition-transform group-hover:scale-110 duration-300">
              <Package className="h-8 w-8 text-brand-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-success rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-lg tracking-tight">
                Because You Won't™
              </div>
              <div className="text-xs text-brand-primary font-medium tracking-wide">
                Minecraft Services
              </div>
            </div>
          </div>

          {/* View Switcher */}
          <div className="flex bg-brand-surface p-1 rounded-xl border border-brand-border shadow-inner gap-1">
            <button
              onClick={() => setCurrentView("home")}
              className={`relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                currentView === "home"
                  ? "bg-gray-700 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-brand-border"
              }`}
              title="Home"
            >
              <Home className="h-4 w-4" />
            </button>
            <div className="w-[1px] bg-brand-border my-2 mx-1"></div>
            <button
              onClick={() => setCurrentView("services")}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                currentView === "services"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-400 hover:text-white hover:bg-brand-border"
              }`}
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Services</span>
            </button>
            <button
              onClick={() => setCurrentView("marketplace")}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                currentView === "marketplace"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/25"
                  : "text-gray-400 hover:text-white hover:bg-brand-border"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Shops</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className={`pt-20 ${currentView === "home" ? "pt-0" : ""}`}>
        {/* Reset padding for home since it has its own layout, actually let's keep nav fixed but LandingPage manages its spacing */}
        {currentView === "home" && (
          <div className="pt-20">
            {" "}
            {/* Add padding for fixed nav */}
            <LandingPage
              onNavigateToServices={() => setCurrentView("services")}
              onNavigateToMarketplace={() => setCurrentView("marketplace")}
            />
          </div>
        )}
        {currentView === "services" && (
          <ServiceRequestApp
            onNavigateToMarketplace={() => setCurrentView("marketplace")}
          />
        )}
        {currentView === "marketplace" && (
          <MarketplaceApp
            onNavigateToServices={() => setCurrentView("services")}
          />
        )}
      </div>
    </div>
  );
}

export default App;
