import {
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  ShoppingBag,
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
      <section className="relative z-10 min-h-[78vh] max-w-7xl mx-auto px-4 py-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-end lg:gap-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300 animate-fade-in-up">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              Requests paused
            </div>

            <div className="space-y-3.5">
              <p className="max-w-sm text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">
                Minecraft logistics, with the hard part handled for you.
              </p>

              <h1 className="max-w-4xl text-left text-5xl font-black leading-[0.92] tracking-[-0.05em] text-white md:text-[4rem] lg:text-[5.1rem]">
                Because You Won't.
                <span className="mt-2 block max-w-2xl text-xl font-semibold leading-tight tracking-[-0.03em] text-gray-300 md:text-[1.8rem] lg:text-[2.05rem]">
                  Intake is paused, but you can still plan the next run.
                </span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-gray-400 md:text-[1.05rem]">
                Browse the service menu, pricing, and partner inventory now.
                When ordering reopens, you should already know what to request
                and where to go.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={onNavigateToServices}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-8 py-4 text-white font-bold transition-all duration-300 hover:scale-[1.02] hover:bg-blue-600"
              >
                <span>Explore Services</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onNavigateToMarketplace}
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-brand-surface/75 px-8 py-4 text-white font-bold transition-all duration-300 hover:border-brand-primary hover:bg-brand-surface"
              >
                <ShoppingBag className="h-5 w-5 text-brand-muted transition-colors group-hover:text-white" />
                <span>Browse Shop</span>
              </button>
            </div>
          </div>

          <div className="grid gap-3 lg:pb-1">
            <div className="rounded-[2rem] border border-brand-border bg-brand-surface/80 p-4 shadow-2xl shadow-brand-black/35 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4 border-b border-brand-border pb-3.5">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">
                    Operations desk
                  </div>
                  <div className="mt-1.5 text-2xl font-bold text-white">
                    Intake paused
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-yellow-300">
                  <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                  Offline
                </div>
              </div>

              <div className="mt-3 space-y-3">
                <p className="text-sm leading-relaxed text-gray-300">
                  Service categories, trust details, and partner shops are still open for planning.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-brand-border bg-brand-black/35 px-4 py-4">
                  <div className="flex items-center gap-2 text-brand-primary">
                    <Zap className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.16em]">Browse services</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">
                    See what can be delivered and what each job type includes.
                  </p>
                </div>
                <div className="rounded-2xl border border-brand-border bg-brand-black/35 px-4 py-4">
                  <div className="flex items-center gap-2 text-brand-success">
                    <Shield className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.16em]">Check trust</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">
                    Read guarantees, FAQ, and reviews before the queue reopens.
                  </p>
                </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-brand-border bg-brand-black/40 p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-muted">
                Next best move
              </div>
              <div className="mt-2 text-base font-semibold leading-relaxed text-white">
                Read the pricing, compare the partner shops, and come back ready.
              </div>
            </div>
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
