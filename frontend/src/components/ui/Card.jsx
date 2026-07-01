/**
 * Standard content container used for dashboard sections. Keeps
 * spacing, radius and shadow consistent everywhere in the product.
 */
const Card = ({ children, className = "", as: Tag = "div", ...rest }) => {
  return (
    <Tag
      className={`rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Card;
