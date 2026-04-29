import { useState } from "react";
import {
  Package,
  MapPin,
  MessageCircle,
  Clock,
  Sparkles,
  Zap,
  AlertCircle,
} from "./icons";
import EnhancedTrustSection from "./components/EnhancedTrustSection";
import EnhancedFAQ from "./components/EnhancedFAQ";
import EnhancedServiceCards from "./components/EnhancedServiceCards";
import ProcessVisualization from "./components/ProcessVisualization";

import Footer from "./components/Footer";

import ReviewsSection from "./components/ReviewsSection";
import QuickNavTabs from "./components/QuickNavTabs";
import BudgetMenu from "./components/BudgetMenu";
import ShopPartners from "./components/ShopPartners";

interface ServiceRequestAppProps {
  onNavigateToMarketplace?: () => void;
}

function ServiceRequestApp({
  onNavigateToMarketplace,
}: ServiceRequestAppProps) {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <div className="min-h-screen bg-brand-black text-white">
      {/* Global Warning Banner */}
      <div className="bg-yellow-500/10 border-b border-yellow-500/20 text-yellow-500 py-3 relative z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3 text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
          </span>
          Services are temporarily paused for academic focus. You may browse,
          but new orders cannot be placed.
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <div
        id="hero"
        className="relative overflow-hidden bg-brand-black border-b border-brand-border"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-brand-primary/5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-4 pt-6 pb-8 md:pt-8 md:pb-10">
          <div className="text-center">
            {/* Main Title */}
            <div className="flex items-center justify-center space-x-4 mb-3">
              <div className="relative">
                <Package className="h-16 w-16 text-brand-primary animate-bounce-slow" />
                <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
              </div>
              <div>
                <h1
                  className="text-[2.35rem] md:text-[2.75rem] font-extrabold tracking-tight text-white mb-1"
                  id="main-heading"
                >
                  Request A Service
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <Zap className="h-4 w-4 text-brand-primary" />
                  <p
                    className="text-sm text-gray-400 font-medium uppercase tracking-wider"
                    role="doc-subtitle"
                  >
                    Because You Won't™
                  </p>
                  <Zap className="h-4 w-4 text-brand-primary" />
                </div>
              </div>
            </div>

            {/* Enhanced Subtitle */}
            <div className="mb-4">
              <p className="text-[0.98rem] md:text-[1.05rem] text-gray-400 max-w-2xl mx-auto">
                Professional Minecraft logistics.
                <span className="text-brand-primary font-medium">
                  {" "}
                  Diamonds in → Problem gone.
                </span>
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-2.5 mt-4 text-sm">
                <div className="flex items-center gap-2 text-brand-success bg-brand-success/10 border border-brand-success/20 px-3 py-1.5 rounded-full">
                  <Package className="h-4 w-4" />
                  <span>2,547+ Deliveries</span>
                </div>
                <div className="flex items-center gap-2 text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-3 py-1.5 rounded-full">
                  <Clock className="h-4 w-4" />
                  <span>99.1% Success Rate</span>
                </div>
                <div className="flex items-center gap-2 text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3 py-1.5 rounded-full">
                  <MessageCircle className="h-4 w-4" />
                  <span>Zero Loss Guarantee</span>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-5">
              <button
                className="group bg-brand-primary hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-primary/25 flex items-center gap-2"
                onClick={() => {
                  setActiveTab("services");
                  setTimeout(() => {
                    document
                      .getElementById("quick-nav-tabs")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                <Package className="h-5 w-5" />
                Explore Services
              </button>

              <button
                className="group bg-brand-surface hover:bg-brand-surface/80 border border-brand-border hover:border-brand-primary text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                onClick={() => {
                  setActiveTab("process");
                  setTimeout(() => {
                    document
                      .getElementById("quick-nav-tabs")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                <MapPin className="h-5 w-5 group-hover:text-blue-400" />
                How It Works
              </button>

              {onNavigateToMarketplace && (
                <button
                  className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center gap-2"
                  onClick={onNavigateToMarketplace}
                >
                  <Sparkles className="h-5 w-5" />
                  Partner Shops
                </button>
              )}
            </div>

            {/* Enhanced Key Points */}
            <div className="text-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-wide text-gray-400 bg-brand-surface px-4 py-2 rounded-full border border-brand-border max-w-xl">
                <span>💎 Diamonds Only</span>
                <span>•</span>
                <span>📦 No Bulk Farming</span>
                <span>•</span>
                <span>📋 Clear Quotes</span>
              </div>
              <p className="text-gray-500 mt-2.5 text-sm">
                Professional service with transparent pricing • Discord:{" "}
                <span className="text-brand-primary font-bold">NilsTG</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Navigation - Right after hero for visibility */}
      <QuickNavTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tabbed Content Area */}
      <div className="min-h-[600px]">
        {/* Order Form Tab */}
        {activeTab === "order" && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mx-auto max-w-5xl" id="submit-job">
              <div className="overflow-hidden rounded-3xl border border-yellow-500/25 bg-brand-surface shadow-2xl shadow-brand-black/45">
                <div className="border-b border-yellow-500/20 bg-yellow-500/10 px-6 py-4 sm:px-8">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-yellow-500/15 p-3 text-yellow-400">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold tracking-tight text-white">
                          Service requests are paused
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-yellow-100/80">
                          I am not taking new Minecraft service jobs right now.
                          Browse the service menu, pricing, reviews, and FAQ for
                          reference, but do not expect a submission form or DM
                          confirmation until ordering reopens.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-full border border-yellow-500/20 bg-brand-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-yellow-300">
                      Browse-only mode
                    </div>
                  </div>
                </div>

                <div className="space-y-8 px-6 py-8 sm:px-8">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-brand-border bg-brand-black/35 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">
                        What you can do now
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-300">
                        Browse service types, pricing, guarantees, reviews, and
                        policies before deciding whether to come back later.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-brand-border bg-brand-black/35 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">
                        What is paused
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-300">
                        No request form, no queue slot, no Discord confirmation,
                        and no promise of immediate turnaround while the pause is
                        active.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-brand-border bg-brand-black/35 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">
                        Best next step
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-300">
                        Use the tabs below to review services and pricing, or
                        jump to the partner shops if you still need items today.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <button
                      type="button"
                      onClick={() => setActiveTab("services")}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-blue-600"
                    >
                      <Package className="h-4 w-4" />
                      Explore services
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("process")}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-brand-black/35 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:border-brand-primary hover:bg-brand-surface"
                    >
                      <Clock className="h-4 w-4" />
                      See how it works
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("faq")}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-brand-black/35 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:border-brand-primary hover:bg-brand-surface"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Read the FAQ
                    </button>
                    {onNavigateToMarketplace && (
                      <button
                        type="button"
                        onClick={onNavigateToMarketplace}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-brand-black/35 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:border-brand-accent hover:bg-brand-surface"
                      >
                        <Sparkles className="h-4 w-4" />
                        Browse partner shops
                      </button>
                    )}
                  </div>

                  <div className="rounded-2xl border border-brand-border bg-brand-black/35 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-brand-success" />
                      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/90">
                        Before ordering reopens
                      </h3>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {[
                        "Check service categories to see what is offered.",
                        "Use pricing and payment sections to set expectations.",
                        "Read guarantees and FAQ so there are no surprises later.",
                        "If you need items today, use the marketplace instead of waiting on service intake.",
                      ].map((item, index) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-xl border border-brand-border/70 bg-brand-surface/40 px-3 py-3"
                        >
                          <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary/15 text-xs font-bold text-brand-primary">
                            {index + 1}
                          </span>
                          <p className="text-sm leading-relaxed text-gray-300">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div>
            <EnhancedServiceCards />
          </div>
        )}

        {/* Partner Shops Tab */}
        {activeTab === "shops" && onNavigateToMarketplace && (
          <div id="shops">
            <ShopPartners onNavigateToMarketplace={onNavigateToMarketplace} />
          </div>
        )}

        {/* Process Tab */}
        {activeTab === "process" && (
          <div id="process">
            <ProcessVisualization />
          </div>
        )}

        {/* Trust Tab */}
        {activeTab === "trust" && (
          <div>
            <EnhancedTrustSection />
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && <ReviewsSection />}

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div>
            <EnhancedFAQ />
          </div>
        )}

        {/* Budget Menu Tab */}
        {activeTab === "budget" && (
          <div id="budget-options">
            <BudgetMenu />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ServiceRequestApp;
