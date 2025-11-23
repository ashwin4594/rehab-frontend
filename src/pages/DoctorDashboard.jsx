import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import backgroundImage from "../assets/WhatsApp Image 2025-11-02 at 6.30.46 PM.jpeg";

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [hoveredPatient, setHoveredPatient] = useState(null); // ✅ Tooltip hover state

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setDoctor(storedUser);

    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctor/appointments");
        setAppointments(res.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchLeaves = async () => {
      try {
        if (storedUser?.name) {
          const res = await axios.get(
            `http://localhost:5000/api/leave/my-leaves/${storedUser.name}`
          );
          setLeaves(res.data);
        }
      } catch (err) {
        console.error("Error fetching leaves:", err);
      }
    };

    fetchAppointments();
    fetchLeaves();

    // ✅ Socket.IO setup
    const socket = io("http://localhost:5000");
    if (storedUser?.name) socket.emit("registerDoctor", storedUser.name);

    socket.on("leaveUpdate", (data) => {
      alert(data.message);
      setLeaves((prev) =>
        prev.map((l) => (l.status === "Pending" ? { ...l, status: data.status } : l))
      );
    });

    socket.on("appointmentStatusUpdated", (data) => {
      console.log("Appointment update:", data);
    });

    return () => socket.disconnect();
  }, []);

  /* ✅ Submit Leave Form */
  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/leave/request", {
        name: doctor?.name,
        reason,
        fromDate,
        toDate,
      });
      alert("✅ Leave request submitted successfully!");
      setReason("");
      setFromDate("");
      setToDate("");
      setShowLeaveForm(false);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit leave request.");
    }
  };

  /* ✅ Mark appointment as completed */
  const handleMarkCompleted = async (id, patientName) => {
    try {
      await axios.put(`http://localhost:5000/api/doctor/appointments/${id}/complete`);
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: "completed" } : appt
        )
      );
      alert(`✅ Appointment marked as completed for ${patientName}!`);
    } catch (err) {
      console.error("Error updating appointment:", err);
      alert("❌ Failed to mark appointment as completed.");
    }
  };

  const buttonStyle = {
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "white",
    border: "none",
    padding: "15px 25px",
    fontSize: "1rem",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s ease",
  };

  if (!showLeaveForm) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Poppins, sans-serif",
          padding: "40px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            borderRadius: "20px",
            padding: "40px",
            width: "90%",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            backdropFilter: "blur(10px)",
            position: "relative",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid #d1fae5",
              paddingBottom: "20px",
              marginBottom: "30px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "2rem",
                  color: "#166534",
                  fontWeight: "700",
                }}
              >
                Welcome, Dr. {doctor?.name || "Doctor"} 👨‍⚕️
              </h1>
              <p style={{ color: "#047857" }}>
                {doctor?.role || "Specialist"} | Dashboard Overview
              </p>
            </div>
            <button
              onClick={() => setShowLeaveForm(true)}
              style={{
                ...buttonStyle,
                padding: "10px 20px",
                borderRadius: "8px",
              }}
            >
              Apply Leave
            </button>
          </div>

          {/* APPOINTMENTS TABLE */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              padding: "25px",
              position: "relative",
            }}
          >
            <h2
              style={{
                color: "#166534",
                marginBottom: "20px",
                fontWeight: "700",
              }}
            >
              🩺 My Appointments
            </h2>

            <div style={{ overflowX: "auto", position: "relative" }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={{ backgroundColor: "#ecfdf5" }}>
                    <th style={thStyle}>Patient</th>
                    <th style={thStyle}>Phone</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Reason</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appt) => (
                      <tr key={appt._id} style={trStyle}>
                        {/* ✅ Hover for tooltip */}
                        <td
                          style={{
                            ...tdStyle,
                            position: "relative",
                            cursor: "pointer",
                            fontWeight: "600",
                            color: "#065f46",
                          }}
                          onMouseEnter={() => setHoveredPatient(appt)}
                          onMouseLeave={() => setHoveredPatient(null)}
                        >
                          {appt.patientName}
                          {hoveredPatient?._id === appt._id && (
                            <div style={tooltipStyle}>
                              <p><b>Patient Name:</b> {appt.patientName}</p>
                              <p><b>Phone:</b> {appt.phone || "N/A"}</p>
                              <p><b>Date:</b> {appt.date}</p>
                              <p><b>Reason:</b> {appt.reason}</p>
                              <p><b>Status:</b> {appt.status}</p>
                            </div>
                          )}
                        </td>

                        <td style={tdStyle}>{appt.phone || "N/A"}</td>
                        <td style={tdStyle}>{appt.date}</td>
                        <td style={tdStyle}>{appt.reason}</td>
                        <td
                          style={{
                            ...tdStyle,
                            color:
                              appt.status === "completed"
                                ? "#15803d"
                                : appt.status === "Rejected"
                                ? "#dc2626"
                                : "#2563eb",
                            fontWeight: "600",
                          }}
                        >
                          {appt.status || "Pending"}
                        </td>
                        <td style={tdStyle}>
                          {appt.status !== "completed" && (
                            <button
                              style={{
                                background: "#22c55e",
                                color: "white",
                                border: "none",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "500",
                              }}
                              onClick={() =>
                                handleMarkCompleted(appt._id, appt.patientName)
                              }
                            >
                              Mark Completed
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        style={{
                          textAlign: "center",
                          padding: "15px",
                          color: "#888",
                        }}
                      >
                        No appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* LEAVE FORM VIEW */
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleLeaveSubmit}
        style={{
          backgroundColor: "rgba(255,255,255,0.95)",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          width: "400px",
        }}
      >
        <h2
          style={{
            color: "#16a34a",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Apply Leave Form
        </h2>

        <label>Reason for Leave</label>
        <textarea
          required
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={inputStyle}
          rows="3"
        />

        <label>From</label>
        <input
          type="date"
          required
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          style={inputStyle}
        />

        <label>To</label>
        <input
          type="date"
          required
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          style={inputStyle}
        />

        <div
          style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}
        >
          <button type="submit" style={{ ...buttonStyle, width: "48%" }}>
            Submit
          </button>
          <button
            type="button"
            onClick={() => setShowLeaveForm(false)}
            style={{ ...buttonStyle, width: "48%", background: "#6b7280" }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------- Inline Styles ---------- */
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "left",
};
const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #a7f3d0",
  color: "#065f46",
  fontWeight: "600",
};
const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
  color: "#374151",
};
const trStyle = { transition: "0.3s" };
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
};

/* ✅ Tooltip Style */
const tooltipStyle = {
  position: "absolute",
  top: "100%",
  left: "0",
  backgroundColor: "rgba(255,255,255,0.95)",
  color: "#064e3b",
  padding: "10px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  fontSize: "14px",
  lineHeight: "1.4",
  width: "220px",
  zIndex: 10,
  marginTop: "6px",
};
