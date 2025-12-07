import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Calendar, Heart, Plus, CheckCircle, Edit, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    petsCreated: 0,
    petsAdopted: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const getUserName = () => {
    if (!user) return '';
    return user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  };

  const fetchStats = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const { count: createdCount } = await supabase
        .from('pets')
        .select('*', { count: 'exact', head: true })
        .eq('owner_id', user.id);

      const { count: adoptedCount } = await supabase
        .from('pets')
        .select('*', { count: 'exact', head: true })
        .eq('adopted_by', user.id);

      setStats({
        petsCreated: createdCount || 0,
        petsAdopted: adoptedCount || 0,
      });

      setName(user.user_metadata?.name || user.email?.split('@')[0] || '');
    } catch (err) {
      console.error('Error fetching profile stats:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleSaveName = async () => {
    if (!user) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const { error: updateError } = await supabase.auth.updateUser({
        data: { name: name.trim() }
      });

      if (updateError) throw updateError;

      await supabase.auth.refreshSession();

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user.user_metadata?.name || user.email?.split('@')[0] || '');
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading your profile..." />;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg mb-4">Please log in to view your profile</p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">My Profile</h1>
          <p className="text-lg text-slate-400">Manage your account and view your activity</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border-4 border-slate-700/50 flex items-center justify-center">
                <User className="w-10 h-10 md:w-12 md:h-12 text-blue-400" />
              </div>
              <div>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full md:w-64 px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                        placeholder="Enter your name"
                        autoFocus
                      />
                    </div>
                    {error && (
                      <div className="text-red-400 text-sm">{error}</div>
                    )}
                    {success && (
                      <div className="text-green-400 text-sm">{success}</div>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveName}
                        disabled={saving || !name.trim()}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {saving ? (
                          <>
                            <LoadingSpinner size="sm" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Save
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {getUserName()}
                    </h2>
                    <div className="flex items-center gap-4 text-slate-400">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      {user.created_at && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            Joined {new Date(user.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long'
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 text-white font-semibold rounded-lg transition-all duration-300"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/50 cursor-default">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative z-10">
              <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-slate-700/50 mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stats.petsCreated}</div>
              <div className="text-slate-400 font-medium">Pets Created</div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/50 cursor-default">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative z-10">
              <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-slate-700/50 mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stats.petsAdopted}</div>
              <div className="text-slate-400 font-medium">Pets Adopted</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/adopted-pets"
              className="flex items-center gap-3 p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 rounded-lg transition-all duration-300 group"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-slate-700/50 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-white font-semibold">My Adopted Pets</div>
                <div className="text-slate-400 text-sm">View your adopted pets</div>
              </div>
            </Link>

            <Link
              to="/pets"
              className="flex items-center gap-3 p-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 rounded-lg transition-all duration-300 group"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-slate-700/50 group-hover:scale-110 transition-transform">
                <User className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-white font-semibold">Browse Pets</div>
                <div className="text-slate-400 text-sm">Explore all available pets</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
