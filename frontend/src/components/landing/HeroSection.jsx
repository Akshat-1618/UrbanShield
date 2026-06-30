import { Link } from "react-router-dom";
import {
  FaAmbulance,
  FaMapMarkedAlt,
  FaRoute,
} from "react-icons/fa";

const HeroSection = () => {

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"></div>
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>
      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-6 rounded-full border border-blue-200 bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
          Smart Emergency Response Platform
        </span>
        <h1 className="max-w-5xl text-5xl font-extrabold leading-tight text-slate-900 md:text-7xl">
          Faster Emergency Response
          <span className="block text-blue-600">
            Powered by Graph Algorithms
          </span>
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600">
          UrbanShield intelligently dispatches the nearest emergency
          response units using optimized graph algorithms, enabling
          faster routing, live incident tracking and efficient city-wide
          emergency management.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <Link
            to="/signup"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            Login
          </Link>
        </div>
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <FaAmbulance className="mx-auto text-4xl text-red-500" />
            <h3 className="mt-4 text-lg font-bold">
              Smart Dispatch
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Automatically assigns the nearest emergency unit.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <FaMapMarkedAlt className="mx-auto text-4xl text-blue-600" />
            <h3 className="mt-4 text-lg font-bold">
              Live Tracking
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Follow every emergency from reporting to resolution.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <FaRoute className="mx-auto text-4xl text-emerald-500" />
            <h3 className="mt-4 text-lg font-bold">
              Optimized Routing
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Floyd-Warshall algorithm finds the shortest response path.
            </p>
          </div>
        </div>
        <div className="mt-20 grid gap-10 text-center md:grid-cols-4">
          <div>
            <h2 className="text-4xl font-extrabold text-blue-600">
              16
            </h2>
            <p className="mt-2 text-slate-600">
              City Nodes
            </p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-blue-600">
              Real-Time
            </h2>
            <p className="mt-2 text-slate-600">
              Socket.IO Updates
            </p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-blue-600">
              O(1)
            </h2>
            <p className="mt-2 text-slate-600">
              Priority Dispatch
            </p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-blue-600">
              24×7
            </h2>
            <p className="mt-2 text-slate-600">
              Emergency Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;