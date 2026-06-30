const StatCard = ({
  title,
  value,
}) => {

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <h2 className="mt-3 text-4xl font-bold text-slate-900">
        {value}
      </h2>
    </div>
  );
};

export default StatCard;