import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

export default function Programs(){
  const [programs,setPrograms] = useState([]);
  useEffect(()=>{ API.get('/programs').then(r=>setPrograms(r.data)).catch(()=>{}); }, []);
  return (
    <div className="container" style={{paddingTop:20}}>
      <h2>All Programs</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:12,marginTop:12}}>
        {programs.map(p => (
          <div key={p._id} className="card">
            <h3>{p.title}</h3>
            <p style={{color:'#666'}}>{p.summary}</p>
            <div style={{marginTop:8,display:'flex',justifyContent:'space-between'}}>
              <div style={{fontSize:13}}>{p.durationWeeks? `${p.durationWeeks} weeks`:'Flexible'}</div>
              <Link to={`/programs/${p.slug}`} className="btn">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
