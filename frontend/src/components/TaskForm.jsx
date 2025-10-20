import React, { useEffect, useState } from 'react';

const priorities = ['LOW','MEDIUM','HIGH'];

export default function TaskForm({ initial, onSubmit, onCancel, submitText = 'Save' }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [priorityLevel, setPriorityLevel] = useState(initial?.priorityLevel || 'MEDIUM');

  useEffect(() => {
    setTitle(initial?.title || '');
    setDescription(initial?.description || '');
    setPriorityLevel(initial?.priorityLevel || 'MEDIUM');
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, priorityLevel });
  };

  return (
    <form onSubmit={handleSubmit} style={{display:'grid', gap:10}}>
      <div>
        <label>Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} required style={{width:'100%'}}/>
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={3} style={{width:'100%'}}/>
      </div>
      <div>
        <label>Priority</label>
        <select value={priorityLevel} onChange={e=>setPriorityLevel(e.target.value)}>
          {priorities.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div style={{display:'flex', gap:8}}>
        <button type="submit">{submitText}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
