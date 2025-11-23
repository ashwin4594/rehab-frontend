import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { user, token } = res.data;

      if (!user || !user.role) {
        throw new Error("Invalid response from server. Role not found.");
      }

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      alert(`✅ Login successful! Welcome ${user.name}`);

      switch (user.role.toLowerCase()) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "doctor":
          navigate("/doctor-dashboard");
          break;
        case "staff":
          navigate("/staff-dashboard");
          break;
        case "patient":
          navigate("/patient-dashboard");
          break;
        default:
          navigate("/visitor-dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Login failed: " + (err.response?.data?.message || err.message || "Server error"));
    } finally {
      setLoading(false);
    }
  };

  // Inline Styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1950&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      fontFamily: "'Poppins', sans-serif",
    },
    formContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      padding: "40px",
      borderRadius: "16px",
      boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.2)",
      width: "350px",
      backdropFilter: "blur(8px)",
      textAlign: "center",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#2d4e40",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "25px",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      outline: "none",
      fontSize: "14px",
      transition: "0.3s",
    },
    inputFocus: {
      borderColor: "#4caf50",
      boxShadow: "0px 0px 5px rgba(76, 175, 80, 0.3)",
    },
    button: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      background: "linear-gradient(135deg, #4caf50, #2e7d32)",
      color: "white",
      fontSize: "16px",
      border: "none",
      cursor: "pointer",
      transition: "0.3s",
    },
    buttonHover: {
      background: "linear-gradient(135deg, #43a047, #1b5e20)",
      transform: "scale(1.02)",
    },
    footer: {
      marginTop: "20px",
      fontSize: "13px",
      color: "#333",
    },
    link: {
      color: "#2e7d32",
      textDecoration: "none",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  const [hover, setHover] = useState(false);

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Log in to your Rehabilitation Center account</p>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          value={formData.email}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
          style={styles.input}
        />

        <button
          type="submit"
          disabled={loading}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={hover ? { ...styles.button, ...styles.buttonHover } : styles.button}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.footer}>
          Don’t have an account?{" "}
          <a href="/signup" style={styles.link}>
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
