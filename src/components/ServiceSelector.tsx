import React from "react";

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

const services: { key: ServiceType; label: string; blurb: string }[] = [
  { key: "delivery", label: "Delivery", blurb: "Move items A → B" },
  { key: "villager", label: "Villager Transport", blurb: "Relocate villagers" },
  { key: "task", label: "Custom Task", blurb: "Infrastructure / errands" },
  { key: "recovery", label: "Recovery / Rescue", blurb: "Death chest help" },
  { key: "timeblock", label: "Time Block", blurb: "Buy pure work minutes" },
];

const ServiceSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <fieldset className="space-y-3" aria-label="Service Type Selection">
      <legend className="text-white font-medium mb-1">Service Type</legend>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {services.map((s) => {
          const active = value === s.key;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => onChange(s.key)}
              className={[
                "rounded-lg p-3 text-left border text-sm transition",
                active
                  ? "bg-blue-700 border-blue-500 shadow-inner"
                  : "bg-gray-700 border-gray-600 hover:border-blue-500 hover:bg-gray-650",
              ].join(" ")}
              aria-pressed={active}
            >
              <div className="font-semibold text-white leading-tight">
                {s.label}
              </div>
              <div className="text-gray-300 text-xs mt-1">{s.blurb}</div>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};

export default ServiceSelector;
