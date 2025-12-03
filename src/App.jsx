import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<div>Projects Page</div>} />
        <Route path="/tasks" element={<div>Tasks Page</div>} />
        <Route path="/calendar" element={<div>Calendar Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

