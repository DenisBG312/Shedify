import { useParams } from 'react-router-dom';

// Edit Pet - CRUD Update operation (PRIVATE - Author only)
export default function EditPet() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-extrabold text-white mb-8">Edit Pet</h1>
        <div className="text-slate-400">
          <p>Pet ID: {id}</p>
          <p className="mt-4">Edit Pet placeholder - Will have form to edit pet with ID: {id}</p>
          <p className="mt-4">This is a PRIVATE page - requires authentication</p>
          <p className="mt-2">Only the author (pet creator) can edit/delete</p>
        </div>
      </div>
    </div>
  );
}

