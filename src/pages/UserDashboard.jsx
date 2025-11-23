import React from "react";

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
      <p className="text-lg text-gray-700">This is your user dashboard.</p>
    </div>
  );
}
