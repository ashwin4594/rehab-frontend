import React from "react";
export default function StaffDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user?.name || "Staff"} 👋
      </h1>
      <p className="text-lg">You are logged in as <b>{user?.role}</b>.</p>
    </div>
  );
}
