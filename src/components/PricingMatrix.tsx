import React from "react";

const PricingMatrix: React.FC = () => {
  return (
    <div
      className="bg-brand-surface rounded-lg p-6 border border-brand-border"
      id="pricing"
    >
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="text-yellow-400">💎</span> Pricing Overview
      </h3>
      <div className="text-xs text-gray-300 space-y-3">
        <div className="bg-brand-black rounded p-3 border border-brand-border">
          <div className="font-bold text-white text-sm mb-1">Core Base</div>
          <ul className="list-disc list-inside space-y-0.5 text-gray-400">
            <li>3 + distance + urgency</li>
            <li>Rush +50% • Emergency +100%</li>
            <li>Risk multipliers stack</li>
          </ul>
        </div>
        <div className="bg-brand-black rounded p-3 border border-brand-border">
          <div className="font-bold text-white text-sm mb-1">
            Villager Transport
          </div>
          <ul className="list-disc list-inside space-y-0.5 text-gray-400">
            <li>Delivery formula + 3 base</li>
            <li>+1 diamond per extra villager</li>
            <li>Portal / boat complexity may add</li>
          </ul>
        </div>
        <div className="bg-brand-black rounded p-3 border border-brand-border">
          <div className="font-bold text-white text-sm mb-1">Custom Task</div>
          <ul className="list-disc list-inside space-y-0.5 text-gray-400">
            <li>Quoted in 10‑min time units</li>
            <li>No bulk grinding / stock farming</li>
            <li>Complex redstone or routing +50%</li>
          </ul>
        </div>
        <div className="bg-brand-black rounded p-3 border border-brand-border">
          <div className="font-bold text-white text-sm mb-1">
            Recovery / Rescue
          </div>
          <ul className="list-disc list-inside space-y-0.5 text-gray-400">
            <li>Overworld 5 • Nether 7 • End 8</li>
            <li>Includes risk coverage</li>
            <li>Emergency urgency applies</li>
          </ul>
        </div>
        <div className="bg-brand-black rounded p-3 border border-brand-border">
          <div className="font-bold text-white text-sm mb-1">7/11 Shop</div>
          <ul className="list-disc list-inside space-y-0.5 text-gray-400">
            <li>Dyes: 1 dia / stack</li>
            <li>Glass: 1 dia / 3 stacks</li>
            <li>Tinted/Glow: 2 dia / stack</li>
          </ul>
        </div>
        <div className="bg-brand-black rounded p-3 border border-brand-border">
          <div className="font-bold text-white text-sm mb-1">Time Block</div>
          <ul className="list-disc list-inside space-y-0.5 text-gray-400">
            <li>20 / 40 / 60 minutes</li>
            <li>1 diamond / 10 min base</li>
            <li>Unused minutes can roll once</li>
          </ul>
        </div>
        <div className="text-[10px] text-gray-500">
          Final quotes confirmed via Discord before work starts.
        </div>
      </div>
    </div>
  );
};

export default PricingMatrix;
