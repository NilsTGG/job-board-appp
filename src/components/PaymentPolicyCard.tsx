import React from "react";

const PaymentPolicyCard: React.FC = () => (
  <div className="bg-brand-surface rounded-lg p-6 border border-brand-border h-full">
    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
      <span className="text-brand-success">📝</span> Payment Policy
    </h3>
    <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside bg-brand-black p-4 rounded-lg border border-brand-border">
      <li>Delivery & Recovery: Pay at pickup handoff.</li>
      <li>Time Blocks / Large Tasks: 50% upfront or collateral chest.</li>
      <li>Emergency / Rush: Full payment upfront reserves slot.</li>
      <li>Collateral accepted for players temporarily low on diamonds.</li>
      <li>IOUs cleared within 72h or collateral forfeited.</li>
    </ul>
    <p className="text-[10px] text-gray-500 mt-3">
      All payments in diamonds unless explicitly arranged otherwise.
    </p>
  </div>
);

export default PaymentPolicyCard;
