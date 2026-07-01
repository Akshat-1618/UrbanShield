/**
 * KPI card used on dashboards. `icon` and `tone` are optional so the
 * component stays backward compatible with call sites that only pass
 * `title` and `value`.
 */
const toneStyles = {
  blue: "from-[color:var(--color-aurora-300)] to-[color:var(--color-aurora-600)] bg-[color:var(--color-aurora-100)]/40 text-[color:var(--color-aurora-700)]",
  red: "from-red-600 to-orange-500 bg-red-50 text-red-600",
  green: "from-emerald-600 to-teal-500 bg-emerald-50 text-emerald-600",
  purple: "from-violet-600 to-fuchsia-500 bg-violet-50 text-violet-600",
  amber: "from-amber-500 to-orange-500 bg-amber-50 text-amber-600",
};

const StatCard = ({ title, value, icon: Icon, tone = "blue" }) => {
  const [gradient, iconBg, iconColor] = (
    toneStyles[tone] || toneStyles.blue
  ).split(" ");

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-aurora-300)]/50 hover:shadow-[var(--shadow-soft-lg)]">
      <div
        className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100 ${gradient}`}
      />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">{value}</h2>
        </div>
        {Icon && (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${iconBg} ${iconColor}`}
          >
            <Icon aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
