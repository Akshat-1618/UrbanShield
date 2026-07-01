import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../common/Logo";

const LandingNavbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#platform", label: "Platform" },
    { href: "#how-it-works", label: "How It Works" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-slate-200 bg-white/85 backdrop-blur-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/">
          <Logo />
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-slate-600 transition hover:text-[color:var(--color-aurora-600)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-lg px-5 py-2.5 text-[15px] font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="rounded-xl bg-gradient-to-r from-[color:var(--color-aurora-300)] to-[color:var(--color-aurora-500)] px-6 py-3 text-[15px] font-semibold text-white shadow-lg shadow-[color:var(--color-aurora-400)]/30 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>

        <button
          className="text-2xl text-slate-700 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-medium text-slate-700"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-3">
              <Link
                to="/login"
                className="rounded-lg border border-slate-200 px-5 py-3 text-center font-semibold text-slate-700"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="rounded-xl bg-gradient-to-r from-[color:var(--color-aurora-300)] to-[color:var(--color-aurora-500)] px-5 py-3 text-center font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
