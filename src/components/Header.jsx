import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(){
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const logout = ()=>{ localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href='/' }

  return (
    <header className="header">
      <div className="container inner">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:44,height:44,background:'#fff',borderRadius:44,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <strong style={{color:'#0f766e'}}>R</strong>
          </div>
          <div>
            <div style={{fontWeight:700}}>Family Rehab Center</div>
            <div style={{fontSize:12,opacity:0.9}}>Recovery • Compassion • Renewal</div>
          </div>
        </div>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/contact">Contact</Link>
          {token ? (
            <>
              <Link to="/dashboard" style={{marginLeft:12}}>{user?.role || 'Dashboard'}</Link>
              <button onClick={logout} style={{marginLeft:12}} className="btn">Logout</button>
            </>
          ) : (
            <Link to="/login" style={{marginLeft:12}} className="btn">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
