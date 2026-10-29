import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Compass } from "lucide-react";
import Button from "../common/Button.jsx";

const links = [
  { name: "Home", path: "/" },
  { name: "Jobs", path: "/jobs" },
  { name: "Resume AI", path: "/resume" },
  { name: "Career Roadmap", path: "/roadmap" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="rounded-xl bg-violet-600 p-2 text-white">
            <Compass size={22} />
          </span>
          <span>CareerPilot <span className="text-violet-600">AI</span></span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? "text-violet-600" : "text-gray-600 hover:text-violet-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button to="/login" variant="secondary">Log in</Button>
          <Button to="/register">Get started</Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-lg border p-2 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t bg-white p-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm hover:bg-violet-50"
            >
              {link.name}
            </Link>
          ))}

          <div className="mt-3 flex gap-2">
            <Button to="/login" variant="secondary" className="flex-1">Log in</Button>
            <Button to="/register" className="flex-1">Sign up</Button>
          </div>
        </div>
      )}
    </header>
  );
}