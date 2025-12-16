import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, Calendar, User, Edit, Trash2, CheckCircle, Share2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [liking, setLiking] = useState(false);
  const [adopting, setAdopting] = useState(false);
  const [isAdopted, setIsAdopted] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('pets')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;

        if (!data) {
          setError('Pet not found');
          return;
        }

        setPet(data);

        if (isAuthenticated && user && data.owner_id === user.id) {
          setIsOwner(true);
        }

        if (data.adopted_by) {
          setIsAdopted(true);
        }

        if (isAuthenticated && user) {
          const likedPets = JSON.parse(localStorage.getItem('likedPets') || '[]');
          if (likedPets.includes(id)) {
            setIsLiked(true);
          }
        }
      } catch (err) {
        console.error('Error fetching pet:', err);
        setError('Failed to load pet details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPet();
    }
  }, [id, isAuthenticated, user]);

  const handleDelete = async () => {
    if (!isOwner) return;

    if (!window.confirm('Are you sure you want to delete this pet listing?')) {
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from('pets')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      navigate('/pets');
    } catch (err) {
      console.error('Error deleting pet:', err);
      alert('Failed to delete pet');
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated || !user) {
      alert('Please log in to like pets');
      return;
    }

    if (isOwner) {
      alert('You cannot like your own pet');
      return;
    }

    try {
      setLiking(true);

      const likedPets = JSON.parse(localStorage.getItem('likedPets') || '[]');

      if (isLiked) {
        const { error: updateError } = await supabase
          .from('pets')
          .update({ likes: Math.max(0, (pet.likes || 0) - 1) })
          .eq('id', id);

        if (updateError) {
          console.error('Update pets likes error:', updateError);
          throw updateError;
        }

        const updatedLikedPets = likedPets.filter((petId) => petId !== id);
        localStorage.setItem('likedPets', JSON.stringify(updatedLikedPets));

        setIsLiked(false);
        setPet(prev => ({ ...prev, likes: Math.max(0, (prev.likes || 0) - 1) }));
      } else {
        const { error: updateError } = await supabase
          .from('pets')
          .update({ likes: (pet.likes || 0) + 1 })
          .eq('id', id);

        if (updateError) {
          console.error('Update pets likes error:', updateError);
          throw updateError;
        }

        if (!likedPets.includes(id)) {
          likedPets.push(id);
          localStorage.setItem('likedPets', JSON.stringify(likedPets));
        }

        setIsLiked(true);
        setPet(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));
      }
    } catch (err) {
      console.error('Error toggling like:', err);
      const errorMessage = err.message || err.error_description || err.details || 'Failed to update like. Please try again.';
      alert(`Error: ${errorMessage}`);
    } finally {
      setLiking(false);
    }
  };

  const handleAdopt = async () => {
    if (!isAuthenticated || !user) {
      alert('Please log in to adopt a pet');
      return;
    }

    if (isOwner) {
      alert('You cannot adopt your own pet');
      return;
    }

    if (isAdopted) {
      alert('This pet has already been adopted');
      return;
    }

    if (!window.confirm(`Are you sure you want to adopt ${pet.name}? This action cannot be undone.`)) {
      return;
    }

    try {
      setAdopting(true);

      const { error: updateError } = await supabase
        .from('pets')
        .update({ adopted_by: user.id })
        .eq('id', id);

      if (updateError) throw updateError;

      setIsAdopted(true);
      setPet(prev => ({ ...prev, adopted_by: user.id }));
      alert(`Congratulations! You have successfully adopted ${pet.name}!`);
    } catch (err) {
      console.error('Error adopting pet:', err);
      const errorMessage = err.message || err.error_description || err.details || 'Failed to adopt pet. Please try again.';
      alert(`Error: ${errorMessage}`);
    } finally {
      setAdopting(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: `${pet.name} - PetHub`,
      text: `Check out ${pet.name}${pet.breed ? `, a ${pet.breed}` : ''} on PetHub!`,
      url: url
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
        } catch (clipboardErr) {
          console.error('Error copying to clipboard:', clipboardErr);
          alert('Failed to share. Please copy the URL manually.');
        }
      }
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading pet details..." />;
  }

  if (error || !pet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/pets"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pets
          </Link>
          <div className="text-center py-16">
            <div className="text-red-400 text-xl mb-4">{error || 'Pet not found'}</div>
            <Link
              to="/pets"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              Browse All Pets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/pets"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Pets
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden bg-slate-700/30 border border-slate-700/50">
              {pet.image_url ? (
                <img
                  src={pet.image_url}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x600?text=Pet+Image';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <div className="text-slate-500 text-center">
                    <p className="text-lg">No image available</p>
                  </div>
                </div>
              )}
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 backdrop-blur-sm border border-slate-700/50">
              <Heart className={`w-5 h-5 ${isLiked ? 'text-red-400 fill-red-400' : 'text-red-400'}`} />
              <span className="text-white font-semibold">{pet.likes || 0}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                    {pet.name}
                  </h1>
                  <p className="text-xl text-slate-400">{pet.breed || 'Mixed Breed'}</p>
                </div>
                <div className="flex items-center gap-2">
                  {pet.age && (
                    <div className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
                      <span className="text-blue-400 font-semibold">
                        {pet.age} {pet.age === 1 ? 'year' : 'years'} old
                      </span>
                    </div>
                  )}
                  {isAdopted && (
                    <div className="px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30">
                      <span className="text-green-400 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Adopted
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {isOwner && (
                <div className="flex gap-3 mb-6">
                  <Link
                    to={`/pets/edit/${id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 rounded-lg text-slate-300 hover:text-white transition-all"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 rounded-lg text-red-400 hover:text-red-300 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-3">About {pet.name}</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                {pet.description || 'No description available.'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-300">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span>
                    <span className="text-slate-400">Posted:</span>{' '}
                    {new Date(pet.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                {pet.breed && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <span className="text-slate-400">Breed:</span>
                    <span>{pet.breed}</span>
                  </div>
                )}
                {pet.age && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <span className="text-slate-400">Age:</span>
                    <span>{pet.age} {pet.age === 1 ? 'year' : 'years'}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              {!isAdopted && !isOwner && isAuthenticated && (
                <button
                  onClick={handleAdopt}
                  disabled={adopting}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-lg transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {adopting ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Adopting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Adopt This Pet
                    </>
                  )}
                </button>
              )}
              {isAdopted && (
                <div className="flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-lg bg-green-500/20 border border-green-500/30 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  This Pet Has Been Adopted
                </div>
              )}
              <button
                onClick={handleLike}
                disabled={liking || isOwner || !isAuthenticated || isAdopted}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-lg transition-all duration-300 ${isLiked
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50'
                  } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
              >
                {liking ? (
                  <>
                    <LoadingSpinner size="sm" />
                    {isLiked ? 'Unliking...' : 'Liking...'}
                  </>
                ) : (
                  <>
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? 'Unlike This Pet' : 'Like This Pet'}
                  </>
                )}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                title="Share this pet"
              >
                <Share2 className="w-5 h-5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
