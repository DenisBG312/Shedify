import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function toggleMenu() {
    setOpen(!open);
  }

  // Close mobile menu when clicking outside or on route change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight transition-all duration-300 group-hover:scale-105">
              Shedify
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Dashboard
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Projects
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Tasks
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Calendar
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-slate-800/50 backdrop-blur-sm border-t border-slate-700/50">
          <NavLink
            to="/dashboard"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                isActive
                  ? "text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-l-4 border-blue-400"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/projects"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                isActive
                  ? "text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-l-4 border-blue-400"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/tasks"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                isActive
                  ? "text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-l-4 border-blue-400"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`
            }
          >
            Tasks
          </NavLink>

          <NavLink
            to="/calendar"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                isActive
                  ? "text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-l-4 border-blue-400"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`
            }
          >
            Calendar
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
