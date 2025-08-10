import React from "react";

const cards = [
  {
    title: "📦 Delivery",
    desc: "Move your items safely between locations",
    bullets: [
      "Any items, any distance",
      "Risk handled for you",
      "Transparent distance pricing",
    ],
    range: "5–25+ diamonds",
  },
  {
    title: "👨‍🏭 Villager Transport",
    desc: "Relocate villagers without pain",
    bullets: [
      "Pathing / boat / rail setups",
      "Linked portal routes optional",
      "+1 diamond per extra",
    ],
    range: "6–40+ diamonds",
  },
  {
    title: "🧰 Custom Task",
    desc: "Infrastructure & miscellaneous errands (no bulk farming)",
    bullets: [
      "Small setup jobs",
      "Light infrastructure tweaks",
      "One-off errands",
    ],
    range: "5–40+ diamonds",
  },
  {
    title: "🆘 Recovery / Rescue",
    desc: "Death chest / stuck / emergency",
    bullets: [
      "Nether & End supported",
      "Gear retrieval & escort",
      "Higher urgency modifiers",
    ],
    range: "5–25 diamonds",
  },
  {
    title: "⏱ Time Block",
    desc: "Buy pure focused minutes",
    bullets: [
      "20 / 40 / 60 min options",
      "Stackable & roll once",
      "Great for mixed tasks",
    ],
    range: "1d / 10 min base",
  },
];

const ServiceCardsExpanded: React.FC = () => (
  <section className="max-w-4xl mx-auto px-4 py-12" id="services">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Services</h2>
      <p className="text-gray-400">Outsource the hassle, risk & tedium.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((c) => (
        <div
          key={c.title}
          className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex flex-col"
        >
          <h3 className="text-lg font-semibold text-white mb-2">{c.title}</h3>
          <p className="text-gray-300 text-sm mb-3">{c.desc}</p>
          <ul className="text-gray-400 text-sm space-y-1 mb-3">
            {c.bullets.map((b) => (
              <li key={b}>• {b}</li>
            ))}
          </ul>
          <div className="mt-auto text-xs text-gray-500">
            Typical: {c.range}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ServiceCardsExpanded;
