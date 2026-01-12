import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Tag,
  Clock,
  DollarSign,
  Shield,
  HelpCircle,
} from "../icons";

const faqData = [
  {
    id: 1,
    category: "pricing",
    question: "What if you die with my items?",
    answer:
      "If it's my fault and items are unrecoverable, I replace fair value or refund the fee. Risk-based quotes factor safety gear already. I carry backup equipment and use safe routes to minimize this risk.",
    tags: ["insurance", "safety", "refund"],
  },
  {
    id: 2,
    category: "payment",
    question: "Do I pay upfront?",
    answer:
      "Delivery & recovery: payment at pickup. Time blocks & large tasks: 50% upfront or collateral, rest on completion. Emergency services require full payment upfront to reserve your priority slot.",
    tags: ["payment", "upfront", "collateral"],
  },
  {
    id: 3,
    category: "service",
    question: "Can I cancel my order?",
    answer:
      "Free cancellation before work starts. After I begin: minimum 50% of agreed quote or used time portion. Emergency bookings are non-refundable once confirmed due to priority scheduling.",
    tags: ["cancellation", "refund", "policy"],
  },
  {
    id: 4,
    category: "service",
    question: "What counts as Emergency service?",
    answer:
      "Needs action within 15 minutes of DM confirmation or active death chest ticking down. Emergency rate (+100%) applies. Must be genuinely urgent - fake emergencies will be blacklisted.",
    tags: ["emergency", "urgent", "priority"],
  },
  {
    id: 5,
    category: "technical",
    question: "Which dimensions do you serve?",
    answer:
      "All dimensions supported. End rescue requires confirmation I'm available before void risk scenarios. Nether has +50% rate due to increased danger. Portal setups included when needed.",
    tags: ["dimensions", "nether", "end", "overworld"],
  },
  {
    id: 6,
    category: "pricing",
    question: "How is distance calculated?",
    answer:
      "Horizontal distance only (X and Z coordinates). Calculated in 100-block segments. Vertical changes (Y-level) don't affect pricing unless extreme terrain requires special equipment.",
    tags: ["distance", "calculation", "pricing"],
  },
  {
    id: 7,
    category: "service",
    question: "What's included in 'hazardous' pricing?",
    answer:
      "Dangerous biomes (soul sand valley, basalt deltas), heavy mob spawning areas, unstable terrain, or locations requiring special gear. +25% hazard rate covers additional safety measures and time.",
    tags: ["hazardous", "dangerous", "safety"],
  },
  {
    id: 8,
    category: "technical",
    question: "Can you transport modded items?",
    answer:
      "Vanilla servers only. No modded items, custom enchants, or special server items. Standard Minecraft items and blocks only. If unsure, ask before booking.",
    tags: ["modded", "vanilla", "items"],
  },
  {
    id: 9,
    category: "service",
    question: "What if you're offline when I need help?",
    answer:
      "Check my Discord status before booking. For planned services, we schedule a time. Emergencies require me to be online. No guarantees on instant availability - plan ahead when possible.",
    tags: ["availability", "offline", "scheduling"],
  },
  {
    id: 10,
    category: "pricing",
    question: "Do you offer bulk discounts?",
    answer:
      "Time blocks are the most cost-effective for multiple tasks. Villager transport has built-in multi-villager pricing. No special bulk rates - pricing is already competitive.",
    tags: ["bulk", "discount", "multiple"],
  },
  {
    id: 11,
    category: "payment",
    question: "What if I don't have enough diamonds?",
    answer:
      "Collateral accepted (valuable items held until payment). Payment plans for large jobs (discuss via Discord). No IOUs beyond 72 hours. Alternative payment only by special arrangement.",
    tags: ["payment", "collateral", "alternatives"],
  },
  {
    id: 12,
    category: "technical",
    question: "How do you ensure item security?",
    answer:
      "Professional approach: proper gear, safe routes, backup plans. Items carried in secured storage. No unnecessary risks taken. Full transparency on methods used for your specific job.",
    tags: ["security", "safety", "professional"],
  },
];

const categories = [
  {
    id: "all",
    name: "All Questions",
    icon: <HelpCircle className="h-4 w-4" />,
    count: faqData.length,
  },
  {
    id: "pricing",
    name: "Pricing",
    icon: <DollarSign className="h-4 w-4" />,
    count: faqData.filter((f) => f.category === "pricing").length,
  },
  {
    id: "payment",
    name: "Payment",
    icon: <Tag className="h-4 w-4" />,
    count: faqData.filter((f) => f.category === "payment").length,
  },
  {
    id: "service",
    name: "Service",
    icon: <Clock className="h-4 w-4" />,
    count: faqData.filter((f) => f.category === "service").length,
  },
  {
    id: "technical",
    name: "Technical",
    icon: <Shield className="h-4 w-4" />,
    count: faqData.filter((f) => f.category === "technical").length,
  },
];

const EnhancedFAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      searchTerm === "" ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <section
      className="max-w-5xl mx-auto px-4 py-16"
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="text-center mb-12">
        <h2 id="faq-heading" className="text-3xl font-bold text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-brand-muted text-lg max-w-2xl mx-auto">
          Get answers to common questions about our services, pricing, and
          policies. Can't find what you're looking for? Ask on Discord.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <label htmlFor="faq-search" className="sr-only">
          Search frequently asked questions
        </label>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-brand-muted" />
        </div>
        <input
          id="faq-search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-brand-surface border border-brand-border rounded-lg text-brand-gray-100 placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
          placeholder="Search FAQs by keyword, topic, or question..."
          aria-describedby="search-help"
        />
        <div id="search-help" className="sr-only">
          Search through {faqData.length} frequently asked questions by keyword,
          topic, or question content
        </div>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-muted hover:text-white transition-colors"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div
        className="flex flex-wrap gap-2 mb-8 justify-center"
        role="tablist"
        aria-label="FAQ categories"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeCategory === category.id
                ? "bg-brand-primary text-white shadow-lg"
                : "bg-brand-surface text-brand-muted border border-brand-border hover:text-white hover:border-brand-gray-600"
            }`}
            role="tab"
            aria-selected={activeCategory === category.id}
            aria-controls="faq-content"
          >
            {category.icon}
            {category.name}
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                activeCategory === category.id
                  ? "bg-white/20 text-white"
                  : "bg-brand-black/50 text-brand-muted"
              }`}
            >
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Results Count */}
      {(searchTerm || activeCategory !== "all") && (
        <div
          className="text-center mb-6 text-sm text-brand-muted"
          role="status"
          aria-live="polite"
        >
          Showing {filteredFAQs.length} of {faqData.length} questions
          {searchTerm && ` for "${searchTerm}"`}
        </div>
      )}

      {/* FAQ Items */}
      <div id="faq-content" className="space-y-4" role="tabpanel">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="h-16 w-16 text-brand-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-brand-muted mb-2">
              No Questions Found
            </h3>
            <p className="text-brand-muted/70">
              Try adjusting your search terms or browse all categories
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-brand-primary hover:text-blue-300 underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          filteredFAQs.map((faq) => {
            const isExpanded = expandedItems.has(faq.id);
            return (
              <div
                key={faq.id}
                className={`bg-brand-surface border rounded-lg overflow-hidden transition-all duration-300 ${
                  isExpanded
                    ? "border-brand-primary/50"
                    : "border-brand-border hover:border-brand-gray-600"
                }`}
              >
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-brand-white/5 transition-colors"
                  aria-expanded={isExpanded}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex-1">
                    <h3
                      className={`font-medium mb-1 transition-colors ${
                        isExpanded
                          ? "text-brand-primary"
                          : "text-brand-gray-100"
                      }`}
                      id={`faq-question-${faq.id}`}
                    >
                      {faq.question}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {faq.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-brand-black/30 text-brand-muted rounded border border-brand-border/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-brand-muted transition-transform duration-200 flex-shrink-0 ml-4 ${
                      isExpanded ? "rotate-180 text-brand-primary" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isExpanded && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-6 pb-4 animate-fadeIn"
                    role="region"
                    aria-labelledby={`faq-question-${faq.id}`}
                  >
                    <div className="text-brand-gray-200 text-sm leading-relaxed bg-brand-black/20 rounded p-4 border-l-4 border-brand-primary">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Contact CTA */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 rounded-2xl p-8 border border-brand-primary/20">
          <HelpCircle className="h-12 w-12 text-brand-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            Still Have Questions?
          </h3>
          <p className="text-brand-muted mb-6">
            Can't find the answer you're looking for? I'm always happy to
            clarify details about services, pricing, or policies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                // Simulate Discord contact
                const toast = document.createElement("div");
                toast.className =
                  "fixed bottom-4 right-4 bg-brand-primary text-white px-6 py-3 rounded-lg shadow-lg z-50";
                toast.textContent = "Contact me on Discord: NilsTG";
                document.body.appendChild(toast);
                setTimeout(() => document.body.removeChild(toast), 3000);
              }}
              className="bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Ask on Discord
            </button>
            <a
              href="#submit-job"
              className="text-brand-primary hover:text-blue-300 underline font-medium"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("submit-job")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              or Submit a Job Request
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedFAQ;
