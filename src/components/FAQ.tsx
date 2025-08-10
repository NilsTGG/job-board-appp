import React from "react";

const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "What if you die with my items?",
      a: "If it's my fault and items are unrecoverable, I replace fair value or refund the fee. Risk based quotes factor safety gear already.",
    },
    {
      q: "Do I pay upfront?",
      a: "Delivery & recovery: payment at pickup. Time blocks & large tasks: 50% or collateral, rest on completion.",
    },
    {
      q: "Can I cancel?",
      a: "Free before work starts. After start, minimum 50% of agreed quote or used time portion.",
    },
    {
      q: "What counts as Emergency?",
      a: "Needs action within 15 minutes of DM confirmation or active death chest ticking down.",
    },
    {
      q: "Dimension limits?",
      a: "All dimensions okay. End rescue requires confirmation I'm available before void risk scenarios.",
    },
  ];
  return (
    <section className="max-w-4xl mx-auto px-4 py-12" id="faq">
      <h2 className="text-2xl font-bold text-white mb-6">FAQ</h2>
      <div className="space-y-4">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group bg-gray-800 border border-gray-700 rounded-lg p-4"
          >
            <summary className="cursor-pointer list-none flex items-center justify-between text-white font-medium">
              <span>{f.q}</span>
              <span className="text-gray-400 group-open:rotate-90 transition-transform">
                ›
              </span>
            </summary>
            <p className="mt-2 text-sm text-gray-300 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
