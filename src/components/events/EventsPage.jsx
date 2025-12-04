// Events Page (PUBLIC - adoption events)
export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-extrabold text-white mb-8">Adoption Events</h1>
        <div className="text-slate-400">
          <p>Events placeholder - Will display adoption events</p>
          <p className="mt-4">This is a PUBLIC page - accessible without authentication</p>
        </div>
      </div>
    </div>
  );
}

