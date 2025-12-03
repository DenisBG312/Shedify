import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function toggleMenu() {
    setOpen(!open);
  }

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold tracking-wide text-gray-800">
        Shedify
      </Link>

      <div className="hidden md:flex gap-8 text-gray-700 font-medium">
        <NavLink
          to="/dashboard"
          className="hover:text-black transition"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/projects"
          className="hover:text-black transition"
        >
          Projects
        </NavLink>

        <NavLink
          to="/tasks"
          className="hover:text-black transition"
        >
          Tasks
        </NavLink>

        <NavLink
          to="/calendar"
          className="hover:text-black transition"
        >
          Calendar
        </NavLink>
      </div>

      <button className="md:hidden" onClick={toggleMenu}>
        <Menu className="w-6 h-6" />
      </button>

      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 gap-4 md:hidden font-medium text-gray-700">
          <NavLink to="/dashboard" onClick={toggleMenu}>Dashboard</NavLink>
          <NavLink to="/projects" onClick={toggleMenu}>Projects</NavLink>
          <NavLink to="/tasks" onClick={toggleMenu}>Tasks</NavLink>
          <NavLink to="/calendar" onClick={toggleMenu}>Calendar</NavLink>
        </div>
      )}
    </nav>
  );
}
