import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header(){
  const [auth, setAuth] = useState({ token: null, user: null });
  const navigate = useNavigate();

  useEffect(() => {
    const readAuth = () => ({
      token: localStorage.getItem('token'),
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    });

    setAuth(readAuth());

    // update when other tabs/windows change auth
    const onStorage = (e) => {
      if (e.key === 'token' || e.key === 'user') setAuth(readAuth());
    };
    const onAuthChange = () => setAuth(readAuth());
    window.addEventListener('storage', onStorage);
    window.addEventListener('authChange', onAuthChange);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('authChange', onAuthChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ token: null, user: null });
    // notify UI in same tab
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  const { token, user } = auth;

  const roleToDashboardPath = (role) => {
    if (!role) return '/visitor-dashboard';
    const r = String(role).toLowerCase();
    switch (r) {
      case 'admin':
        return '/admin-dashboard';
      case 'doctor':
      case 'therapist':
        return '/doctor-dashboard';
      case 'staff':
        return '/staff-dashboard';
      case 'patient':
        return '/patient-dashboard';
      case 'visitor':
        return '/visitor-dashboard';
      case 'user':
        return '/user-dashboard';
      default:
        return '/visitor-dashboard';
    }
  };

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
              <Link to={roleToDashboardPath(user?.role)} style={{marginLeft:12}}>{user?.role || 'Dashboard'}</Link>
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
