// src/api/tasks.js
import api from './axios'; // <-- дефолтный импорт из соседнего файла

export async function listTasks() {
  const { data } = await api.get('/tasks');
  return data;
}
export async function createTask(body) {
  const { data } = await api.post('/tasks', body);
  return data;
}
export async function updateTask(id, body) {
  const { data } = await api.put(`/tasks/${id}`, body);
  return data;
}
export async function deleteTask(id) {
  await api.delete(`/tasks/${id}`);
}
export async function setCompleted(id, completed) {
  const { data } = await api.patch(`/tasks/${id}/completed`, { completed });
  return data;
}
