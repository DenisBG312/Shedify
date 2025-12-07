import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Search, 
  Heart, 
  CheckCircle,
  Zap,
  Share2,
  Plus,
  User,
  Sparkles
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Search,
      title: "Search & Filter Pets",
      description: "Easily find your perfect companion with advanced search and breed filtering. Browse through paginated results to discover pets that match your preferences.",
      iconColor: "text-blue-400",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Heart,
      title: "Like Your Favorites",
      description: "Show love to pets that catch your eye! Like pets to save them to your favorites list and help them get noticed by other potential adopters.",
      iconColor: "text-red-400",
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-500/20 to-pink-500/20"
    },
    {
      icon: CheckCircle,
      title: "Adopt Pets",
      description: "Found your perfect match? Adopt pets directly through our platform. Track all your adopted pets in one convenient place.",
      iconColor: "text-green-400",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: Share2,
      title: "Share Pet Profiles",
      description: "Help pets find homes by sharing their profiles with friends and family. Use our built-in share feature to spread the word.",
      iconColor: "text-purple-400",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-500/20 to-indigo-500/20"
    },
    {
      icon: Plus,
      title: "List Your Pets",
      description: "Have a pet that needs a home? Create beautiful listings with photos and descriptions to help them find their forever family.",
      iconColor: "text-cyan-400",
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      icon: User,
      title: "Manage Your Profile",
      description: "Track your adoption journey with personalized statistics. View your created pets, adopted pets, and manage your account all in one place.",
      iconColor: "text-orange-400",
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-500/20 to-amber-500/20"
    }
  ];

  const stats = [
    { value: "Easy", label: "Search & Browse" },
    { value: "Fast", label: "Adoption Process" },
    { value: "Safe", label: "Pet Listings" },
    { value: "Free", label: "To Use" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-blue-400 mr-2" />
              <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
                Welcome to PetHub
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Find Your New
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Best Friend
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              PetHub connects loving families with pets in need of a home. 
              Discover adoptable animals near you and start your adoption journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/pets"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Browse Pets
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl font-semibold text-white border-2 border-slate-600 hover:border-slate-500 bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/50"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Find Your Pet</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Powerful features that make discovering, connecting with, and adopting pets simple and enjoyable.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/50"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.bgGradient} rounded-full blur-3xl opacity-20 -mr-16 -mt-16 group-hover:opacity-30 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.bgGradient} border border-slate-700/50 mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-slate-700/50 p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
          <div className="relative z-10">
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Ready to Find Your New Best Friend?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Browse our catalog of adoptable pets, create listings for pets in need, or adopt a companion today. 
              Join PetHub and start making a difference in a pet's life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
              >
                Create Account
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/pets"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white border-2 border-slate-600 hover:border-slate-500 bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/50"
              >
                Browse Without Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

