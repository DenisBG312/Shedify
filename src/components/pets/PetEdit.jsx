import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function PetEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    async function fetchPet() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('pets')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError || !data) {
          navigate('/pets');
          return;
        }

        if (data.owner_id !== user?.id) {
          navigate(`/pets/${id}`);
          return;
        }

        setPet(data);
        setFormData({
          name: data.name || '',
          breed: data.breed || '',
          age: data.age ? String(data.age) : '',
          description: data.description || '',
        });
        setImagePreview(data.image_url || null);
      } catch (err) {
        console.error('Error fetching pet:', err);
        navigate('/pets');
      } finally {
        setLoading(false);
      }
    }

    if (id && user) {
      fetchPet();
    }
  }, [id, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      setImageFile(file);
      setRemoveImage(false);
      setError(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    if (!file || !user) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('pet-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('pet-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error('Error uploading image:', err);
      throw err;
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Pet name is required');
      return;
    }

    if (!user || !pet) {
      setError('You must be logged in to edit a pet');
      return;
    }

    if (removeImage && !imageFile) {
      setError('Please select an image. Image is required.');
      return;
    }

    if (!pet.image_url && !imageFile) {
      setError('Please select an image. Image is required.');
      return;
    }

    try {
      setSaving(true);

      let imageUrl = pet.image_url;
      
      if (removeImage) {
        if (!imageFile) {
          setError('Please select an image. Image is required.');
          setSaving(false);
          return;
        }
        imageUrl = await uploadImage(imageFile);
      } else if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const { error: updateError } = await supabase
        .from('pets')
        .update({
          name: formData.name.trim(),
          breed: formData.breed.trim() || null,
          age: formData.age ? parseInt(formData.age) : null,
          description: formData.description.trim() || null,
          image_url: imageUrl,
        })
        .eq('id', id);

      if (updateError) throw updateError;

      navigate(`/pets/${id}`);
    } catch (err) {
      console.error('Error updating pet:', err);
      setError(err.message || 'Failed to update pet. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading pet..." />;
  }

  if (!pet) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to={`/pets/${id}`}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Pet Details
        </Link>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
            <h1 className="text-3xl font-bold text-white">Edit Pet</h1>
            <p className="text-slate-400 text-sm mt-1">Update your pet's information</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Pet Image <span className="text-red-400">*</span>
              </label>
              <div className="mt-2">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg border border-slate-600/50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <label className="px-4 py-2 bg-blue-500/80 hover:bg-blue-500 rounded-lg text-white cursor-pointer transition-colors flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Change Image
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                          disabled={saving}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setRemoveImage(true);
                          setImagePreview(null);
                        }}
                        className="px-4 py-2 bg-red-500/80 hover:bg-red-500 rounded-lg text-white transition-colors flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setRemoveImage(true);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg text-white transition-colors md:hidden"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-600/50 rounded-lg cursor-pointer bg-slate-800/30 hover:bg-slate-800/50 hover:border-slate-500/50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-slate-400" />
                      <p className="mb-2 text-sm text-slate-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={saving}
                    />
                  </label>
                )}
              </div>
              {pet.image_url && !imageFile && (
                <p className="mt-2 text-xs text-slate-400">
                  Current image will be kept if no new image is uploaded
                </p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Pet Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                disabled={saving}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all disabled:opacity-50"
                placeholder="Enter pet name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="breed" className="block text-sm font-medium text-slate-300 mb-2">
                  Breed
                </label>
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  value={formData.breed}
                  onChange={handleInputChange}
                  disabled={saving}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all disabled:opacity-50"
                  placeholder="e.g., Golden Retriever"
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-slate-300 mb-2">
                  Age (years)
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="0"
                  max="30"
                  value={formData.age}
                  onChange={handleInputChange}
                  disabled={saving}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all disabled:opacity-50"
                  placeholder="e.g., 3"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                disabled={saving}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all disabled:opacity-50 resize-none"
                placeholder="Tell us about this pet..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Link
                to={`/pets/${id}`}
                className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 hover:border-slate-500/50 text-white font-semibold rounded-lg transition-all text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {saving ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
