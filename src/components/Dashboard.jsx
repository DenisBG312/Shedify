import { 
  TrendingUp, 
  PawPrint,
  Heart,
  Calendar,
  Clock,
  Target,
  BarChart3,
  Users
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Pets Available",
      value: "128",
      change: "+14 new this week",
      icon: PawPrint,
      iconColor: "text-blue-400",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Successful Adoptions",
      value: "3,240",
      change: "+62 this month",
      icon: Heart,
      iconColor: "text-purple-400",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Upcoming Events",
      value: "7",
      change: "3 this week",
      icon: Calendar,
      iconColor: "text-orange-400",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "Partner Shelters",
      value: "84",
      change: "+4 new partners",
      icon: Users,
      iconColor: "text-green-400",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/20 to-emerald-500/20"
    }
  ];

  const recentTasks = [
    { id: 1, title: "Review adoption application", project: "Bella (Dog • 2 y/o)", priority: "high", dueDate: "Today" },
    { id: 2, title: "Schedule home visit", project: "Luna (Cat • 1 y/o)", priority: "medium", dueDate: "Tomorrow" },
    { id: 3, title: "Upload new pet photos", project: "Max (Dog • 3 y/o)", priority: "low", dueDate: "In 3 days" },
    { id: 4, title: "Confirm event attendance", project: "Weekend Adoption Fair", priority: "high", dueDate: "Today" }
  ];

  const projects = [
    { id: 1, name: "City Shelter Adoption Drive", progress: 75, status: "In Progress", color: "blue" },
    { id: 2, name: "Senior Pets Month Campaign", progress: 45, status: "In Progress", color: "purple" },
    { id: 3, name: "Summer Cat Adoption Fair", progress: 90, status: "Almost Done", color: "green" },
    { id: 4, name: "New Shelter Onboarding", progress: 30, status: "In Progress", color: "orange" }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-400 bg-red-500/20 border-red-500/30";
      case "medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
      case "low":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30";
    }
  };

  const getStatusColor = (status) => {
    if (status === "Almost Done") return "text-green-400";
    return "text-blue-400";
  };

  const getProgressColor = (color) => {
    const colors = {
      blue: "from-blue-500 to-cyan-500",
      purple: "from-purple-500 to-pink-500",
      green: "from-green-500 to-emerald-500",
      orange: "from-orange-500 to-red-500"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Shelter Dashboard
          </h1>
          <p className="text-slate-400 text-lg">
            Welcome back! Here’s what’s happening across your pets, adopters, and partner shelters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/50"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} rounded-full blur-3xl opacity-20 -mr-16 -mt-16`}></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.bgGradient} border border-slate-700/50`}>
                      <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                  <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    {stat.change}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Recent Activity
                </h2>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="group p-4 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                        {task.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">{task.project}</span>
                      <span className="text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  Campaigns
                </h2>
                <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-medium text-sm">{project.name}</h3>
                      <span className={`text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="mb-1">
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getProgressColor(project.color)} rounded-full transition-all duration-500`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">{project.progress}% complete</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-green-400" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 hover:border-blue-400/50 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 text-white font-medium">
              Add New Pet
            </button>
            <button className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:border-purple-400/50 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 text-white font-medium">
              Review Applications
            </button>
            <button className="p-4 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 hover:border-orange-400/50 hover:from-orange-500/30 hover:to-red-500/30 transition-all duration-300 text-white font-medium">
              Schedule Event
            </button>
            <button className="p-4 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 hover:border-green-400/50 hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 text-white font-medium">
              Adoption Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

