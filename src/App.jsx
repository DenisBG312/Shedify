import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/guards/PrivateRoute";


import PetsCatalog from "./components/pets/PetsCatalog";
import PetDetails from "./components/pets/PetDetails";
import CreatePet from "./components/pets/CreatePet";
import EditPet from "./components/pets/PetEdit";

import ProfilePage from "./components/profile/ProfilePage";
import MyAdoptedPets from "./components/adopted/MyAdoptedPets";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

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
          <Route
            path="/pets/edit/:id"
            element={
              <PrivateRoute>
                <EditPet />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/pets/create"
            element={
              <PrivateRoute>
                <CreatePet />
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

          <Route
            path="/adopted-pets"
            element={
              <PrivateRoute>
                <MyAdoptedPets />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

