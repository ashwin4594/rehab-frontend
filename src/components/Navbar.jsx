import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/elite-logo.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    // { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "Login", path: "/login" },
  ];

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
