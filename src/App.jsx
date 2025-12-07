import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/guards/PrivateRoute";


import PetsCatalog from "./components/pets/PetsCatalog";
import PetDetails from "./components/pets/PetDetails";
import CreatePet from "./components/pets/CreatePet";
import EditPet from "./components/pets/EditPet";

import SheltersPage from "./components/shelters/SheltersPage";
import FavoritesPage from "./components/favorites/FavoritesPage";
import EventsPage from "./components/events/EventsPage";
import ProfilePage from "./components/profile/ProfilePage";
import NotFound from "./components/NotFound";

import './index.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/pets" element={<PetsCatalog />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          
          <Route path="/shelters" element={<SheltersPage />} />
          <Route path="/events" element={<EventsPage />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/pets/create" 
            element={
              <PrivateRoute>
                <CreatePet />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/pets/:id/edit" 
            element={
              <PrivateRoute>
                <EditPet />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/favorites" 
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } 
          />
          
          {/* 404 Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

