import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const getUserName = () => {
    if (!user) return '';
    return user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  };

  function toggleMenu() {
    setOpen(!open);
  }

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
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight transition-all duration-300 group-hover:scale-105">
              PetHub
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink
              to="/pets"
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
                  Browse Pets
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/shelters"
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
                  Shelters
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>

            {isAuthenticated && (
              <NavLink
                to="/favorites"
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
                    Favorites
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>
            )}

            <NavLink
              to="/events"
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
                  Events
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>

            <div className="ml-4 pl-4 border-l border-slate-700 flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <span className="text-slate-300 text-sm font-medium">
                    Hello, <span className="text-white font-semibold">{getUserName()}</span>
                  </span>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                        isActive
                          ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                          : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="px-4 py-2 rounded-lg font-medium text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg font-medium text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg font-medium text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

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
 
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-slate-800/50 backdrop-blur-sm border-t border-slate-700/50">
          <NavLink
            to="/pets"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                isActive
                  ? "text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-l-4 border-blue-400"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`
            }
          >
            Browse Pets
          </NavLink>

          <NavLink
            to="/shelters"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                isActive
                  ? "text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-l-4 border-blue-400"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`
            }
          >
            Shelters
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/favorites"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-l-4 border-blue-400"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`
              }
            >
              Favorites
            </NavLink>
          )}

          <NavLink
            to="/events"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                isActive
                  ? "text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-l-4 border-blue-400"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`
            }
          >
            Events
          </NavLink>

          {isAuthenticated && (
            <>
              <div className="px-4 py-3 text-slate-300 text-sm">
                Hello, <span className="text-white font-semibold">{getUserName()}</span>
              </div>
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
            </>
          )}

          <div className="pt-4 mt-4 border-t border-slate-700 space-y-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                  toggleMenu();
                }}
                className="w-full px-4 py-3 rounded-lg font-medium text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="block px-4 py-3 rounded-lg font-medium text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={toggleMenu}
                  className="block px-4 py-3 rounded-lg font-medium text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
