# 🐾 PetHub — Adopt Your New Best Friend

---

## 📌 Overview

PetHub is a modern web platform that helps users browse, discover, and adopt pets. Built for speed, clarity, and accessibility — PetHub bridges the gap between people looking for a companion and stray animals looking for a loving home.

---

## 🚀 Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Supabase (Database, Auth, Storage)
* **Styling:** TailwindCSS

---

## ✨ Features

* 🔍 **Browse Pets** — filter by adoption status, age, breed, location
* 🐶 **Pet Profile Pages** — details, photos, shelter info
* 🔐 **User Authentication** — Supabase Auth
* 📝 **Adoption Requests** — submit & track
* 📦 **Supabase Storage** — upload pet images

---

## 🎨 Styling (TailwindCSS)

---

## 🔌 Supabase Service Layer

All queries are wrapped inside `/src/services/`.

### Example: Fetch pets

```js
export async function getPets() {
  const { data, error } = await supabase.from('pets').select('*');
  return { data, error };
}
```

---

## 🔄 User Flow

### 🐶 Adoption Process

1. User browses listings.
2. User opens a pet profile.
3. User submits an adoption form.
4. Shelter reviews the request.
5. User receives an approval/rejection.

---

## 🚀 Deployment

### Recommended Hosting

* **Frontend:** Vercel
* **Backend:** Supabase

### Environment Variables

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

---

## 🔮 Future Enhancements

* Real‑time chat between shelters & adopters
* Google Maps integration
* Pet medical history

---

## 📝 License

This project is open-source under the **MIT License**.

---

## 💛 Credits

Made with love by the PetHub team.
