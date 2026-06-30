import {
  FaExclamationTriangle,
  FaUserShield,
  FaAmbulance,
  FaRoute,
  FaCheckCircle,
} from "react-icons/fa";

const WorkflowSection = () => {

  const steps = [
    {
      icon: <FaExclamationTriangle className="text-red-500 text-3xl" />,
      title: "Report Incident",
      description: "Citizen submits an emergency report.",
    },
    {
      icon: <FaUserShield className="text-blue-600 text-3xl" />,
      title: "Admin Review",
      description: "Admin verifies and processes the incident.",
    },
    {
      icon: <FaAmbulance className="text-emerald-500 text-3xl" />,
      title: "Auto Dispatch",
      description: "Nearest emergency unit is assigned.",
    },
    {
      icon: <FaRoute className="text-orange-500 text-3xl" />,
      title: "Live Response",
      description: "Unit follows the optimized shortest route.",
    },
    {
      icon: <FaCheckCircle className="text-green-600 text-3xl" />,
      title: "Incident Resolved",
      description: "Mission completed and unit becomes available.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            WORKFLOW
          </span>
          <h2 className="mt-5 text-5xl font-extrabold text-slate-900">
            How UrbanShield Works
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            From incident reporting to successful resolution, UrbanShield
            ensures every emergency follows an intelligent and efficient workflow.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-5">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 transition group-hover:scale-110">
                {step.icon}
              </div>
              <div className="mb-4 text-sm font-bold text-blue-600">
                STEP {index + 1}
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
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