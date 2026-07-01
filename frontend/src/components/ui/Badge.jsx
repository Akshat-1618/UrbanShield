const toneStyles = {
  slate: "bg-slate-100 text-slate-600 ring-slate-500/10",
  red: "bg-red-50 text-red-700 ring-red-600/10",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/10",
  orange: "bg-orange-50 text-orange-700 ring-orange-600/10",
  blue: "bg-[color:var(--color-aurora-100)]/40 text-[color:var(--color-aurora-800)] ring-[color:var(--color-aurora-500)]/15",
  purple: "bg-violet-50 text-violet-700 ring-violet-600/10",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
};

/**
 * Small status/label pill used across the app for incident status,
 * unit status, severity, incident type, etc. Purely presentational —
 * it renders whatever label/tone it is given.
 */
const Badge = ({ children, tone = "slate", icon: Icon, className = "" }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${toneStyles[tone] || toneStyles.slate} ${className}`}
    >
      {Icon && <Icon className="text-[12px]" aria-hidden="true" />}
      {children}
    </span>
  );
};

export default Badge;
