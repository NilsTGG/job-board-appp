import React, { useState } from "react";
import { Search, ChevronDown, Tag, Clock, DollarSign, Shield, HelpCircle } from "lucide-react";

const faqData = [
  {
    id: 1,
    category: "pricing",
    question: "What if you die with my items?",
    answer: "If it's my fault and items are unrecoverable, I replace fair value or refund the fee. Risk-based quotes factor safety gear already. I carry backup equipment and use safe routes to minimize this risk.",
    tags: ["insurance", "safety", "refund"]
  },
  {
    id: 2,
    category: "payment",
    question: "Do I pay upfront?",
    answer: "Delivery & recovery: payment at pickup. Time blocks & large tasks: 50% upfront or collateral, rest on completion. Emergency services require full payment upfront to reserve your priority slot.",
    tags: ["payment", "upfront", "collateral"]
  },
  {
    id: 3,
    category: "service",
    question: "Can I cancel my order?",
    answer: "Free cancellation before work starts. After I begin: minimum 50% of agreed quote or used time portion. Emergency bookings are non-refundable once confirmed due to priority scheduling.",
    tags: ["cancellation", "refund", "policy"]
  },
  {
    id: 4,
    category: "service",
    question: "What counts as Emergency service?",
    answer: "Needs action within 15 minutes of DM confirmation or active death chest ticking down. Emergency rate (+100%) applies. Must be genuinely urgent - fake emergencies will be blacklisted.",
    tags: ["emergency", "urgent", "priority"]
  },
  {
    id: 5,
    category: "technical",
    question: "Which dimensions do you serve?",
    answer: "All dimensions supported. End rescue requires confirmation I'm available before void risk scenarios. Nether has +50% rate due to increased danger. Portal setups included when needed.",
    tags: ["dimensions", "nether", "end", "overworld"]
  },
  {
    id: 6,
    category: "pricing",
    question: "How is distance calculated?",
    answer: "Horizontal distance only (X and Z coordinates). Calculated in 100-block segments. Vertical changes (Y-level) don't affect pricing unless extreme terrain requires special equipment.",
    tags: ["distance", "calculation", "pricing"]
  },
  {
    id: 7,
    category: "service",
    question: "What's included in 'hazardous' pricing?",
    answer: "Dangerous biomes (soul sand valley, basalt deltas), heavy mob spawning areas, unstable terrain, or locations requiring special gear. +25% hazard rate covers additional safety measures and time.",
    tags: ["hazardous", "dangerous", "safety"]
  },
  {
    id: 8,
    category: "technical",
    question: "Can you transport modded items?",
    answer: "Vanilla servers only. No modded items, custom enchants, or special server items. Standard Minecraft items and blocks only. If unsure, ask before booking.",
    tags: ["modded", "vanilla", "items"]
  },
  {
    id: 9,
    category: "service",
    question: "What if you're offline when I need help?",
    answer: "Check my Discord status before booking. For planned services, we schedule a time. Emergencies require me to be online. No guarantees on instant availability - plan ahead when possible.",
    tags: ["availability", "offline", "scheduling"]
  },
  {
    id: 10,
    category: "pricing",
    question: "Do you offer bulk discounts?",
    answer: "Time blocks are the most cost-effective for multiple tasks. Villager transport has built-in multi-villager pricing. No special bulk rates - pricing is already competitive.",
    tags: ["bulk", "discount", "multiple"]
  },
  {
    id: 11,
    category: "payment",
    question: "What if I don't have enough diamonds?",
    answer: "Collateral accepted (valuable items held until payment). Payment plans for large jobs (discuss via Discord). No IOUs beyond 72 hours. Alternative payment only by special arrangement.",
    tags: ["payment", "collateral", "alternatives"]
  },
  {
    id: 12,
    category: "technical",
    question: "How do you ensure item security?",
    answer: "Professional approach: proper gear, safe routes, backup plans. Items carried in secured storage. No unnecessary risks taken. Full transparency on methods used for your specific job.",
    tags: ["security", "safety", "professional"]
  }
];

const categories = [
  { id: "all", name: "All Questions", icon: <HelpCircle className="h-4 w-4" />, count: faqData.length },
  { id: "pricing", name: "Pricing", icon: <DollarSign className="h-4 w-4" />, count: faqData.filter(f => f.category === "pricing").length },
  { id: "payment", name: "Payment", icon: <Tag className="h-4 w-4" />, count: faqData.filter(f => f.category === "payment").length },
  { id: "service", name: "Service", icon: <Clock className="h-4 w-4" />, count: faqData.filter(f => f.category === "service").length },
  { id: "technical", name: "Technical", icon: <Shield className="h-4 w-4" />, count: faqData.filter(f => f.category === "technical").length }
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

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = searchTerm === "" || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="max-w-5xl mx-auto px-4 py-16" id="faq">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Get answers to common questions about our services, pricing, and policies. 
          Can't find what you're looking for? Ask on Discord.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search FAQs by keyword, topic, or question..."
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
          >
            ×
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-white hover:border-gray-600'
            }`}
          >
            {category.icon}
            {category.name}
            <span className={`text-xs px-2 py-1 rounded-full ${
              activeCategory === category.id ? 'bg-blue-500' : 'bg-gray-700'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Results Count */}
      {(searchTerm || activeCategory !== "all") && (
        <div className="text-center mb-6 text-sm text-gray-400">
          Showing {filteredFAQs.length} of {faqData.length} questions
          {searchTerm && ` for "${searchTerm}"`}
        </div>
      )}

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">No matches found</h3>
            <p className="text-gray-500">Try adjusting your search terms or browse all categories</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-blue-400 hover:text-blue-300 underline"
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
                className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-300"
              >
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-750 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{faq.question}</h3>
                    <div className="flex flex-wrap gap-1">
                      {faq.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {isExpanded && (
                  <div className="px-6 pb-4 animate-fadeIn">
                    <div className="text-gray-300 text-sm leading-relaxed bg-gray-750 rounded p-4 border-l-4 border-blue-500">
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
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/20 rounded-2xl p-8 border border-blue-500/30">
          <HelpCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Still Have Questions?</h3>
          <p className="text-gray-300 mb-6">
            Can't find the answer you're looking for? I'm always happy to clarify details about services, pricing, or policies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                // Simulate Discord contact
                const toast = document.createElement('div');
                toast.className = 'fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                toast.textContent = 'Contact me on Discord: NilsTG';
                document.body.appendChild(toast);
                setTimeout(() => document.body.removeChild(toast), 3000);
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Ask on Discord
            </button>
            <a 
              href="#submit-job"
              className="text-blue-400 hover:text-blue-300 underline font-medium"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('submit-job')?.scrollIntoView({ behavior: 'smooth' });
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