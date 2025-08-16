import React, { useState } from "react";
import { Package, Users, Wrench, Shield, Clock, Star, CheckCircle, TrendingUp } from "lucide-react";

const servicesData = [
  {
    id: "delivery",
    title: "📦 Delivery",
    icon: <Package className="h-6 w-6" />,
    desc: "Professional courier service for any items",
    bullets: [
      "Multi-shop delivery packages",
      "Player to player transport", 
      "Event material delivery",
    ],
    range: "5–25+ diamonds",
    completionRate: "99.2%",
    avgTime: "15 mins",
    totalJobs: "847",
    features: [
      "Insurance included",
      "All dimensions supported", 
      "Base item transport (farm to chest)",
      "Safe route planning"
    ]
  },
  {
    id: "villager",
    title: "👨‍🏭 Villager Transport",
    icon: <Users className="h-6 w-6" />,
    desc: "Safe villager relocation with insurance options",
    bullets: [
      "Portal setups and optimization",
      "Insurance coverage available",
      "Trading post relocation",
    ],
    range: "6–40+ diamonds",
    completionRate: "98.7%",
    avgTime: "25 mins",
    totalJobs: "312",
    features: [
      "Insurance options available",
      "Portal optimization",
      "Multi-villager transport",
      "Trades preserved"
    ]
  },
  {
    id: "task",
    title: "🧰 Custom Task",
    icon: <Wrench className="h-6 w-6" />,
    desc: "Miscellaneous errands and setups",
    bullets: [
      "Beacon placement services",
      "Event setup assistance", 
      "Base organization tasks",
    ],
    range: "5–40+ diamonds",
    completionRate: "97.5%",
    avgTime: "35 mins",
    totalJobs: "523",
    features: [
      "No mining or grinding",
      "Transport and setup only",
      "Event assistance",
      "Flexible task handling"
    ]
  },
  {
    id: "recovery",
    title: "🆘 Recovery / Rescue", 
    icon: <Shield className="h-6 w-6" />,
    desc: "Death chest recovery & rescue missions",
    bullets: [
      "Death chest retrieval",
      "Rescue missions for stuck players",
      "Abandoned transport job completion",
    ],
    range: "5–25 diamonds",
    completionRate: "99.8%",
    avgTime: "12 mins",
    totalJobs: "194",
    features: [
      "Emergency response",
      "All dimensions supported",
      "Rescue mission specialist", 
      "Fast completion times"
    ]
  },
  {
    id: "timeblock",
    title: "⏱ Time Block",
    icon: <Clock className="h-6 w-6" />,
    desc: "Buy pure focused minutes for any task",
    bullets: [
      "20 / 40 / 60 min options",
      "Stackable & roll once",
      "Great for mixed tasks",
    ],
    range: "1d / 10 min base",
    completionRate: "98.1%",
    avgTime: "Varies",
    totalJobs: "671",
    features: [
      "Flexible usage",
      "Roll unused time",
      "Multi-task support",
      "Best value option"
    ]
  },
];

interface ServiceCardProps {
  service: typeof servicesData[0];
  isExpanded: boolean;
  onToggle: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isExpanded, onToggle }) => {
  return (
    <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 ${
      isExpanded ? 'transform scale-105 ring-2 ring-blue-500/30' : ''
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            {service.icon}
          </div>
          <h3 className="text-lg font-semibold text-white">{service.title}</h3>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
            <CheckCircle className="h-4 w-4" />
            {service.completionRate}
          </div>
          <div className="text-xs text-gray-400">Success Rate</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4">{service.desc}</p>

      {/* Key Features */}
      <ul className="text-gray-400 text-sm space-y-1 mb-4">
        {service.bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
            {bullet}
          </li>
        ))}
      </ul>

      {/* Stats Row */}
      <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Avg: {service.avgTime}
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          {service.totalJobs} completed
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/20 rounded-lg p-3 mb-4">
        <div className="text-xs text-blue-300 mb-1">Typical Price Range</div>
        <div className="text-lg font-bold text-white">{service.range}</div>
      </div>

      {/* Expandable Features */}
      <button
        onClick={onToggle}
        className="w-full text-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
      >
        {isExpanded ? '▼ Hide Details' : '▶ Show All Features'}
      </button>

      {isExpanded && (
        <div className="mt-4 animate-fadeIn">
          <div className="text-sm font-medium text-white mb-2">🎯 What's Included:</div>
          <div className="grid grid-cols-2 gap-2">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 bg-gray-700/30 rounded p-2">
                <Star className="h-3 w-3 text-yellow-400 flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const EnhancedServiceCards: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (serviceId: string) => {
    setExpandedCard(expandedCard === serviceId ? null : serviceId);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16" id="services" aria-labelledby="services-heading">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 id="services-heading" className="text-3xl font-bold text-white mb-4">Professional Minecraft Services</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Expert logistics solutions for Minecraft players. Choose from our proven service portfolio with transparent pricing and guaranteed results.
        </p>
        
        {/* Trust Indicators */}
        <div className="flex justify-center gap-8 mt-6 text-sm" role="list" aria-label="Service statistics">
          <div className="flex items-center gap-2 text-green-400" role="listitem">
            <CheckCircle className="h-4 w-4" />
            <span>2,547+ Jobs Completed</span>
          </div>
          <div className="flex items-center gap-2 text-blue-400" role="listitem">
            <Star className="h-4 w-4" />
            <span>4.9/5 Average Rating</span>
          </div>
          <div className="flex items-center gap-2 text-purple-400" role="listitem">
            <Shield className="h-4 w-4" />
            <span>Zero Loss Guarantee</span>
          </div>
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Available services">
        {servicesData.map((service) => (
          <div key={service.id} role="listitem">
            <ServiceCard
            service={service}
            isExpanded={expandedCard === service.id}
            onToggle={() => toggleCard(service.id)}
          />
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
          <h3 className="text-xl font-bold text-white mb-2">Ready to Get Started?</h3>
          <p className="text-gray-300 mb-4">Join 500+ satisfied customers who trust us with their Minecraft tasks</p>
          <a 
            href="#submit-job"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('submit-job')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Package className="h-4 w-4" />
            Submit Your First Job
          </a>
        </div>
      </div>
    </section>
  );
};

export default EnhancedServiceCards;