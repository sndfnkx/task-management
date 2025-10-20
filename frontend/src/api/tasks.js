import api from './axios';

export const listTasks  = () => api.get('/tasks').then(r => r.data);
export const createTask = (body) => api.post('/tasks', body).then(r => r.data);
export const updateTask = (id, body) => api.put(`/tasks/${id}`, body).then(r => r.data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`).then(r => r.data);

// опционально: автоназначение
export const assignTask = (body) => api.post('/tasks/assign', body).then(r => r.data);
export const setCompleted = (id, completed) =>
  api.patch(`/tasks/${id}/completed`, { completed }).then(r => r.data);
