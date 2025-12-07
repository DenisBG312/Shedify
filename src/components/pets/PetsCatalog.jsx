import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Filter, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import LoadingSpinner from '../ui/LoadingSpinner';
import CreatePetModal from './CreatePetModal';
import PetCard from './PetCard';
import { useAuth } from '../../contexts/AuthContext';

export default function PetsCatalog() {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBreed, setFilterBreed] = useState('all');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('pets')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setPets(data || []);
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Failed to load pets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handlePetCreated = () => {
    fetchPets();
  };

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBreed = filterBreed === 'all' ||
      pet.breed?.toLowerCase().includes(filterBreed.toLowerCase());

    return matchesSearch && matchesBreed;
  });

  const uniqueBreeds = [...new Set(pets.map(pet => pet.breed).filter(Boolean))];

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading pets..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2">Browse All Pets</h1>
            <p className="text-slate-400 text-lg">
              Discover your perfect companion from our loving pets waiting for a home
            </p>
          </div>
          {user && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
          >
            <Plus className="w-5 h-5" />
            Add Pet
          </button>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm">
            {error}
          </div>
        )}

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, breed, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-slate-400" />
            </div>
            <select
              value={filterBreed}
              onChange={(e) => setFilterBreed(e.target.value)}
              className="pl-10 pr-8 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Breeds</option>
              {uniqueBreeds.map(breed => (
                <option key={breed} value={breed.toLowerCase()}>{breed}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6 text-slate-400 text-sm">
          Showing {filteredPets.length} {filteredPets.length === 1 ? 'pet' : 'pets'}
        </div>

        {filteredPets.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-slate-400 text-lg mb-4">No pets found</div>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}

        <CreatePetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handlePetCreated}
        />
      </div>
    </div>
  );
}
