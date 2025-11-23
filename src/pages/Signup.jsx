import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient", // default role
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle signup submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      setMessage(res.data.message);
      setFormData({ name: "", email: "", password: "", role: "patient" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Styling
  const container = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e0f2f1, #a7f3d0)",
    fontFamily: "Poppins, sans-serif",
    padding: "20px",
  };

  const formStyle = {
    background: "white",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "450px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#065f46",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background 0.3s",
  };

  return (
    <div style={container}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ color: "#065f46", fontWeight: "700", marginBottom: "15px" }}>
          Create Your Account
        </h2>
        <p style={{ color: "#555", marginBottom: "25px" }}>
          Please fill out the form below to get started.
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          style={inputStyle}
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          style={inputStyle}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          style={inputStyle}
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Role Selector */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="staff">Staff</option>
        </select>

        {/* Doctor Approval Note */}
        {formData.role === "doctor" && (
          <p
            style={{
              background: "#fef3c7",
              color: "#92400e",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
              fontSize: "14px",
            }}
          >
            🩺 Note: Doctor accounts require admin approval before you can log in.
          </p>
        )}

        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#047857")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#065f46")}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Response Message */}
        {message && (
          <p
            style={{
              marginTop: "15px",
              color: message.includes("wait") ? "#ca8a04" : "#047857",
              fontWeight: "600",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ marginTop: "20px", color: "#555", fontSize: "14px" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#065f46", fontWeight: "600" }}>
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
