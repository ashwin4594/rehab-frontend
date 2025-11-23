import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import axios from "axios";

// ✅ Banner Images
import noDrugs from "../assets/WhatsApp Image 2025-11-02 at 12.38.06_daab534b.jpg";
import alcoholAbuse from "../assets/WhatsApp Image 2025-11-02 at 12.38.06_44d0c701.jpg";
import alcoholEffects from "../assets/WhatsApp Image 2025-11-02 at 12.38.07_695dc029.jpg";

export default function Home() {
  const bannerImages = [noDrugs, alcoholAbuse, alcoholEffects];
  const [currentImage, setCurrentImage] = useState(0);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 300], [0, -60]); // smooth parallax shift

  // Appointment form states
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  // ✅ Smooth auto-scroll
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // ✅ Handle form submission
  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/patient/book", {
        patientName,
        phone,
        date,
        reason,
      });
      alert("✅ Appointment booked successfully!");
      setPatientName("");
      setPhone("");
      setDate("");
      setReason("");
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert("❌ Failed to book appointment. Please fill all fields correctly.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "linear-gradient(to bottom, #ffffff, #f0fdf4)",
        color: "#1e293b",
        overflowX: "hidden",
        scrollBehavior: "smooth",
      }}
    >
      {/* 🌄 Hero Section (Image Left + Text Right) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "80vh",
          padding: "40px 5%",
          background: "linear-gradient(to right, #ffffff, #f0fdf4)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Left Image Slider with Parallax */}
        <motion.div
          style={{
            flex: "1",
            height: "100%",
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            y: parallaxY,
          }}
        >
          <AnimatePresence>
            <motion.img
              key={currentImage}
              src={bannerImages[currentImage]}
              alt={`Banner ${currentImage + 1}`}
              initial={{ opacity: 0, x: -60, scale: 1.05 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 1.05 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </AnimatePresence>
        </motion.div>

        {/* Right Info Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{
            flex: "1",
            maxWidth: "45%",
            background:
              "linear-gradient(135deg, rgba(240,253,244,0.9), rgba(255,255,255,0.95))",
            padding: "40px 50px",
            borderRadius: "20px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            marginLeft: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "#064e3b",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            Begin Your Journey to Recovery
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              lineHeight: "1.8",
              marginBottom: "25px",
            }}
          >
            <b>Elite Rehab & De-Addiction Center</b> provides evidence-based
            addiction recovery programs. With expert psychiatrists, therapists,
            and compassionate staff, we ensure a holistic approach to mental,
            emotional, and physical wellness.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() =>
              document
                .getElementById("appointment-form")
                .scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: "linear-gradient(90deg, #16a34a, #22c55e)",
              color: "white",
              border: "none",
              padding: "14px 36px",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "18px",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(22,163,74,0.4)",
            }}
          >
            Book an Appointment
          </motion.button>
        </motion.div>
      </div>

      {/* 💚 Services Section */}
      <motion.section
        style={{
          background: "linear-gradient(to right, #f0fdf4, #ffffff)",
          padding: "100px 20px",
          textAlign: "center",
        }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2
          style={{
            fontSize: "34px",
            fontWeight: "700",
            color: "#064e3b",
            marginBottom: "10px",
          }}
        >
          Our Specialized Treatments
        </h2>
        <p style={{ color: "#047857", fontSize: "18px", marginBottom: "50px" }}>
          Personalized rehabilitation programs designed to heal body and mind.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "40px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {[
            {
              title: "🍷 Alcohol De-Addiction",
              desc: "Personalized recovery plans for alcohol dependence.",
            },
            {
              title: "💊 Drug Detox & Rehab",
              desc: "Safe detoxification under medical supervision.",
            },
            {
              title: "🧠 Psychological Counseling",
              desc: "One-on-one therapy to rebuild confidence and clarity.",
            },
            {
              title: "🙏 Spiritual Healing",
              desc: "Calming therapies promoting inner peace and strength.",
            },
            {
              title: "👨‍👩‍👧 Family Therapy",
              desc: "Counseling to rebuild relationships and support systems.",
            },
            {
              title: "🩺 24/7 Medical Support",
              desc: "Round-the-clock care from qualified professionals.",
            },
          ].map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "#fff",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                padding: "30px",
                borderTop: "4px solid #16a34a",
              }}
            >
              <h3 style={{ color: "#166534", fontSize: "20px", fontWeight: 600 }}>
                {service.title}
              </h3>
              <p style={{ color: "#475569", fontSize: "15px", marginTop: "10px" }}>
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 🩺 Appointment Form */}
      <motion.section
        id="appointment-form"
        style={{
          background: "#ecfdf5",
          padding: "100px 20px",
          textAlign: "center",
        }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2
          style={{
            fontSize: "34px",
            color: "#064e3b",
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          Book Your Appointment
        </h2>
        <p style={{ color: "#047857", marginBottom: "40px" }}>
          📞 Call us directly at <b>+91 630441240</b> or fill the form below.
        </p>

        <motion.form
          onSubmit={handleAppointmentSubmit}
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            backgroundColor: "#fff",
            padding: "50px",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            textAlign: "left",
          }}
          whileHover={{ scale: 1.01 }}
        >
          <label>Full Name</label>
          <input
            type="text"
            required
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            style={inputStyle}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            required
            pattern="[0-9]{10}"
            placeholder="Enter 10-digit phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />

          <label>Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />

          <label>Reason</label>
          <textarea
            required
            rows="3"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={inputStyle}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            style={{
              background: "linear-gradient(90deg, #16a34a, #22c55e)",
              color: "#fff",
              border: "none",
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            Submit Appointment
          </motion.button>
        </motion.form>
      </motion.section>

      {/* 🌍 Footer */}
      <footer
        style={{
          background: "linear-gradient(90deg, #064e3b, #0f766e)",
          color: "white",
          textAlign: "center",
          padding: "40px 20px",
        }}
      >
        <h3 style={{ marginBottom: "10px", color: "#facc15" }}>
          Elite Rehab & De-Addiction Center
        </h3>
        <p>📍 Hyderabad | ☎️ +91-630441240 | ✉️ taruntej9300@gmail.com</p>
        <p style={{ marginTop: "10px", color: "#d1fae5", fontSize: "14px" }}>
          {/* © {new Date().getFullYear()}  */}
        </p>
      </footer>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "16px",
  transition: "0.3s",
};
