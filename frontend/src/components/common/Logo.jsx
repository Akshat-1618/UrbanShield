const Logo = () => {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 text-xl font-extrabold text-white shadow-lg shadow-blue-300/40">
        US
      </div>
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          UrbanShield
        </h1>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          Smart Emergency Response Platform
        </p>
      </div>
    </div>
  );
};

export default Logo;