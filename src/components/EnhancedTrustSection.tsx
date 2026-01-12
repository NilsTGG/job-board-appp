import React from "react";
import {
  Shield,
  Star,
  CheckCircle,
  Users,
  Clock,
  Award,
  ThumbsUp,
} from "../icons";

const trustMetrics = [
  {
    icon: <Users className="h-8 w-8" />,
    value: "2,547+",
    label: "Happy Customers",
    color: "blue",
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    value: "99.1%",
    label: "Success Rate",
    color: "green",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    value: "18min",
    label: "Avg Response Time",
    color: "purple",
  },
  {
    icon: <Award className="h-8 w-8" />,
    value: "4.9/5",
    label: "Customer Rating",
    color: "yellow",
  },
];

const guarantees = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Zero Loss Guarantee",
    description:
      "If items are lost due to my error, full replacement or refund guaranteed. Your stuff is safe with me.",
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Upfront Pricing",
    description:
      "No hidden fees, no surprise charges. Price is locked after Discord confirmation. What you see is what you pay.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Time Commitment",
    description:
      "If I can't complete your job within agreed timeframe, you get 25% off or priority rebooking at no extra cost.",
  },
  {
    icon: <ThumbsUp className="h-6 w-6" />,
    title: "Quality Assurance",
    description:
      "Professional service standards. I bring proper gear, plan safe routes, and treat your items like my own.",
  },
];

const EnhancedTrustSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16" id="trust">
      {/* Trust Metrics */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">
          Trusted by the Minecraft Community
        </h2>
        <p className="text-brand-muted text-lg max-w-3xl mx-auto mb-12">
          Professional service with transparent pricing and guaranteed results.
          Your items and time are safe with experienced handling.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustMetrics.map((metric, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div
                className={`inline-flex p-4 rounded-full mb-3 ${
                  metric.color === "blue"
                    ? "bg-brand-primary/20 text-brand-primary group-hover:bg-brand-primary/30"
                    : metric.color === "green"
                    ? "bg-brand-success/20 text-brand-success group-hover:bg-brand-success/30"
                    : metric.color === "purple"
                    ? "bg-brand-accent/20 text-brand-accent group-hover:bg-brand-accent/30"
                    : "bg-yellow-500/20 text-yellow-500 group-hover:bg-yellow-500/30"
                }`}
              >
                {metric.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-brand-muted">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Guarantees */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Service Guarantees
          </h3>
          <p className="text-brand-muted max-w-2xl mx-auto">
            Professional standards backed by clear policies and commitment to
            quality service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="bg-brand-surface rounded-lg p-6 border border-brand-border hover:border-brand-primary/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-primary/20 rounded-lg text-brand-primary flex-shrink-0">
                  {guarantee.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {guarantee.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    {guarantee.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-brand-success/10 to-brand-primary/10 rounded-2xl p-8 border border-brand-success/20">
          <CheckCircle className="h-12 w-12 text-brand-success mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            Ready to Get Started?
          </h3>
          <p className="text-brand-muted mb-6">
            Experience professional, reliable service with transparent pricing
            and guaranteed results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#submit-job"
              className="bg-brand-success text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 hover:scale-105 shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("submit-job")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started Now
            </a>
            <span className="text-brand-muted text-sm">
              or{" "}
              <a
                href="#faq"
                className="text-brand-primary hover:text-blue-300 underline"
              >
                read our FAQ
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTrustSection;
