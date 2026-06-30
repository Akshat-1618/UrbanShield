import Logo from "../common/Logo";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col items-center justify-between gap-10 border-b border-slate-800 pb-10 md:flex-row">
          <Logo />
          <div className="text-center md:text-right">
            <p className="text-lg font-semibold">
              UrbanShield
            </p>
            <p className="mt-2 max-w-md text-slate-400">
              Intelligent emergency response platform powered by
              Graph Algorithms, Real-Time Communication and
              Smart Dispatch Systems.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <p>
            © 2026 UrbanShield. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span>
              Smart Dispatch
            </span>
            <span>
              Live Tracking
            </span>
            <span>
              Fast Response
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;