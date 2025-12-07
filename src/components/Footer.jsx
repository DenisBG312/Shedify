import { Link } from 'react-router-dom';
import { Heart, Mail, Github, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight transition-all duration-300 group-hover:scale-105">
                PetHub
              </div>
            </Link>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Connecting loving families with pets in need of a home. Find your perfect companion or help a pet find theirs.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Heart className="w-4 h-4 text-red-400 fill-red-400" />
              <span>Made with love for pets</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/pets"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Browse Pets
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Create Account
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/pets"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Search & Filter
                </Link>
              </li>
              <li>
                <Link
                  to="/pets"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Adopt Pets
                </Link>
              </li>
              <li>
                <Link
                  to="/adopted-pets"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  My Adopted Pets
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@pethub.com"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  support@pethub.com
                </a>
              </li>
              <li className="flex items-center gap-4 pt-2">
                <a
                  href="#"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} PetHub. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/"
                className="text-slate-500 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/"
                className="text-slate-500 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

