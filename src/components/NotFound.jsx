import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="relative max-w-2xl mx-auto text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="mb-8 flex justify-center">
            <div className="relative">
                <img 
                  src="https://wakefieldpetvet.com/wp-content/uploads/2025/04/dogs-paws-swollen.jpg" 
                  alt="Paw print" 
                  className="w-100 h-100 md:w-64 md:h-64 mx-auto object-contain"
                />
            </div>
          </div>

          <h1 className="text-8xl md:text-9xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              404
            </span>
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          
          <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off. 
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Home className="w-5 h-5" />
                Go Home
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 rounded-xl font-semibold text-white border-2 border-slate-600 hover:border-slate-500 bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/50 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

