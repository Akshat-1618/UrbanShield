import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CtaSection = () => {
  return (
    <section className="bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-[color:var(--color-aurora-900)] via-[color:var(--color-aurora-800)] to-[color:var(--color-aurora-600)] px-10 py-16 text-center shadow-2xl shadow-[color:var(--color-aurora-800)]/20 sm:px-16">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Ready to respond faster?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Set up your response network on UrbanShield and start coordinating
          incidents, units and outcomes from a single dashboard.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2.5 rounded-xl bg-white px-7 py-4 font-semibold text-[color:var(--color-aurora-900)] shadow-xl transition hover:-translate-y-0.5"
          >
            Create Your Account
            <FaArrowRight className="text-sm" aria-hidden="true" />
          </Link>
          <Link
            to="/unit/login"
            className="inline-flex items-center gap-2.5 rounded-xl border border-white/25 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Unit Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
