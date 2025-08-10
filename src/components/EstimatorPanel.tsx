import React from "react";
import { ServiceType } from "./ServiceSelector";

export interface EstimateResult {
  diamonds: number | null;
  breakdown: string[];
}

interface Props {
  estimate: EstimateResult;
  serviceType: ServiceType;
  note?: string;
}

const EstimatorPanel: React.FC<Props> = ({ estimate, serviceType, note }) => {
  if (!estimate.diamonds) return null;
  return (
    <div className="rounded-lg border border-blue-600 bg-blue-900/30 p-4 text-sm text-blue-200">
      <div className="font-semibold mb-1">Estimated Price</div>
      <div className="flex flex-col gap-1 text-xs">
        <div>
          Service: <span className="capitalize">{serviceType}</span>
        </div>
        {estimate.breakdown.map((b, i) => (
          <div key={i}>{b}</div>
        ))}
        <div className="mt-1 font-semibold text-blue-300">
          ≈ {estimate.diamonds} diamonds
        </div>
      </div>
      <div className="text-[10px] mt-2 text-blue-300 opacity-80">
        {note ||
          "Final price confirmed after DM; special edge cases may adjust."}
      </div>
    </div>
  );
};

export default EstimatorPanel;
