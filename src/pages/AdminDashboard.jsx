import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserMd,
  FaUsers,
  FaUserNurse,
  FaUserInjured,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaEnvelopeOpenText,
  FaUserClock,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("");
  const [users, setUsers] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [messages, setMessages] = useState([]);
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("users");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setAdminName(user.name);

    // load all data
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    await Promise.allSettled([
      fetchUsers(),
      fetchLeaves(),
      fetchMessages(),
      fetchPendingDoctors(),
    ]);
    setLoading(false);
  };

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users");
      // backend might return { users: [...] } or just [...]
      const data = res.data && res.data.users ? res.data.users : res.data;
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  // ✅ Fetch all leaves
  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/leaves");
      const data = res.data && res.data.leaves ? res.data.leaves : res.data;
      setLeaves(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching leaves:", error);
      setLeaves([]);
    }
  };

  // ✅ Fetch messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact/messages");
      const data = res.data && res.data.messages ? res.data.messages : res.data;
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    }
  };

  // ✅ Fetch pending doctors
  const fetchPendingDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/pending-doctors");
      // backend may return { doctors: [...] } or [...]
      const data = res.data && res.data.doctors ? res.data.doctors : res.data;
      setPendingDoctors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching pending doctors:", error);
      setPendingDoctors([]);
    }
  };

  // ✅ Approve doctor
  const handleApproveDoctor = async (id) => {
    if (!window.confirm("Approve this doctor?")) return;
    try {
      const res = await axios.put(`http://localhost:5000/api/admin/approve-doctor/${id}`);
      // remove approved doctor from UI
      setPendingDoctors((prev) => prev.filter((doc) => doc._id !== id && doc.id !== id));
      alert(res.data?.message || "Doctor approved successfully!");
    } catch (error) {
      console.error("Approve error:", error?.response?.data || error);
      alert("❌ Failed to approve doctor.");
    }
  };

  // ✅ Reject doctor (delete or mark rejected depending on your backend)
  const handleRejectDoctor = async (id) => {
    if (!window.confirm("Reject this doctor? This will remove their registration.")) return;
    try {
      // Endpoint should remove the pending doctor. Make sure backend implements it.
      const res = await axios.delete(`http://localhost:5000/api/admin/reject-doctor/${id}`);
      setPendingDoctors((prev) => prev.filter((doc) => doc._id !== id && doc.id !== id));
      alert(res.data?.message || "Doctor rejected and removed!");
    } catch (error) {
      console.error("Reject error:", error?.response?.data || error);
      alert("❌ Failed to reject doctor.");
    }
  };

  // ✅ Delete message
  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await axios.delete(`http://localhost:5000/api/contact/messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id && msg.id !== id));
      alert(res.data?.message || "Message deleted successfully!");
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("❌ Failed to delete message.");
    }
  };

  // ✅ Delete user
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id && u.id !== id));
      alert(res.data?.message || "User deleted successfully!");
    } catch (error) {
      console.error("Delete user error:", error);
      alert("❌ Failed to delete user.");
    }
  };

  // ✅ Approve/Reject leave
  const handleLeaveAction = async (id, action) => {
    try {
      const endpoint =
        action === "approve"
          ? `http://localhost:5000/api/admin/leave/approve/${id}`
          : `http://localhost:5000/api/admin/leave/reject/${id}`;

      const res = await axios.put(endpoint);
      alert(res.data?.message || "Leave updated.");

      setLeaves((prev) =>
        prev.map((l) =>
          l._id === id || l.id === id
            ? { ...l, status: action === "approve" ? "Approved" : "Rejected" }
            : l
        )
      );
    } catch (error) {
      console.error("Leave action error:", error);
      alert("❌ Failed to update leave status.");
    }
  };

  // ✅ Count roles
  const roleCounts = users.reduce(
    (acc, u) => {
      const role = u.role || "visitor";
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    },
    { doctor: 0, staff: 0, patient: 0, admin: 0 }
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f1f8f5, #d9f0e4)",
        fontFamily: "'Poppins', sans-serif",
        padding: "30px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(90deg, #26A69A, #2E7D32)",
          color: "white",
          borderRadius: "15px",
          padding: "25px",
          textAlign: "center",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "2.3rem", fontWeight: "bold" }}>
          Welcome, {adminName || "Admin"} 👋
        </h1>
        <p>Manage users, doctor approvals, leaves, and messages efficiently</p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        {[
          { id: "users", label: "Manage Users" },
          { id: "pending", label: "Pending Doctors" },
          { id: "leaves", label: "Manage Leaves" },
          { id: "messages", label: "Messages" },
        ].map((tabItem) => (
          <button
            key={tabItem.id}
            onClick={() => setTab(tabItem.id)}
            style={{
              background: tab === tabItem.id ? "#2E7D32" : "white",
              color: tab === tabItem.id ? "white" : "#2E7D32",
              border: "1px solid #2E7D32",
              padding: "10px 25px",
              borderRadius: "25px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            {tabItem.label}
          </button>
        ))}
      </div>

      {/* ====================== PENDING DOCTORS ====================== */}
      {tab === "pending" && (
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              color: "#2E7D32",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <FaUserClock /> Pending Doctor Approvals
          </h2>

          {pendingDoctors.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>
              No pending doctor approvals.
            </p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#E8F5E9" }}>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Registered On</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingDoctors.map((doc) => (
                  <tr key={doc._id || doc.id} style={trStyle}>
                    <td style={tdStyle}>{doc.name}</td>
                    <td style={tdStyle}>{doc.email}</td>
                    <td style={tdStyle}>
                      {doc.createdAt ? new Date(doc.createdAt).toLocaleString() : "N/A"}
                    </td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => handleApproveDoctor(doc._id || doc.id)}
                        style={approveBtn}
                      >
                        <FaCheckCircle /> Approve
                      </button>
                      <button
                        onClick={() => handleRejectDoctor(doc._id || doc.id)}
                        style={rejectBtn}
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ====================== USERS, LEAVES, MESSAGES ====================== */}
      {tab === "users" && (
        <UserManagement
          users={users}
          loading={loading}
          roleCounts={roleCounts}
          handleDeleteUser={handleDeleteUser}
        />
      )}
      {tab === "leaves" && (
        <LeaveManagement leaves={leaves} handleLeaveAction={handleLeaveAction} />
      )}
      {tab === "messages" && (
        <MessageManagement
          messages={messages}
          handleDeleteMessage={handleDeleteMessage}
        />
      )}
    </div>
  );
}

/* ----------- Reusable Sections (Clean Separation) ----------- */
function UserManagement({ users, loading, roleCounts, handleDeleteUser }) {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <Card title="Total Users" count={users.length} icon={<FaUsers />} />
        <Card title="Doctors" count={roleCounts.doctor} icon={<FaUserMd />} />
        <Card title="Staff" count={roleCounts.staff} icon={<FaUserNurse />} />
        <Card title="Patients" count={roleCounts.patient} icon={<FaUserInjured />} />
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#2E7D32", textAlign: "center", marginBottom: "20px" }}>
          All Registered Users
        </h2>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#E8F5E9" }}>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id || u.id} style={trStyle}>
                  <td style={tdStyle}>{u.name}</td>
                  <td style={tdStyle}>{u.email}</td>
                  <td style={{ ...tdStyle, color: "#2E7D32" }}>
                    {String(u.role || "visitor").charAt(0).toUpperCase() +
                      String(u.role || "visitor").slice(1)}
                  </td>
                  <td style={tdStyle}>
                    <button onClick={() => handleDeleteUser(u._id || u.id)} style={deleteBtn}>
                      <FaTrash /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function LeaveManagement({ leaves, handleLeaveAction }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#2E7D32", textAlign: "center", marginBottom: "20px" }}>
        📝 Leave Requests
      </h2>
      {leaves.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No leave requests yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#E8F5E9" }}>
            <tr>
              <th style={thStyle}>Employee</th>
              <th style={thStyle}>Reason</th>
              <th style={thStyle}>From</th>
              <th style={thStyle}>To</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id || leave.id} style={trStyle}>
                <td style={tdStyle}>{leave.name}</td>
                <td style={tdStyle}>{leave.reason}</td>
                <td style={tdStyle}>{leave.fromDate}</td>
                <td style={tdStyle}>{leave.toDate}</td>
                <td style={{ ...tdStyle, fontWeight: "600" }}>
                  <span
                    style={{
                      color:
                        leave.status === "Approved"
                          ? "#16a34a"
                          : leave.status === "Rejected"
                          ? "#dc2626"
                          : "#2563eb",
                    }}
                  >
                    {leave.status}
                  </span>
                </td>
                <td style={tdStyle}>
                  {leave.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleLeaveAction(leave._id || leave.id, "approve")}
                        style={approveBtn}
                      >
                        <FaCheckCircle /> Approve
                      </button>
                      <button
                        onClick={() => handleLeaveAction(leave._id || leave.id, "reject")}
                        style={rejectBtn}
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function MessageManagement({ messages, handleDeleteMessage }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#2E7D32", textAlign: "center", marginBottom: "20px" }}>
        <FaEnvelopeOpenText /> Contact Messages
      </h2>
      {messages.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No messages received yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#E8F5E9" }}>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Message</th>
              <th style={thStyle}>Received On</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id || msg.id} style={trStyle}>
                <td style={tdStyle}>{msg.name}</td>
                <td style={tdStyle}>{msg.email}</td>
                <td style={tdStyle}>{msg.phone}</td>
                <td style={tdStyle}>{msg.message}</td>
                <td style={tdStyle}>
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "N/A"}
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleDeleteMessage(msg._id || msg.id)}
                    style={deleteBtn}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* ======= Reusable Card + Table Styles ======= */
const Card = ({ title, count, icon }) => (
  <div
    style={{
      backgroundColor: "white",
      borderRadius: "15px",
      padding: "25px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <div>
      <h3 style={{ color: "#2E7D32" }}>{title}</h3>
      <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#1B5E20" }}>
        {count}
      </p>
    </div>
    <div style={{ fontSize: "1.8rem", color: "#2E7D32" }}>{icon}</div>
  </div>
);

const thStyle = {
  textAlign: "left",
  padding: "12px",
  fontWeight: "600",
  borderBottom: "2px solid #A5D6A7",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #E0E0E0",
  verticalAlign: "top",
};

const trStyle = { transition: "0.3s" };

const deleteBtn = {
  background: "#C62828",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "6px 12px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

const approveBtn = {
  background: "#2E7D32",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "6px 10px",
  marginRight: "8px",
  cursor: "pointer",
};

const rejectBtn = {
  background: "#C62828",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "6px 10px",
  cursor: "pointer",
};
