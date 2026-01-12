import {
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  ShoppingBag,
  Package,
} from "lucide-react";

interface LandingPageProps {
  onNavigateToServices: () => void;
  onNavigateToMarketplace: () => void;
}

const LandingPage = ({
  onNavigateToServices,
  onNavigateToMarketplace,
}: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-primary selection:text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-accent/10 rounded-full blur-[120px]" />
      </div>

      {/* Global Warning Banner */}
      <div className="bg-yellow-500/10 border-b border-yellow-500/20 text-yellow-500 py-3 relative z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3 text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
          </span>
          Services are temporarily paused for academic focus. You may browse,
          but new orders cannot be placed.
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 text-center max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
          </span>
          <span className="text-xs text-brand-muted tracking-wide uppercase font-semibold">
            Operations Paused
          </span>
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          Because You <br />
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
            Won't™
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
          Premium Minecraft services for the discerning player.
          <br className="hidden md:block" />
          We gather and deliver while you touch grass.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={onNavigateToServices}
            className="group relative px-8 py-4 bg-brand-primary text-white font-bold rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2 overflow-hidden"
          >
            <span className="relative z-10">Request a Service</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={onNavigateToMarketplace}
            className="group px-8 py-4 bg-brand-surface border border-brand-border text-white font-bold rounded-xl transition-all hover:bg-brand-border/50 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            <span>Browse Shop</span>
          </button>
        </div>

        {/* Stats / Social Proof */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-brand-border pt-12 w-full max-w-4xl text-left">
          <div>
            <div className="text-3xl font-bold text-white mb-1">24h</div>
            <div className="text-sm text-gray-500">Avg. Turnaround</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">100%</div>
            <div className="text-sm text-gray-500">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">Verified</div>
            <div className="text-sm text-gray-500">Professional Team</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">Safe</div>
            <div className="text-sm text-gray-500">Secure Payments</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-32 bg-brand-dark border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-yellow-400" />}
              title="Lightning Fast"
              description="We start working on your order immediately. Most requests are completed within 24 hours."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-brand-success" />}
              title="100% Secure"
              description="Coordinate protection and verified workers ensure your base location remains a secret."
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-brand-accent" />}
              title="Premium Quality"
              description="Whether it's double chests of stone or complex logistics, we don't cut corners."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="p-8 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-primary/50 transition-colors group">
    <div className="mb-6 p-4 rounded-xl bg-brand-black w-fit group-hover:scale-110 transition-transform duration-300 border border-brand-border">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-brand-primary transition-colors">
      {title}
    </h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
