import React, { useState } from "react";
import { Package, Users, Wrench, Shield, Clock } from "lucide-react";

export type ServiceType =
  | "delivery"
  | "villager"
  | "task"
  | "recovery"
  | "timeblock";

interface Props {
  value: ServiceType;
  onChange: (s: ServiceType) => void;
}

const services: { 
  key: ServiceType; 
  label: string; 
  blurb: string;
  icon: React.ReactNode;
  popular?: boolean;
  examples: string[];
}[] = [
  { 
    key: "delivery", 
    label: "Delivery", 
    blurb: "Move items A → B",
    icon: <Package className="h-5 w-5" />,
    popular: true,
    examples: ["64 oak logs", "Diamond tools", "Building materials"]
  },
  { 
    key: "villager", 
    label: "Villager Transport", 
    blurb: "Relocate villagers",
    icon: <Users className="h-5 w-5" />,
    examples: ["Librarian transport", "Villager breeding setup", "Trading post relocation"]
  },
  { 
    key: "task", 
    label: "Custom Task", 
    blurb: "Infrastructure / errands",
    icon: <Wrench className="h-5 w-5" />,
    examples: ["Chest sorting", "Small builds", "Redstone setup"]
  },
  { 
    key: "recovery", 
    label: "Recovery / Rescue", 
    blurb: "Death chest help",
    icon: <Shield className="h-5 w-5" />,
    examples: ["Death chest retrieval", "Stuck player rescue", "Item recovery"]
  },
  { 
    key: "timeblock", 
    label: "Time Block", 
    blurb: "Buy pure work minutes",
    icon: <Clock className="h-5 w-5" />,
    examples: ["Mixed tasks", "Flexible work time", "Multiple small jobs"]
  },
];

const EnhancedServiceSelector: React.FC<Props> = ({ value, onChange }) => {
  const [hoveredService, setHoveredService] = useState<ServiceType | null>(null);

  return (
    <fieldset className="space-y-4" aria-label="Service Type Selection">
      <legend className="text-white font-medium mb-2">
        Choose Your Service Type
        <span className="text-xs text-gray-400 block font-normal mt-1">
          Select the type of service you need help with
        </span>
      </legend>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {services.map((s) => {
          const active = value === s.key;
          const hovered = hoveredService === s.key;
          
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => onChange(s.key)}
              onMouseEnter={() => setHoveredService(s.key)}
              onMouseLeave={() => setHoveredService(null)}
              className={[
                "relative rounded-lg p-4 text-left border text-sm transition-all duration-200 transform",
                active
                  ? "bg-gradient-to-br from-blue-700 to-blue-800 border-blue-500 shadow-lg scale-105 ring-2 ring-blue-400"
                  : "bg-gray-700 border-gray-600 hover:border-blue-500 hover:bg-gray-650 hover:scale-102",
                "group"
              ].join(" ")}
              aria-pressed={active}
            >
              {s.popular && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                  Popular
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg transition-colors ${
                  active ? 'bg-blue-600' : 'bg-gray-600 group-hover:bg-blue-600'
                }`}>
                  {s.icon}
                </div>
                <div className="font-semibold text-white leading-tight">
                  {s.label}
                </div>
              </div>
              
              <div className="text-gray-300 text-xs mb-3">{s.blurb}</div>
              
              {(active || hovered) && (
                <div className="space-y-1 animate-fadeIn">
                  <div className="text-xs font-medium text-blue-300 mb-1">Examples:</div>
                  {s.examples.slice(0, 2).map((example, idx) => (
                    <div key={idx} className="text-xs text-gray-400 flex items-center">
                      <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                      {example}
                    </div>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="text-xs text-gray-500 bg-gray-800/50 rounded-lg p-3 border border-gray-700">
        <div className="font-medium text-gray-400 mb-1">💡 Pro Tip:</div>
        Not sure which service fits your need? Choose "Time Block" for mixed tasks or "Custom Task" for anything infrastructure-related.
      </div>
    </fieldset>
  );
};

export default EnhancedServiceSelector;