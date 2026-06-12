const StatsSection = () => {
  return (

    <section className="bg-white py-16">

      <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">

        <div className="rounded-2xl border bg-slate-50 p-8 text-center shadow-sm">

          <h2 className="text-4xl font-bold text-blue-600">

            24/7

          </h2>

          <p className="mt-3 text-slate-600">

            Emergency Monitoring

          </p>

        </div>

        <div className="rounded-2xl border bg-slate-50 p-8 text-center shadow-sm">

          <h2 className="text-4xl font-bold text-blue-600">

            BFS + Dijkstra

          </h2>

          <p className="mt-3 text-slate-600">

            Smart Routing Algorithms

          </p>

        </div>

        <div className="rounded-2xl border bg-slate-50 p-8 text-center shadow-sm">

          <h2 className="text-4xl font-bold text-blue-600">

            Real-Time

          </h2>

          <p className="mt-3 text-slate-600">

            Incident Management

          </p>

        </div>

      </div>

    </section>

  );
};

export default StatsSection;