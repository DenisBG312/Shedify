# 🐾 PetHub

<div align="center">

**A modern pet adoption platform connecting loving families with pets in need of a home**

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.86.2-3ECF8E?logo=supabase)](https://supabase.com/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure)

</div>

---

## 📖 About

PetHub is a full-featured pet adoption platform that makes it easy to discover, connect with, and adopt pets. Built with modern web technologies, PetHub provides a seamless experience for both pet owners looking to find homes for their pets and families searching for their perfect companion.

### Key Highlights

- 🎨 **Beautiful UI** - Modern, responsive design with dark theme and smooth animations
- 🔐 **Secure Authentication** - User accounts with Supabase Auth
- 📸 **Image Management** - Upload and manage pet photos with Supabase Storage
- 🔍 **Advanced Search** - Filter pets by adoption status with real-time search
- ❤️ **Social Features** - Like pets, share profiles, and track favorites
- 📊 **User Dashboard** - Track your created pets, adopted pets, and activity

---

## ✨ Features

### 🔍 Browse & Discover
- **Search Functionality** - Search pets by name, breed, or description
- **Adoption Status Filter** - Filter by adopted or available pets
- **Pagination** - Browse through pets with 6 pets per page
- **Visual Indicators** - Clear badges showing adoption status

### 🐕 Pet Management
- **Create Pet Listings** - Upload photos and create detailed pet profiles
- **Edit Pet Information** - Update pet details and images
- **Pet Details Page** - Comprehensive pet information with images
- **Image Upload** - Drag-and-drop image upload with preview

### ❤️ Social & Interaction
- **Like Pets** - Show appreciation and save favorites
- **Share Profiles** - Share pet profiles via native share API or copy link
- **Adopt Pets** - Direct adoption functionality with tracking
- **My Adopted Pets** - View all pets you've adopted in one place

### 👤 User Features
- **User Authentication** - Secure login and registration
- **Profile Management** - Edit display name and view statistics
- **Activity Tracking** - See your created pets, adopted pets count
- **Protected Routes** - Secure access to user-specific pages

### 🎨 UI/UX
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark Theme** - Beautiful gradient-based dark theme
- **Smooth Animations** - Hover effects and transitions throughout
- **404 Page** - Custom not found page with navigation
- **Footer** - Comprehensive footer with links and information

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern React with hooks
- **Vite 7.1.7** - Fast build tool and dev server
- **React Router 7.10.0** - Client-side routing
- **TailwindCSS 4.1.17** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Backend & Services
- **Supabase** - Backend as a Service
  - **Authentication** - User management and auth
  - **PostgreSQL Database** - Pet data storage
  - **Storage** - Image upload and management

### Development Tools
- **ESLint** - Code linting and quality
- **TypeScript Types** - Type definitions for React

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DenisBG312/pethub.git
   cd pethub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**
   
   Create the following table in your Supabase project:
   ```sql
   CREATE TABLE pets (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     breed TEXT,
     age INTEGER,
     description TEXT,
     image_url TEXT NOT NULL,
     owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     adopted_by UUID REFERENCES auth.users(id),
     likes INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   Create a storage bucket named `pet-images` with public access.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── adopted/
│   │   └── MyAdoptedPets.jsx      # User's adopted pets page
│   ├── favorites/
│   │   └── FavoritesPage.jsx      # Favorites page (placeholder)
│   ├── guards/
│   │   └── PrivateRoute.jsx       # Route protection component
│   ├── pets/
│   │   ├── CreatePet.jsx          # Create pet page
│   │   ├── CreatePetModal.jsx     # Create pet modal
│   │   ├── EditPetModal.jsx       # Edit pet modal
│   │   ├── PetCard.jsx            # Pet card component
│   │   ├── PetDetails.jsx         # Pet details page
│   │   ├── PetEdit.jsx            # Edit pet page
│   │   └── PetsCatalog.jsx        # Main pets catalog with pagination
│   ├── profile/
│   │   └── ProfilePage.jsx        # User profile page
│   ├── ui/
│   │   └── LoadingSpinner.jsx     # Loading spinner component
│   ├── Footer.jsx                  # Footer component
│   ├── Home.jsx                    # Landing page
│   ├── Login.jsx                   # Login page
│   ├── Navbar.jsx                  # Navigation bar
│   ├── NotFound.jsx                 # 404 page
│   ├── Register.jsx                 # Registration page
│   └── ScrollToTop.jsx             # Scroll to top on route change
├── contexts/
│   └── AuthContext.jsx             # Authentication context
├── lib/
│   └── supabase.js                 # Supabase client configuration
├── App.jsx                          # Main app component with routes
├── main.jsx                         # Application entry point
└── index.css                        # Global styles
```

---

## 🎯 Key Features Explained

### Authentication Flow
- Users can register and login using Supabase Auth
- Protected routes require authentication
- User session is managed via React Context

### Pet Adoption Process
1. Browse available pets in the catalog
2. View detailed pet information
3. Click "Adopt This Pet" button
4. Pet is marked as adopted and linked to your account
5. View all adopted pets in "My Adopted Pets" page

### Pet Listing Management
- **Create**: Upload image, add details, and publish listing
- **Edit**: Update pet information and replace images
- **Delete**: Remove pet listings (owner only)
- **View**: Browse all pets with search and filters

### Search & Filter
- Real-time search across pet names, breeds, and descriptions
- Filter by adoption status (All, Adopted, Not Adopted)
- Pagination with 6 pets per page
- Results counter showing current range

---

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```
---

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

---

## 🗄️ Database Schema

### Pets Table
```sql
- id: UUID (Primary Key)
- name: TEXT (Required)
- breed: TEXT (Optional)
- age: INTEGER (Optional)
- description: TEXT (Optional)
- image_url: TEXT (Required)
- owner_id: UUID (Foreign Key → auth.users)
- adopted_by: UUID (Foreign Key → auth.users, Nullable)
- likes: INTEGER (Default: 0)
- created_at: TIMESTAMP
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Blue to Purple gradients
- **Success**: Green to Emerald
- **Danger**: Red to Pink
- **Background**: Slate 900/800 gradients
- **Text**: White with slate variations

### Typography
- **Headings**: Bold, gradient text effects
- **Body**: Slate color variations for hierarchy
- **Links**: Hover effects with color transitions

### Components
- Consistent border radius (rounded-lg, rounded-xl)
- Backdrop blur effects
- Gradient backgrounds
- Smooth transitions and hover states

---

## 🔐 Security Features

- **Route Protection** - Private routes require authentication
- **Owner Verification** - Only pet owners can edit/delete their listings
- **Input Validation** - Form validation on client side
- **Secure Storage** - Images stored in Supabase Storage with access control

---

## 🚧 Future Enhancements

- [ ] Real-time chat between adopters and pet owners
- [ ] Email notifications for adoption requests
- [ ] Advanced filtering (by breed, age range, location)
- [ ] Pet medical history tracking
- [ ] Reviews and ratings system
- [ ] Multi-image support for pet galleries
- [ ] Admin dashboard for platform management
- [ ] Mobile app version

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 💝 Acknowledgments

- [Supabase](https://supabase.com/) for the amazing backend platform
- [Lucide](https://lucide.dev/) for the beautiful icons
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- All the pet lovers who make this platform meaningful

---

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

<div align="center">

**Made with ❤️ for pets and their future families**

[⬆ Back to Top](#-pethub)

</div>
