import { Link } from "react-router-dom";
import { FaArrowRight, FaCircle } from "react-icons/fa";

const feedItems = [
  { label: "Sector 18 · Medical", status: "Unit En Route", tone: "bg-[color:var(--color-aurora-300)]" },
  { label: "Fire HQ · Structural Fire", status: "Dispatched", tone: "bg-amber-400" },
  { label: "Sector 62 · Road Accident", status: "Resolved", tone: "bg-emerald-400" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[color:var(--color-aurora-900)] via-[color:var(--color-aurora-800)] to-[color:var(--color-aurora-700)]">
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-[color:var(--color-aurora-300)]/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[color:var(--color-aurora-400)]/20 blur-[110px]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-32">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
            <FaCircle className="text-[8px] text-[color:var(--color-aurora-300)]" aria-hidden="true" />
            Now coordinating live emergency response
          </span>

          <h1 className="mt-7 max-w-xl text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl">
            Command emergency response like a control tower.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
            UrbanShield gives your city one place to log incidents, dispatch
            the right unit, and follow every response from first report to
            resolution — in real time.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-white px-7 py-4 font-semibold text-[color:var(--color-aurora-900)] shadow-xl shadow-black/20 transition hover:-translate-y-0.5"
            >
              Get Started
              <FaArrowRight className="text-sm transition group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/25 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-white/60">
            <div>
              <span className="text-2xl font-bold text-white">24/7</span>
              <span className="ml-2">Live monitoring</span>
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div>
              <span className="text-2xl font-bold text-white">3</span>
              <span className="ml-2">Response unit types</span>
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div>
              <span className="text-2xl font-bold text-white">1</span>
              <span className="ml-2">Unified command view</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <p className="text-sm font-semibold text-white/90">
                Live Incident Feed
              </p>
              <span className="flex items-center gap-1.5 text-xs font-medium text-[color:var(--color-aurora-300)]">
                <FaCircle className="text-[7px] animate-pulse" aria-hidden="true" />
                Live
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {feedItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3.5"
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-2 w-2 rounded-full ${item.tone}`} />
                    <span className="text-sm font-medium text-white/85">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-white/50">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {["Units Active", "Avg. Response", "Coverage"].map((label, i) => (
                <div key={label} className="rounded-xl bg-white/5 p-3.5 text-center">
                  <p className="text-lg font-bold text-white">
                    {["12", "6.4m", "16"][i]}
                  </p>
                  <p className="mt-0.5 text-[11px] text-white/50">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-gradient-to-br from-[color:var(--color-aurora-300)] to-[color:var(--color-aurora-500)] opacity-90 blur-sm" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
