import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        <Route path="/projects" element={<div>Projects Page</div>} />
        <Route path="/tasks" element={<div>Tasks Page</div>} />
        <Route path="/calendar" element={<div>Calendar Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

