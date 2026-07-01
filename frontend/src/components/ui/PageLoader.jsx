const PageLoader = ({ label = "Loading..." }) => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-slate-500">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[color:var(--color-aurora-500)]" />
      </div>
      <p className="text-sm font-medium tracking-wide">{label}</p>
    </div>
  );
};

export default PageLoader;
