import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/elite-logo.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState({ token: null, user: null });
  const navigate = useNavigate();

  useEffect(() => {
    const read = () => ({
      token: localStorage.getItem('token'),
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    });
    setAuth(read());

    const onStorage = (e) => {
      if (e.key === 'token' || e.key === 'user') setAuth(read());
    };
    const onAuthChange = () => setAuth(read());
    window.addEventListener('storage', onStorage);
    window.addEventListener('authChange', onAuthChange);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('authChange', onAuthChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ token: null, user: null });
    // notify UI in same tab
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  const navLinksBase = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const roleToDashboardPath = (role) => {
    if (!role) return '/visitor-dashboard';
    const r = String(role).toLowerCase();
    switch (r) {
      case 'admin':
        return '/admin-dashboard';
      case 'doctor':
      case 'therapist':
        return '/doctor-dashboard';
      case 'staff':
        return '/staff-dashboard';
      case 'patient':
        return '/patient-dashboard';
      case 'visitor':
        return '/visitor-dashboard';
      case 'user':
        return '/user-dashboard';
      default:
        return '/visitor-dashboard';
    }
  };

  const navLinks = auth.token
    ? [...navLinksBase, { name: auth.user?.role || 'Dashboard', path: roleToDashboardPath(auth.user?.role) }]
    : [...navLinksBase, { name: 'Login', path: '/login' }];

  return (
    <nav
      style={{
        background: "linear-gradient(90deg, #0d9488, #065f46)", // 🌿 soft teal-green gradient
        color: "white",
        padding: "14px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo + Center Name */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <img
          src={logo}
          alt="Elite Rehab Logo"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: "700",
              color: "#facc15", // golden brand accent
              letterSpacing: "1px",
            }}
          >
            Elite Rehab
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              color: "#e2e8f0",
              letterSpacing: "0.5px",
            }}
          >
            Rehabilitation & De-Addiction Center
          </p>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="nav-links" style={{ display: "flex", gap: "30px" }}>
        {navLinks.map((link, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to={link.path}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "500",
                position: "relative",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#facc15")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
            >
              {link.name}
              <motion.span
                layoutId="underline"
                whileHover={{
                  scaleX: 1,
                  opacity: 1,
                }}
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: "-4px",
                  height: "2px",
                  width: "100%",
                  background: "#facc15",
                  transformOrigin: "left",
                  scaleX: 0,
                  transition: "transform 0.3s ease",
                }}
              />
            </Link>
          </motion.div>
        ))}
        {/* If authenticated, show Logout button */}
        {auth.token && (
          <button onClick={logout} className="btn" style={{ marginLeft: 12 }}>
            Logout
          </button>
        )}
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div
        className="menu-icon"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "none",
          flexDirection: "column",
          cursor: "pointer",
          gap: "5px",
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              width: "25px",
              height: "3px",
              backgroundColor: "#fff",
              borderRadius: "3px",
            }}
          ></div>
        ))}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              top: "70px",
              right: "0",
              background: "linear-gradient(180deg, #0d9488, #065f46)",
              width: "100%",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "15px 0",
              gap: "15px",
            }}
          >
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "18px",
                  fontWeight: "500",
                  transition: "0.3s",
                }}
              >
                {link.name}
              </Link>
            ))}
            {auth.token && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                style={{
                  color: '#fff',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '8px 12px',
                  borderRadius: 8,
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }
          .menu-icon {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
