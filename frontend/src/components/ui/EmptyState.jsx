/**
 * Consistent empty-state block used whenever a list has no data yet
 * (no incidents, no units, no active mission, etc).
 */
const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-12 text-center">
      {Icon && (
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
          <Icon className="text-2xl" aria-hidden="true" />
        </div>
      )}
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      {description && (
        <p className="mx-auto mt-2 max-w-md text-slate-500">{description}</p>
      )}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
};

export default EmptyState;
