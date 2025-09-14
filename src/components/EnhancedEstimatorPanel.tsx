import React, { useState } from "react";
import { ServiceType } from "./EnhancedServiceSelector";
import { Calculator, TrendingUp, AlertCircle } from "../icons";
import LoadingSpinner from "./LoadingSpinner";

export interface EstimateResult {
  diamonds: number | null;
  breakdown: string[];
}

interface Props {
  estimate: EstimateResult;
  serviceType: ServiceType;
  note?: string;
  isCalculating?: boolean;
  paymentOffer?: number | null;
}

const EnhancedEstimatorPanel: React.FC<Props> = ({
  estimate,
  serviceType,
  note,
  isCalculating = false,
  paymentOffer,
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  if (isCalculating) {
    return (
      <div className="rounded-lg border border-blue-600/50 bg-blue-900/20 p-4 text-sm text-blue-200">
        <div className="flex items-center gap-2">
          <LoadingSpinner size="small" color="blue" />
          <span>Calculating price...</span>
        </div>
      </div>
    );
  }

  if (!estimate.diamonds) return null;

  const priceComparison =
    paymentOffer && estimate.diamonds
      ? {
          difference: paymentOffer - estimate.diamonds,
          percentage: (
            ((paymentOffer - estimate.diamonds) / estimate.diamonds) *
            100
          ).toFixed(1),
        }
      : null;

  return (
    <div className="rounded-lg border border-blue-600 bg-gradient-to-br from-blue-900/40 to-purple-900/20 p-4 text-sm text-blue-200 animate-slideIn">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-semibold">
          <Calculator className="h-4 w-4" />
          Estimated Price
        </div>
        <button
          type="button"
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="text-xs text-blue-300 hover:text-blue-200 underline transition-colors"
        >
          {showBreakdown ? "Hide" : "Show"} breakdown
        </button>
      </div>

      {/* Main Price Display */}
      <div className="bg-blue-800/30 rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-blue-300 uppercase tracking-wide mb-1">
              Service:{" "}
              <span className="capitalize font-medium">{serviceType}</span>
            </div>
            <div className="text-xl font-bold text-white flex items-center gap-2">
              💎 {estimate.diamonds} diamonds
              {estimate.diamonds > 10 && (
                <span className="text-xs text-blue-300 font-normal">
                  (≈{Math.floor(estimate.diamonds / 64)} stacks +{" "}
                  {estimate.diamonds % 64})
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-1" />
            <div className="text-xs text-green-400 font-medium">Fair Price</div>
          </div>
        </div>
      </div>

      {/* Price Comparison */}
      {priceComparison && (
        <div
          className={`rounded-lg p-3 mb-3 ${
            priceComparison.difference >= 0
              ? "bg-green-800/20 border border-green-700/30"
              : "bg-red-800/20 border border-red-700/30"
          }`}
        >
          <div className="flex items-center gap-2 text-xs">
            <AlertCircle className="h-4 w-4" />
            <span className="font-medium">Your Offer vs. Estimate:</span>
          </div>
          <div className="mt-1">
            <span
              className={
                priceComparison.difference >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {priceComparison.difference >= 0 ? "+" : ""}
              {priceComparison.difference} diamonds (
              {priceComparison.percentage}%)
            </span>
            {priceComparison.difference >= 0 ? (
              <span className="text-green-300 text-xs block">
                Above estimate - great offer!
              </span>
            ) : (
              <span className="text-red-300 text-xs block">
                Below estimate - may need adjustment
              </span>
            )}
          </div>
        </div>
      )}

      {/* Detailed Breakdown */}
      {showBreakdown && (
        <div className="animate-fadeIn">
          <div className="text-xs text-blue-300 font-medium mb-2">
            Price Breakdown:
          </div>
          <div className="space-y-1">
            {estimate.breakdown.map((b, i) => (
              <div
                key={i}
                className="text-xs bg-blue-800/20 rounded px-2 py-1 flex items-center"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                {b}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-[10px] mt-3 text-blue-300 opacity-80 bg-blue-800/20 rounded p-2">
        <div className="font-medium mb-1">📋 Note:</div>
        {note ||
          "Final price confirmed after Discord DM. Special requirements or risks may adjust pricing."}
      </div>
    </div>
  );
};

export default EnhancedEstimatorPanel;
