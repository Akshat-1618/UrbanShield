import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-slate-50">

      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        <span className="mb-5 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

          🚑 Smart Emergency Response Platform

        </span>

        <h1 className="max-w-5xl text-5xl font-extrabold leading-tight text-slate-900 md:text-7xl">

          Faster Emergency Response

          <span className="text-blue-600">

            {" "}Powered by Graph Algorithms

          </span>

        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600">

          UrbanShield intelligently dispatches the nearest emergency
          units using optimized routing algorithms, helping reduce
          response time during critical situations.

        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            to="/signup"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Login
          </Link>

        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-slate-600">

          <div>

            🚑

            <p className="mt-2 font-medium">

              Smart Dispatch

            </p>

          </div>

          <div>

            📍

            <p className="mt-2 font-medium">

              Live Tracking

            </p>

          </div>

          <div>

            ⚡

            <p className="mt-2 font-medium">

              Faster Response

            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;