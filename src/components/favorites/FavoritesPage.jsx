// Favorites Page (PRIVATE - user's favorites)
export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-extrabold text-white mb-8">My Favorites</h1>
        <div className="text-slate-400">
          <p>Favorites placeholder - Will display user's favorite pets</p>
          <p className="mt-4">This is a PRIVATE page - requires authentication</p>
        </div>
      </div>
    </div>
  );
}

