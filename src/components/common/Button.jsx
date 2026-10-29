import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const variants = {
  primary:
    "bg-[#6255ee] text-white shadow-[0_10px_24px_rgba(98,85,238,.22)] hover:bg-[#5144dc] hover:shadow-[0_14px_30px_rgba(98,85,238,.28)]",

  secondary:
    "border border-[#e6e5f1] bg-white text-[#24243b] hover:border-[#c8c3ff] hover:bg-[#faf9ff]",

  dark:
    "bg-[#17182b] text-white hover:bg-[#292a43]",
};

export default function Button({
  children,
  to,
  href,
  variant = "primary",
  className = "",
  icon = false,
  type = "button",
  onClick,
}) {
  const classes = `
    inline-flex items-center justify-center gap-2
    rounded-xl px-5 py-3 text-sm font-bold
    transition duration-300 active:scale-[.98]
    ${variants[variant] || variants.primary}
    ${className}
  `;

  const content = (
    <>
      {children}
      {icon && <ArrowUpRight size={16} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
    >
      {content}
    </button>
  );
}
