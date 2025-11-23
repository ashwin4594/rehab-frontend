import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorName: "",
    phone: "",
    date: "",
    reason: "",
  });

  /* -------------------- Fetch doctors & appointments -------------------- */
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/api/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/patient/appointments");
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchDoctors();
    fetchAppointments();

    // ✅ Real-time socket connection
    const socket = io("http://localhost:5000");
    if (user?.name) socket.emit("registerPatient", user.name);

    socket.on("appointmentStatusUpdated", (data) => {
      if (data.patientName === user.name) {
        toast.info(
          `📢 Your appointment with Dr. ${data.doctorName} is now ${data.status}!`,
          { position: "top-right", autoClose: 3000 }
        );

        // Update appointment status instantly
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === data._id ? { ...appt, status: data.status } : appt
          )
        );
      }
    });

    return () => socket.disconnect();
  }, [user?.name]);

  /* -------------------- Handle form changes -------------------- */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* -------------------- Book Appointment -------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAppointment = {
        doctorName: formData.doctorName || "All Doctors",
        patientName: user?.name,
        phone: formData.phone, // ✅ Added phone field
        date: formData.date,
        reason: formData.reason,
        status: "Scheduled",
      };

      await axios.post("http://localhost:5000/api/patient/book", newAppointment);
      toast.success("✅ Appointment booked successfully!");
      setAppointments((prev) => [...prev, newAppointment]);
      setFormData({ doctorName: "", phone: "", date: "", reason: "" }); // ✅ Reset includes phone now
    } catch (err) {
      console.error("Error booking appointment:", err.response?.data || err.message);
      toast.error("❌ Failed to book appointment.");
    }
  };

  /* -------------------- Sidebar Navigation -------------------- */
  const handleNavClick = (section) => {
    switch (section) {
      case "Dashboard":
        navigate("/patient-dashboard");
        break;
      case "Appointments":
        document.getElementById("appointments-section")?.scrollIntoView({
          behavior: "smooth",
        });
        break;
      case "Logout":
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
        break;
      default:
        break;
    }
  };

  /* -------------------- STYLES -------------------- */
  const styles = {
    page: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#f1f5f9",
    },
    sidebar: {
      width: "250px",
      background: "linear-gradient(180deg, #00796B, #004D40)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "30px 20px",
      boxShadow: "2px 0 15px rgba(0,0,0,0.15)",
      position: "sticky",
      top: "0",
      height: "100vh",
    },
    card: {
      background: "white",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
      marginBottom: "30px",
    },
  };

  /* -------------------- RENDER -------------------- */
  return (
    <div style={styles.page}>
      <ToastContainer />
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2
          style={{
            marginBottom: "40px",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          {/* 🏥 MediCare */}
        </h2>
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            padding: "10px",
            borderRadius: "50%",
            marginBottom: "10px",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/706/706807.png"
            alt="Patient Avatar"
            style={{ width: "80px", borderRadius: "50%" }}
          />
        </div>
        <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
          {user?.name || "Patient"}
        </p>
        <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>{user?.email}</p>

        <div style={{ marginTop: "40px", width: "100%" }}>
          {["Dashboard", "Appointments", "Logout"].map((item, i) => (
            <button
              key={i}
              onClick={() => handleNavClick(item)}
              style={{
                display: "block",
                width: "100%",
                padding: "12px",
                textAlign: "left",
                color: "white",
                background: "transparent",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.1)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "transparent")
              }
            >
              {item}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "40px" }}>
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(to right, #26A69A, #2E7D32, #388E3C)",
            color: "white",
            borderRadius: "15px",
            padding: "25px 40px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "5px" }}>
            Welcome, {user?.name || "Patient"} 👋
          </h1>
          <p>Your personalized health and appointment dashboard.</p>
        </div>

        {/* Appointment Booking */}
        <section id="booking-section">
          <div style={styles.card}>
            <h2 style={{ color: "#2E7D32", marginBottom: "20px" }}>
              📅 Book Appointment
            </h2>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
                gap: "15px",
                alignItems: "center",
              }}
            >
              <select
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  border: "1px solid #A5D6A7",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc, i) => (
                  <option key={i} value={doc.name}>
                    Dr. {doc.name} ({doc.specialization || "General"})
                  </option>
                ))}
              </select>

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  border: "1px solid #A5D6A7",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  border: "1px solid #A5D6A7",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />

              <input
                type="text"
                name="reason"
                placeholder="Reason"
                value={formData.reason}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  border: "1px solid #A5D6A7",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />

              <button
                type="submit"
                style={{
                  background: "linear-gradient(90deg, #43A047, #66BB6A)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background =
                    "linear-gradient(90deg, #2E7D32, #43A047)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background =
                    "linear-gradient(90deg, #43A047, #66BB6A)")
                }
              >
                Book
              </button>
            </form>
          </div>
        </section>

        {/* Appointment List */}
        <section id="appointments-section">
          <div style={styles.card}>
            <h2 style={{ color: "#2E7D32", marginBottom: "20px" }}>
              🩺 Your Appointments
            </h2>
            {appointments.length > 0 ? (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "1rem",
                }}
              >
                <thead>
                  <tr style={{ background: "#E8F5E9", color: "#2E7D32" }}>
                    <th style={{ padding: "12px", textAlign: "left" }}>Doctor</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Date</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Reason</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid #ddd",
                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#F1F8E9")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "white")
                      }
                    >
                      <td style={{ padding: "12px" }}>Dr. {appt.doctorName}</td>
                      <td style={{ padding: "12px" }}>{appt.date}</td>
                      <td style={{ padding: "12px" }}>{appt.reason}</td>
                      <td
                        style={{
                          padding: "12px",
                          color:
                            appt.status === "completed"
                              ? "#1B5E20"
                              : appt.status === "cancelled"
                              ? "red"
                              : "#1565C0",
                          fontWeight: "bold",
                        }}
                      >
                        {appt.status || "Pending"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: "#777" }}>No appointments booked yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
