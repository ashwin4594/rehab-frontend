import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import logo from "../assets/elite-logo.jpg";

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(90deg, #064e3b, #0d9488)",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        padding: "60px 20px 0",
        marginTop: "60px",
      }}
    >
      {/* Top Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "flex-start",
          gap: "40px",
          marginBottom: "40px",
        }}
      >
        {/* Logo and About */}
        <div style={{ maxWidth: "350px", textAlign: "center" }}>
          <img
            src={logo}
            alt="Elite Rehab Logo"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "10px",
              marginBottom: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          />
          <h3
            style={{
              color: "#facc15",
              fontWeight: "700",
              fontSize: "22px",
              marginBottom: "10px",
            }}
          >
            Elite Rehab & De-Addiction Center
          </h3>
          <p
            style={{
              fontSize: "14px",
              lineHeight: "1.7",
              color: "#e2e8f0",
            }}
          >
            A trusted rehabilitation and de-addiction center helping individuals recover through
            therapy, counseling, and holistic healing in a peaceful and supportive environment.
          </p>
        </div>

        {/* Contact Info */}
        <div style={{ textAlign: "left", maxWidth: "330px" }}>
          <h4
            style={{
              color: "#facc15",
              marginBottom: "15px",
              fontWeight: "600",
              fontSize: "18px",
              borderBottom: "2px solid #facc15",
              display: "inline-block",
              paddingBottom: "4px",
            }}
          >
            Contact Information
          </h4>

          <p style={infoLine}>
            <FaMapMarkerAlt color="#facc15" />
            H.No 8-5-255/98, Plot No 98, Defence Colony,
            <br />
            Beside Ayyappa Swamy Temple, Road No 9,
            <br />
            Karmanghat, Hyderabad – 500079
          </p>

          <p style={infoLine}>
            <FaPhoneAlt color="#facc15" /> +91 630441240 / +91 9441789537
          </p>

          <p style={infoLine}>
            <FaEnvelope color="#facc15" /> contact@eliterehab.in
          </p>

          <p style={infoLine}>
            <FaClock color="#facc15" /> Mon - Sun: 8:00 AM - 8:00 PM
          </p>

          {/* Google Map Button */}
          <a
            href="https://maps.app.goo.gl/FsJ377ZUsdQx2quUA"
            target="_blank"
            rel="noopener noreferrer"
            style={mapButton}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fde047")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#facc15")}
          >
            <FaMapMarkerAlt style={{ marginRight: "8px" }} /> View on Google Maps
          </a>
        {/* </div>

        Opening Statement or Motto
        <div style={{ maxWidth: "350px", textAlign: "center" }}> */}
          <h4
            style={{
              color: "#facc15",
              marginBottom: "15px",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            Our Commitment
          </h4><ln> </ln>
          <p
            style={{
              fontSize: "14px",
              color: "#e2e8f0",
              lineHeight: "1.7",
            }}
          >
            At <strong>Elite Rehab</strong>, we believe recovery is not just about treatment —
            it’s about rediscovering strength, balance, and purpose.  
            Together, we guide individuals towards lasting healing and inner peace.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.2)",
          textAlign: "center",
          padding: "15px 10px",
          fontSize: "14px",
          color: "#e2e8f0",
          backgroundColor: "rgba(0,0,0,0.15)",
        }}
      >
        © {new Date().getFullYear()} Elite Rehabilitation & De-Addiction Center | All Rights Reserved
      </div>
    </footer>
  );
}

/* ---------- Reusable Styles ---------- */
const infoLine = {
  margin: "10px 0",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  lineHeight: "1.6",
};

const mapButton = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#facc15",
  color: "#064e3b",
  padding: "10px 18px",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "600",
  marginTop: "10px",
  transition: "0.3s",
};
