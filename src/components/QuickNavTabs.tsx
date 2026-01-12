import React, { useState } from "react";
import {
  Package,
  Clock,
  Users,
  HelpCircle,
  DollarSign,
  Star,
  ChevronDown,
  MessageCircle,
  ShoppingBag,
} from "../icons";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortLabel?: string;
  highlight?: boolean;
}

interface QuickNavTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  {
    id: "order",
    label: "Order Now",
    shortLabel: "Order",
    icon: <MessageCircle className="h-4 w-4" />,
    highlight: true,
  },
  {
    id: "services",
    label: "Services",
    shortLabel: "Services",
    icon: <Package className="h-4 w-4" />,
  },
  {
    id: "shops",
    label: "Partner Shops",
    shortLabel: "Shops",
    icon: <ShoppingBag className="h-4 w-4" />,
    highlight: true,
  },
  {
    id: "process",
    label: "How It Works",
    shortLabel: "Process",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: "trust",
    label: "Trust & Guarantees",
    shortLabel: "Trust",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "reviews",
    label: "Reviews",
    shortLabel: "Reviews",
    icon: <Star className="h-4 w-4" />,
  },
  {
    id: "faq",
    label: "FAQ",
    shortLabel: "FAQ",
    icon: <HelpCircle className="h-4 w-4" />,
  },
  {
    id: "budget",
    label: "Budget Menu",
    shortLabel: "Budget",
    icon: <DollarSign className="h-4 w-4" />,
  },
];

const QuickNavTabs: React.FC<QuickNavTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeTabData = tabs.find((t) => t.id === activeTab);

  return (
    <div
      id="quick-nav-tabs"
      className="sticky top-20 z-30 bg-brand-black/95 backdrop-blur-md border-b border-brand-border shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Tabs */}
        <div className="hidden md:flex items-center gap-1 py-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-brand-primary text-white shadow-lg"
                  : tab.highlight
                  ? "bg-brand-success/20 text-brand-success border border-brand-success/50 hover:bg-brand-success/30"
                  : "text-brand-muted hover:text-white hover:bg-brand-surface"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.highlight && activeTab !== tab.id && (
                <span className="bg-brand-success text-white text-xs px-1.5 py-0.5 rounded-full animate-pulse">
                  Go
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden py-2">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-brand-surface rounded-lg border border-brand-border"
          >
            <div className="flex items-center gap-2">
              {activeTabData?.icon}
              <span className="font-medium text-white">
                {activeTabData?.label}
              </span>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-brand-muted transition-transform ${
                isMobileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isMobileOpen && (
            <div className="absolute left-4 right-4 mt-2 bg-brand-surface border border-brand-border rounded-lg shadow-xl overflow-hidden z-50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-brand-primary text-white"
                      : "text-brand-muted hover:bg-brand-black/20"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickNavTabs;
