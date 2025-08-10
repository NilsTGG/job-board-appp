import React from "react";

const TrustSection: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12" id="trust">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          Why This Isn’t Just Another Generic Service Stand
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
          <ul className="space-y-2 list-disc list-inside">
            <li>Focused service brokerage (no bulk farming sessions)</li>
            <li>Transparent distance + modifier pricing</li>
            <li>Flexible custom time blocks for odd jobs</li>
            <li>Risk-adjusted quotes (you keep your sanity)</li>
            <li>Villager & logistics specialty</li>
          </ul>
          <div className="space-y-3">
            <div>
              <span className="font-semibold text-white">
                No Item Loss Policy:
              </span>{" "}
              If I lose items you entrusted (and it’s my fault), I replace fair
              value or refund the service fee.
            </div>
            <div>
              <span className="font-semibold text-white">Upfront Clarity:</span>{" "}
              Quote locked after Discord confirmation. No hidden surcharges
              mid‑job.
            </div>
            <div>
              <span className="font-semibold text-white">Safety:</span> I bring
              proper gear & backups for risk runs when needed.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
