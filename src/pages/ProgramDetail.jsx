import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';

export default function ProgramDetail(){
  const { slug } = useParams();
  const [program,setProgram] = useState(null);
  useEffect(()=>{ if(!slug) return; API.get(`/programs/${slug}`).then(r=>setProgram(r.data)).catch(()=>{}); }, [slug]);
  if(!program) return <div className="container" style={{paddingTop:20}}>Loading...</div>;
  return (
    <div className="container" style={{paddingTop:20}}>
      <h2>{program.title}</h2>
      <p style={{color:'#666'}}>{program.summary}</p>
      <p style={{marginTop:12}}>{program.description}</p>
      <div style={{marginTop:16}}>
        <a href="/contact" className="btn">Book Appointment</a>
      </div>
    </div>
  );
}
