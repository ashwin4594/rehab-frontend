import React from "react";

export default function About() {
  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 100%)",
        color: "#1e293b",
        padding: "60px 20px",
      }}
    >
      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          textAlign: "center",
          padding: "50px 20px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            color: "#064e3b",
            marginBottom: "15px",
          }}
        >
          About <span style={{ color: "#16a34a" }}>Elite Rehab</span>
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#374151",
            lineHeight: "1.8",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          Elite Rehabilitation & De-Addiction Center is a trusted recovery
          facility committed to transforming lives through medical care,
          therapy, and emotional support. We help individuals rebuild their
          health, regain confidence, and restore balance — one step at a time.
        </p>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "stretch",
          gap: "30px",
          maxWidth: "1100px",
          margin: "60px auto",
        }}
      >
        {[
          {
            title: "🌿 Our Mission",
            text: "To heal, empower, and restore individuals through comprehensive de-addiction treatment and emotional rehabilitation — ensuring lifelong recovery with respect and compassion.",
          },
          {
            title: "💫 Our Vision",
            text: "To become India’s most trusted recovery center, where every patient finds hope, mental balance, and the strength to start again.",
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              flex: "1 1 450px",
              borderRadius: "16px",
              padding: "40px 30px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(0,0,0,0.08)";
            }}
          >
            <h2
              style={{
                color: "#047857",
                fontSize: "26px",
                marginBottom: "15px",
              }}
            >
              {item.title}
            </h2>
            <p
              style={{
                fontSize: "17px",
                color: "#374151",
                lineHeight: "1.7",
                textAlign: "justify",
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </section>

      {/* ===== CORE VALUES ===== */}
      <section
        style={{
          background: "#064e3b",
          color: "white",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "34px", fontWeight: "700", marginBottom: "20px" }}>
          💚 Our Core Values
        </h2>
        <p
          style={{
            fontSize: "18px",
            maxWidth: "800px",
            margin: "0 auto 40px",
            lineHeight: "1.8",
            color: "#d1fae5",
          }}
        >
          At Elite Rehab, our values shape every aspect of our care and define
          who we are.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "25px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {[
            {
              icon: "🤝",
              title: "Empathy",
              text: "We listen, understand, and support with compassion.",
            },
            {
              icon: "⚖️",
              title: "Integrity",
              text: "We maintain honesty and transparency in every step.",
            },
            {
              icon: "💪",
              title: "Commitment",
              text: "We walk with our patients until complete recovery.",
            },
            {
              icon: "🔒",
              title: "Confidentiality",
              text: "We protect every individual’s privacy and trust.",
            },
          ].map((value, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "25px",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.1)";
              }}
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#facc15",
                }}
              >
                {value.icon} {value.title}
              </h3>
              <p style={{ color: "#e2e8f0", fontSize: "16px" }}>{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FACILITIES ===== */}
      <section
        style={{
          maxWidth: "1000px",
          margin: "80px auto",
          textAlign: "center",
          backgroundColor: "#ffffff",
          padding: "60px 30px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ color: "#065f46", fontSize: "32px", marginBottom: "20px" }}>
          🏥 Facilities & Treatments
        </h2>
        <p
          style={{
            color: "#374151",
            fontSize: "17px",
            marginBottom: "30px",
          }}
        >
          Our rehabilitation programs are designed to provide care that is both
          clinical and compassionate:
        </p>
        <ul
          style={{
            listStyle: "none",
            textAlign: "left",
            maxWidth: "600px",
            margin: "0 auto",
            color: "#374151",
            fontSize: "17px",
            lineHeight: "1.8",
          }}
        >
          <li>✅ 24/7 Medical & Psychiatric Support</li>
          <li>✅ Personalized Detoxification Programs</li>
          <li>✅ Behavioral & Group Therapy</li>
          <li>✅ Family & Relationship Counseling</li>
          <li>✅ Post-Treatment Aftercare and Support</li>
        </ul>
      </section>

      {/* ===== CLOSING QUOTE ===== */}
      <section
        style={{
          backgroundColor: "#16a34a",
          color: "white",
          padding: "50px 20px",
          textAlign: "center",
          borderRadius: "12px",
          maxWidth: "900px",
          margin: "0 auto 60px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ fontSize: "24px", fontStyle: "italic", lineHeight: "1.6" }}>
          “Recovery is not about fighting addiction — it’s about rediscovering
          yourself.”
        </h3>
      </section>
    </div>
  );
}
