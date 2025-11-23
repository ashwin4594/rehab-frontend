import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function Dashboard(){
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const [appointments,setAppointments] = useState([]);
  const [programs,setPrograms] = useState([]);

  useEffect(()=> {
    API.get('/programs').then(r=>setPrograms(r.data)).catch(()=>{});
    if (user) {
      // fetch appointments for allowed roles
      API.get('/appointments').then(r=>setAppointments(r.data)).catch(()=>{});
    }
  }, []);

  if(!user) return <div className="container" style={{paddingTop:20}}>Please login <a href="/login" className="btn">Login</a></div>;

  return (
    <div className="container" style={{paddingTop:20}}>
      <h2>Dashboard — {user.role}</h2>

      {user.role === 'admin' && (
        <section style={{marginTop:12}}>
          <h3>Admin: Manage</h3>
          <p>Programs: {programs.length}</p>
          <p>Appointments: {appointments.length}</p>
        </section>
      )}

      {user.role === 'manager' && (
        <section style={{marginTop:12}}>
          <h3>Manager view</h3>
          <p>Programs: {programs.length}</p>
        </section>
      )}

      {(user.role === 'doctor' || user.role === 'therapist') && (
        <section style={{marginTop:12}}>
          <h3>Clinical view</h3>
          <h4>Appointments</h4>
          <div>
            {appointments.map(a => <div key={a._id} className="card" style={{marginBottom:8}}>{a.name} — {a.email} — {a.programId?.title || ''}</div>)}
          </div>
        </section>
      )}

      {user.role === 'user' && (
        <section style={{marginTop:12}}>
          <h3>Welcome</h3>
          <p>Book programs from the Programs page.</p>
        </section>
      )}
    </div>
  );
}
