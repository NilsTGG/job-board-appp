import React, { useState } from 'react';
import { MessageCircle, MapPin, Diamond, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Submit Request",
    description: "Fill out the service form with your requirements",
    details: "Specify coordinates, items, urgency level, and payment offer",
    timeEstimate: "2 mins",
    color: "blue"
  },
  {
    id: 2,
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Discord Contact",
    description: "I'll message you on Discord for confirmation",
    details: "Final price confirmation and scheduling of pickup time",
    timeEstimate: "5-15 mins",
    color: "green"
  },
  {
    id: 3,
    icon: <MapPin className="h-6 w-6" />,
    title: "Meet & Pay",
    description: "Meet at the pickup location in-game",
    details: "Payment in diamonds, items transferred, route confirmed",
    timeEstimate: "3-5 mins",
    color: "yellow"
  },
  {
    id: 4,
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Job Complete",
    description: "Items delivered safely to destination",
    details: "Confirmation message sent, job marked as complete",
    timeEstimate: "Varies",
    color: "purple"
  }
];

const ProcessVisualization: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Simple, transparent process from request to completion. No hidden steps or surprises.
        </p>
      </div>

      {/* Desktop Timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-purple-500 opacity-30"></div>
          
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  activeStep === step.id ? 'transform scale-105' : 'hover:transform hover:scale-102'
                }`}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Step Circle */}
                <div className={`relative mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                  step.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                  step.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                  step.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                  'bg-gradient-to-br from-purple-500 to-purple-600'
                } ${activeStep === step.id ? 'ring-4 ring-white/20 shadow-lg' : ''}`}>
                  <div className="text-white">
                    {step.icon}
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 border-2 border-white rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {step.id}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{step.description}</p>
                  
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {step.timeEstimate}
                  </div>

                  {/* Expanded Details */}
                  {activeStep === step.id && (
                    <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-xl z-10 w-64 animate-fadeIn">
                      <div className="text-sm text-gray-300">
                        {step.details}
                      </div>
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 border-l border-t border-gray-700 rotate-45"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="md:hidden space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex gap-4">
            {/* Step Circle */}
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative ${
              step.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
              step.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
              step.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
              'bg-gradient-to-br from-purple-500 to-purple-600'
            }`}>
              <div className="text-white">
                {React.cloneElement(step.icon as React.ReactElement, { className: 'h-5 w-5' })}
              </div>
              
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-800 border-2 border-white rounded-full flex items-center justify-center text-xs font-bold text-white">
                {step.id}
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gray-600"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
              <p className="text-gray-400 text-sm mb-2">{step.description}</p>
              <p className="text-gray-500 text-xs mb-2">{step.details}</p>
              
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                Estimated: {step.timeEstimate}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Stats */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-8 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6">Process Guarantees</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">&lt; 30min</div>
              <div className="text-sm text-gray-300">Average Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">100%</div>
              <div className="text-sm text-gray-300">Upfront Price Transparency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">0%</div>
              <div className="text-sm text-gray-300">Hidden Fees or Surprises</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessVisualization;