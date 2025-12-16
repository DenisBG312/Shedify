import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

  useEffect(() => {
    async function fetchPet() {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        navigate('/pets');
        return;
      }

      if (data.owner_id !== user.id) {
        navigate(`/pets/${id}`);
        return;
      }

      setPet(data);
      setLoading(false);
    }

    fetchPet();
  }, [id, user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from('pets')
      .update({
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
        description: pet.description,
        image_url: pet.image_url
      })
      .eq('id', id);

    setSaving(false);

    if (!error) {
      navigate(`/pets/${id}`);
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading pet..." />;
  }

  return (
    
  );
}
