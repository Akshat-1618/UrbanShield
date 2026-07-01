const variantStyles = {
  primary:
    "bg-gradient-to-r from-[color:var(--color-aurora-300)] to-[color:var(--color-aurora-600)] text-white shadow-sm shadow-[color:var(--color-aurora-500)]/25 hover:shadow-md hover:shadow-[color:var(--color-aurora-500)]/35 hover:brightness-105 disabled:hover:brightness-100",
  secondary:
    "border border-slate-300 bg-white text-slate-700 shadow-sm hover:border-slate-400 hover:bg-slate-50",
  outline:
    "border-2 border-[color:var(--color-aurora-500)] bg-transparent text-[color:var(--color-aurora-600)] hover:bg-[color:var(--color-aurora-500)] hover:text-white",
  danger:
    "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-sm shadow-red-600/20 hover:shadow-md hover:shadow-red-600/30 hover:brightness-110",
  ghost:
    "bg-slate-100 text-slate-700 hover:bg-slate-200",
};

/**
 * Primary call-to-action button used throughout the app. Backward
 * compatible with its original API (children, onClick, type, disabled),
 * with optional `variant`, `icon` and `fullWidth` props for richer
 * layouts introduced in the redesign.
 */
const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  icon: Icon,
  fullWidth = true,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
        fullWidth ? "w-full" : ""
      } ${variantStyles[variant] || variantStyles.primary}`}
    >
      {Icon && <Icon className="text-base" aria-hidden="true" />}
      {children}
    </button>
  );
};

export default PrimaryButton;
