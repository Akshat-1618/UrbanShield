/**
 * Consistent page-title block used at the top of every dashboard page:
 * an optional eyebrow label, a title, a description, and optional
 * right-aligned actions (buttons).
 */
const PageHeader = ({ eyebrow, title, description, actions }) => {
  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="animate-fade-in-up">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--color-aurora-700)]">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-500">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap gap-3 animate-fade-in-up animate-delay-1">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
