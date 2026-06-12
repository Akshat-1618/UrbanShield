const FeaturesSection = () => {

  const features = [

    {

      title: "🚑 Smart Dispatch",

      description:
        "Automatically identifies the nearest available emergency unit using graph algorithms.",

    },

    {

      title: "📍 Live Incident Tracking",

      description:
        "Track every emergency from reporting to resolution in real time.",

    },

    {

      title: "⚡ Faster Response",

      description:
        "Optimized routing helps reduce emergency response time significantly.",

    },

  ];

  return (

    <section className="bg-slate-100 py-20">

      <div className="mx-auto max-w-6xl px-6">

        <h2 className="mb-12 text-center text-4xl font-bold">

          Why UrbanShield?

        </h2>

        <div className="grid gap-8 md:grid-cols-3">

          {features.map((feature) => (

            <div

              key={feature.title}

              className="rounded-2xl bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-xl"

            >

              <h3 className="text-2xl font-bold">

                {feature.title}

              </h3>

              <p className="mt-4 text-slate-600">

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