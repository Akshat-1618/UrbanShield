import {
  FaClock,
  FaRoute,
  FaBroadcastTower,
} from "react-icons/fa";

const StatsSection = () => {

  const stats = [
    {
      icon: <FaClock className="text-4xl text-blue-600" />,
      value: "24×7",
      title: "Emergency Monitoring",
    },
    {
      icon: <FaRoute className="text-4xl text-emerald-500" />,
      value: "Floyd-Warshall",
      title: "Smart Route Planning",
    },
    {
      icon: <FaBroadcastTower className="text-4xl text-red-500" />,
      value: "Real-Time",
      title: "Socket.IO Updates",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-10 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 flex justify-center">
                {stat.icon}
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900">
                {stat.value}
              </h2>
              <p className="mt-3 text-slate-600">
                {stat.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;