import React, {useEffect, useState} from 'react';
import axios from 'axios';
export default function ShareBoard(){
  const [tasks,setTasks] = useState([]);
  useEffect(()=>{
    const url = new URL(window.location.href);
    const t = url.searchParams.get('token');
    axios.get('http://localhost:8080/api/tasks', {
      headers: t ? { Authorization: `Bearer ${t}` } : {}
    }).then(r=>setTasks(r.data));
  },[]);
  return <div style={{padding:24}}><h2>Shared Board</h2>{tasks.map(t=> <div key={t.id}>{t.title}</div>)}</div>;
}