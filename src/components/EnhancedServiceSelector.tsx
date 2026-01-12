import React, { useState } from "react";
import { Package, Users, Wrench, Shield, Clock } from "../icons";

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
    examples: [
      "Multi-shop packages",
      "Base to base transport",
      "Event material delivery",
    ],
  },
  {
    key: "villager",
    label: "Villager Transport",
    blurb: "Relocate villagers safely",
    icon: <Users className="h-5 w-5" />,
    examples: [
      "Librarian transport",
      "Trading post setup",
      "Villager relocation (insurance available)",
    ],
  },
  {
    key: "task",
    label: "Custom Task",
    blurb: "Miscellaneous errands",
    icon: <Wrench className="h-5 w-5" />,
    examples: [
      "Beacon placement",
      "Base item transport",
      "Event setup assistance",
    ],
  },
  {
    key: "recovery",
    label: "Recovery / Rescue",
    blurb: "Death chest & rescue missions",
    icon: <Shield className="h-5 w-5" />,
    examples: [
      "Death chest retrieval",
      "Stuck player rescue",
      "Abandoned transport job completion",
    ],
  },
  {
    key: "timeblock",
    label: "Time Block",
    blurb: "Buy focused work minutes",
    icon: <Clock className="h-5 w-5" />,
    examples: [
      "Multiple small deliveries",
      "Mixed errands",
      "Flexible task time",
      "Flexible task time",
    ],
  },
];

const EnhancedServiceSelector: React.FC<Props> = ({ value, onChange }) => {
  const [hoveredService, setHoveredService] = useState<ServiceType | null>(
    null
  );

  return (
    <fieldset className="space-y-4" aria-labelledby="service-legend">
      <legend id="service-legend" className="text-white font-medium mb-2">
        Choose Your Service Type
        <span className="text-xs text-gray-400 block font-normal mt-1">
          Select the type of service you need help with
        </span>
      </legend>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        role="radiogroup"
        aria-labelledby="service-legend"
      >
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
                  ? "bg-brand-primary border-brand-primary shadow-lg shadow-brand-primary/25 scale-105 ring-2 ring-brand-primary/50"
                  : "bg-brand-surface border-brand-border hover:border-brand-primary hover:bg-brand-surface/80 hover:scale-[1.02]",
                "group",
              ].join(" ")}
              role="radio"
              aria-checked={active}
              aria-describedby={`service-${s.key}-desc`}
            >
              {s.popular && (
                <div className="absolute -top-2 -right-2 bg-brand-accent text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse shadow-lg">
                  Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    active
                      ? "bg-brand-black/20"
                      : "bg-brand-border group-hover:bg-brand-primary"
                  }`}
                >
                  {s.icon}
                </div>
                <div className="font-bold text-white leading-tight">
                  {s.label}
                </div>
              </div>

              <div
                id={`service-${s.key}-desc`}
                className={`text-xs mb-3 ${
                  active ? "text-white/90" : "text-gray-400"
                }`}
              >
                {s.blurb}
              </div>

              {(active || hovered) && (
                <div className="space-y-1 animate-fadeIn">
                  <div
                    className={`text-xs font-bold mb-1 ${
                      active ? "text-white" : "text-brand-primary"
                    }`}
                  >
                    Examples:
                  </div>
                  {s.examples.slice(0, 2).map((example, idx) => (
                    <div
                      key={idx}
                      className={`text-xs flex items-center ${
                        active ? "text-white/80" : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-1 h-1 rounded-full mr-2 ${
                          active ? "bg-white" : "bg-brand-primary"
                        }`}
                      ></div>
                      {example}
                    </div>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="text-xs text-gray-500 bg-brand-black/50 rounded-lg p-3 border border-brand-border">
        <div className="font-bold text-gray-400 mb-1">💡 Pro Tip:</div>
        Unsure which service to choose? Select "Time Block" for multiple small
        tasks or "Custom Task" for infrastructure work.
      </div>
    </fieldset>
  );
};

export default EnhancedServiceSelector;
