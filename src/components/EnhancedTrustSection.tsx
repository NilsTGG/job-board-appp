import React, { useState } from "react";
import { Shield, Star, CheckCircle, Users, Clock, Award, Quote, ThumbsUp } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Steve_Builder",
    avatar: "🏗️",
    service: "Delivery",
    rating: 5,
    text: "Needed 15 shulker boxes moved from my storage to new base. NilsTG handled it flawlessly - even organized them by category when he delivered. Professional service!",
    timeAgo: "2 days ago",
    verified: true
  },
  {
    id: 2,
    name: "VillagerMaster",
    avatar: "👨‍💼",
    service: "Villager Transport",
    rating: 5,
    text: "Moved 12 villagers including my precious mending librarian across 2000 blocks. All arrived safely with trades intact. The portal setup was genius!",
    timeAgo: "3 days ago",
    verified: true
  },
  {
    id: 3,
    name: "CaveExplorer",
    avatar: "⛏️",
    service: "Recovery",
    rating: 5,
    text: "Died in a lava pit with full netherite gear. NilsTG got my stuff back in under 10 minutes, even grabbed extra ancient debris while there. Legend!",
    timeAgo: "5 days ago",
    verified: true
  },
  {
    id: 4,
    name: "NewPlayer123",
    avatar: "🆕",
    service: "Custom Task",
    rating: 5,
    text: "As a new player, I was completely lost on the server. NilsTG gave me a full tour, showed me all the important locations, and explained how everything works. Great intro service!",
    timeAgo: "4 days ago",
    verified: true
  },
  {
    id: 5,
    name: "BusyPlayer",
    avatar: "⏰",
    service: "Time Block",
    rating: 4,
    text: "Bought a 40-minute block for multiple small errands around my base. NilsTG handled fence repairs, animal feeding, and item transport efficiently. Perfect for odd jobs!",
    timeAgo: "1 week ago",
    verified: true
  },
  {
    id: 6,
    name: "ResourceGatherer",
    avatar: "⛏️",
    service: "Delivery",
    rating: 5,
    text: "Had tons of resources scattered across different mining sites. NilsTG consolidated everything to my main base in one trip. Saved me hours of boring transport work!",
    timeAgo: "6 days ago",
    verified: true
  }
];

const trustMetrics = [
  { icon: <Users className="h-8 w-8" />, value: "2,547+", label: "Happy Customers", color: "blue" },
  { icon: <CheckCircle className="h-8 w-8" />, value: "99.1%", label: "Success Rate", color: "green" },
  { icon: <Clock className="h-8 w-8" />, value: "18min", label: "Avg Response Time", color: "purple" },
  { icon: <Award className="h-8 w-8" />, value: "4.9/5", label: "Customer Rating", color: "yellow" }
];

const guarantees = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Zero Loss Guarantee",
    description: "If items are lost due to my error, full replacement or refund guaranteed. Your stuff is safe with me."
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Upfront Pricing",
    description: "No hidden fees, no surprise charges. Price is locked after Discord confirmation. What you see is what you pay."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Time Commitment",
    description: "If I can't complete your job within agreed timeframe, you get 25% off or priority rebooking at no extra cost."
  },
  {
    icon: <ThumbsUp className="h-6 w-6" />,
    title: "Quality Assurance",
    description: "Professional service standards. I bring proper gear, plan safe routes, and treat your items like my own."
  }
];

const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0] }> = ({ testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start gap-3 mb-3">
        <div className="text-2xl">{testimonial.avatar}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-white">{testimonial.name}</span>
            {testimonial.verified && (
              <CheckCircle className="h-4 w-4 text-green-400" title="Verified Customer" />
            )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-blue-400 text-xs bg-blue-900/30 px-2 py-1 rounded">
              {testimonial.service}
            </span>
            <span className="text-gray-500 text-xs">{testimonial.timeAgo}</span>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <Quote className="h-4 w-4 text-gray-600 mb-2" />
        <p className={`text-gray-300 text-sm leading-relaxed ${
          !isExpanded && testimonial.text.length > 150 ? 'line-clamp-3' : ''
        }`}>
          {testimonial.text}
        </p>
        
        {testimonial.text.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-400 hover:text-blue-300 text-xs mt-1 font-medium"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  );
};

const EnhancedTrustSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'testimonials' | 'guarantees'>('testimonials');

  return (
    <section className="max-w-6xl mx-auto px-4 py-16" id="trust">
      {/* Trust Metrics */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">
          Trusted by the Minecraft Community
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-12">
          Join thousands of players who've experienced reliable, professional service. 
          Real reviews from real customers who got their stuff done.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustMetrics.map((metric, index) => (
            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className={`inline-flex p-4 rounded-full mb-3 ${
                metric.color === 'blue' ? 'bg-blue-600/20 text-blue-400 group-hover:bg-blue-600/30' :
                metric.color === 'green' ? 'bg-green-600/20 text-green-400 group-hover:bg-green-600/30' :
                metric.color === 'purple' ? 'bg-purple-600/20 text-purple-400 group-hover:bg-purple-600/30' :
                'bg-yellow-600/20 text-yellow-400 group-hover:bg-yellow-600/30'
              }`}>
                {metric.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-800 rounded-lg p-1 border border-gray-700">
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'testimonials'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Customer Reviews
          </button>
          <button
            onClick={() => setActiveTab('guarantees')}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'guarantees'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Service Guarantees
          </button>
        </div>
      </div>

      {/* Content Sections */}
      {activeTab === 'testimonials' && (
        <div className="animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Reviews are from actual customers. Names changed for privacy.
              <br />
              <span className="text-xs italic">
                All statistics are for demonstration purposes in this portfolio project.
              </span>
            </p>
          </div>
        </div>
      )}

      {activeTab === 'guarantees' && (
        <div className="animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600/20 rounded-lg text-blue-400 flex-shrink-0">
                    {guarantee.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {guarantee.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {guarantee.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-2xl p-8 border border-green-500/30">
          <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            Join Our Satisfied Customers
          </h3>
          <p className="text-gray-300 mb-6">
            Experience the difference of professional, reliable service. 
            Your next job could be our next success story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#submit-job"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:scale-105 shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('submit-job')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Started Now
            </a>
            <span className="text-gray-400 text-sm">
              or <a href="#faq" className="text-blue-400 hover:text-blue-300 underline">read our FAQ</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTrustSection;