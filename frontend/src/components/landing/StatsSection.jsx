import { FaBolt, FaMapMarkedAlt, FaHeadset } from "react-icons/fa";

const stats = [
  {
    icon: FaBolt,
    value: "Faster",
    title: "Dispatch Decisions",
    description: "The nearest available unit is identified and assigned automatically.",
  },
  {
    icon: FaMapMarkedAlt,
    value: "City-Wide",
    title: "Situational Awareness",
    description: "See every active incident and unit on one live operational map.",
  },
  {
    icon: FaHeadset,
    value: "End-to-End",
    title: "Incident Lifecycle",
    description: "From citizen report to on-ground resolution, fully tracked.",
  },
];

const StatsSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="group rounded-2xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--color-aurora-400)]/40 hover:shadow-xl hover:shadow-[color:var(--color-aurora-500)]/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--color-aurora-300)] to-[color:var(--color-aurora-500)] text-lg text-white">
                <stat.icon aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                {stat.value}
              </h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[color:var(--color-aurora-600)]">
                {stat.title}
              </p>
              <p className="mt-3 leading-relaxed text-slate-600">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
