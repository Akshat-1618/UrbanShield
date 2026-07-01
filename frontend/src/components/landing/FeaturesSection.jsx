import {
  FaAmbulance,
  FaMapMarkedAlt,
  FaUsersCog,
  FaBell,
} from "react-icons/fa";

const features = [
  {
    icon: FaAmbulance,
    title: "Smart Dispatch",
    description:
      "Every report is matched with the closest available response unit, so help is on the way within moments of a report coming in.",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Live Operational Map",
    description:
      "Track incidents, units and response routes on a single live map — built for commanders who need the full picture at a glance.",
  },
  {
    icon: FaBell,
    title: "Real-Time Status Updates",
    description:
      "Citizens, responders and administrators all stay in sync as an incident moves from reported to resolved.",
  },
  {
    icon: FaUsersCog,
    title: "Role-Based Workspaces",
    description:
      "Purpose-built dashboards for citizens, administrators and field units — each seeing exactly what they need to act fast.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="platform" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <span className="rounded-full bg-[color:var(--color-aurora-100)]/50 px-4 py-1.5 text-sm font-semibold text-[color:var(--color-aurora-900)]">
            Platform
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Everything a response team needs, in one place.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            UrbanShield brings reporting, dispatch and tracking together so
            your team can focus on responding — not switching between tools.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--color-aurora-400)]/40 hover:shadow-xl hover:shadow-[color:var(--color-aurora-500)]/10"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--color-aurora-300)] to-[color:var(--color-aurora-500)] text-2xl text-white transition group-hover:scale-105">
                <feature.icon aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
