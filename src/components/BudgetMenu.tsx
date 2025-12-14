import React from "react";

const BudgetMenu: React.FC = () => {
  const budgetServices = [
    {
      service: "Basic Delivery (within 300 blocks)",
      description: "Includes sarcasm at no extra cost",
      price: "3 diamonds",
      popular: true,
    },
    {
      service: "Multi-Shop Delivery",
      description: "Because you couldn't walk to two places",
      price: "5 diamonds",
    },
    {
      service: "Item Relocation (within your base)",
      description: "Literally carrying something 10 blocks",
      price: "2 diamonds",
    },
    {
      service: "Low Priority Queue Slot",
      description: "I'll get to it. Eventually. Maybe.",
      price: "1 diamond",
    },
  ];

  return (
    <section className="py-12 px-4" id="budget-options">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-3 rounded-xl shadow-lg">
            <span className="text-2xl animate-bounce">🪙</span>
            <h2 className="text-xl font-bold text-white">Broke People Menu™</h2>
          </div>
          <p className="text-gray-400 mt-4 italic max-w-xl mx-auto">
            "Because even cheapskates deserve service. Just not fast service."
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-3">
            <h3 className="text-white font-bold flex items-center gap-2">
              <span>💰</span>
              Budget Services
            </h3>
          </div>

          <div className="p-6 space-y-4">
            {budgetServices.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center py-3 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                  item.popular
                    ? "bg-gradient-to-r from-yellow-900/30 to-orange-900/20 border border-yellow-500/30"
                    : "bg-gray-700/30 hover:bg-gray-700/50"
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-semibold">
                      {item.service}
                    </span>
                    {item.popular && (
                      <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full font-bold">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="text-gray-400 text-sm mt-0.5">
                    {item.description}
                  </div>
                </div>
                <div className="text-yellow-400 font-bold ml-4">
                  {item.price}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-900/20 border-t border-yellow-700/30 px-6 py-4">
            <div className="text-yellow-400 font-semibold mb-2 flex items-center gap-2 text-sm">
              <span>⚠️</span>
              Terms & How to Order:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="text-yellow-200 text-xs space-y-1">
                <li>• Payment due upfront</li>
                <li>• Budget ≠ fast or with a smile</li>
                <li>• Quality guaranteed despite humor</li>
              </ul>
              <div className="bg-yellow-800/30 rounded-lg p-3 text-center">
                <p className="text-yellow-200 text-xs mb-2">
                  Contact on Discord:
                </p>
                <span className="text-white font-bold">NilsTG</span>
                <p className="text-yellow-300 text-xs mt-1 italic">
                  Mention "Broke People Menu"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BudgetMenu;
