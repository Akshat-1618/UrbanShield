const WorkflowSection = () => {

  const steps = [

    "Citizen Reports Incident",

    "Admin Reviews Request",

    "Nearest Unit Assigned",

    "Emergency Response",

    "Incident Resolved",

  ];

  return (

    <section className="bg-white py-20">

      <div className="mx-auto max-w-6xl px-6">

        <h2 className="mb-14 text-center text-4xl font-bold">

          How It Works

        </h2>

        <div className="grid gap-6 md:grid-cols-5">

          {steps.map((step, index) => (

            <div

              key={step}

              className="rounded-2xl border bg-slate-50 p-6 text-center shadow-sm"

            >

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">

                {index + 1}

              </div>

              <p className="font-medium">

                {step}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

};

export default WorkflowSection;