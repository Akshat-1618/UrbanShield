import {
  FaAmbulance,
  FaMapMarkedAlt,
  FaRoute,
} from "react-icons/fa";

const FeaturesSection = () => {

  const features = [
    {
      icon: <FaAmbulance className="text-4xl text-red-500" />,
      title: "Smart Dispatch",
      description:
        "Automatically assigns the nearest available emergency unit using optimized graph algorithms for faster response.",
    },
    {
      icon: <FaMapMarkedAlt className="text-4xl text-blue-500" />,
      title: "Live Incident Tracking",
      description:
        "Monitor every incident from reporting to resolution with real-time updates and interactive city mapping.",
    },
    {
      icon: <FaRoute className="text-4xl text-emerald-500" />,
      title: "Optimized Routing",
      description:
        "Floyd-Warshall based shortest path calculation ensures emergency teams reach the destination quickly.",
    },
  ];

  return (
    <section id="features" className="bg-gradient-to-b from-slate-50 to-slate-100 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            FEATURES
          </span>
          <h2 className="mt-5 text-5xl font-extrabold tracking-tight text-slate-900">
            Why Choose UrbanShield?
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            Combining graph algorithms, real-time communication and modern web technologies
            to build a faster, smarter emergency response platform.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 transition group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;