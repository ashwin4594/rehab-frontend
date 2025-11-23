import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ add if you have a footer
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import VisitorDashboard from "./pages/VisitorDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      {/* ✅ Navbar visible on all pages */}
      <Navbar />

      {/* ✅ Main content area */}
      <main className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/" element={<Home />} />

          {/* Dashboards */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/visitor-dashboard" element={<VisitorDashboard />} />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <h2 className="p-10 text-center text-red-600 text-2xl">
                404 - Page Not Found
              </h2>
            }
          />
        </Routes>
      </main>

      {/* ✅ Footer visible on all pages */}
      <Footer />
    </Router>
  );
}

export default App;
