const Logo = ({ compact = false, variant = "dark" }) => {
  const isLight = variant === "light";

  return (
    <div className="flex items-center gap-3 select-none">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--color-aurora-300)] to-[color:var(--color-aurora-600)] shadow-lg shadow-[color:var(--color-aurora-500)]/25">
        <svg
          viewBox="0 0 48 48"
          className="h-6 w-6"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M24 2 L42 9 V22 C42 34 34.5 42.5 24 46 C13.5 42.5 6 34 6 22 V9 Z"
            fill="white"
            fillOpacity="0.16"
          />
          <path
            d="M24 12 L24 34 M15 22 L33 22"
            stroke="white"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {!compact && (
        <div>
          <h1
            className={`text-xl font-extrabold leading-tight tracking-tight ${
              isLight ? "text-white" : "text-slate-900"
            }`}
          >
            UrbanShield
          </h1>
          <p
            className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
              isLight ? "text-white/50" : "text-slate-500"
            }`}
          >
            Emergency Response Platform
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;
