import React, { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/contact/send", formData);

      if (res.status === 201) {
        setStatus("✅ Message sent successfully! We'll contact you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
      setStatus("❌ Failed to send message. Please try again later.");
    }
  };

  // ---------- Styles ----------
  const container = {
    backgroundColor: "#f1f5f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    fontFamily: "Poppins, sans-serif",
  };

  const heading = {
    fontSize: "36px",
    color: "#065f46",
    fontWeight: "700",
    marginBottom: "10px",
  };

  const subText = {
    color: "#444",
    marginBottom: "30px",
    textAlign: "center",
    maxWidth: "600px",
  };

  const form = {
    backgroundColor: "#fff",
    padding: "35px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
  };

  const input = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    outline: "none",
  };

  const button = {
    width: "100%",
    backgroundColor: "#16a34a",
    color: "white",
    padding: "12px",
    fontSize: "18px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  };

  return (
    <div style={container}>
      <h1 style={heading}>Get in Touch</h1>
      <p style={subText}>
        We’re here to help you. Fill out the form below and our team will reach out to you shortly.
      </p>

      <form onSubmit={handleSubmit} style={form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          style={input}
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          style={input}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          style={input}
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"
          title="Please enter a 10-digit phone number"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          style={{ ...input, resize: "none" }}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          style={button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#15803d")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#16a34a")}
        >
          Send Message
        </button>

        {status && (
          <p
            style={{
              marginTop: "15px",
              color: status.startsWith("✅") ? "green" : "red",
              textAlign: "center",
            }}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
