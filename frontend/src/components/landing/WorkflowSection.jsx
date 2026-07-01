import {
  FaExclamationTriangle,
  FaUserShield,
  FaAmbulance,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    icon: FaExclamationTriangle,
    title: "Report",
    description: "A citizen submits an emergency with location and details.",
  },
  {
    icon: FaUserShield,
    title: "Verify",
    description: "The incident is reviewed and prioritized instantly.",
  },
  {
    icon: FaAmbulance,
    title: "Dispatch",
    description: "The nearest available unit is assigned and notified.",
  },
  {
    icon: FaCheckCircle,
    title: "Resolve",
    description: "Progress is tracked live until the mission is complete.",
  },
];

const WorkflowSection = () => {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <span className="rounded-full bg-[color:var(--color-aurora-100)]/50 px-4 py-1.5 text-sm font-semibold text-[color:var(--color-aurora-900)]">
            How It Works
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            From first report to resolution.
          </h2>
        </div>

        <div className="relative grid gap-8 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-slate-200 md:block" />
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--color-aurora-300)] to-[color:var(--color-aurora-500)] text-2xl text-white shadow-lg shadow-[color:var(--color-aurora-500)]/20">
                <step.icon aria-hidden="true" />
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-[color:var(--color-aurora-600)]">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2.5 leading-relaxed text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
