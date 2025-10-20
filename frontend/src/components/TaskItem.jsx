import React from 'react';

export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div style={{
      padding:12, border:'1px solid #ddd', borderRadius:8,
      display:'flex', justifyContent:'space-between', alignItems:'center'
    }}>
      <div>
        <div><b>#{task.id}</b> {task.title}</div>
        <div style={{fontSize:12, opacity:.8}}>
          {task.priorityLevel} {task.assigneeId ? ` • assigneeId: ${task.assigneeId}` : ''}
        </div>
        {task.description && <div style={{marginTop:6, fontSize:14}}>{task.description}</div>}
      </div>
      <div style={{display:'flex', gap:8}}>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task)} style={{color:'#b00020'}}>Delete</button>
      </div>
    </div>
  );
}
