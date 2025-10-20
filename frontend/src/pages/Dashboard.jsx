import React, { useEffect, useState } from 'react';
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
  setCompleted
} from '../api/tasks';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import './Dashboard.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const data = await listTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError('Не удалось загрузить задачи');
    } finally {
      setLoading(false);
    }
  }

  // CREATE
  async function handleCreate(body) {
    try {
      const created = await createTask(body);
      setTasks(prev => [created, ...prev]);
      setCreating(false);
      setSuccess('Задача успешно создана!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e) {
      console.error(e);
      setError('Не удалось создать задачу');
    }
  }

  // UPDATE
  async function handleUpdate(body) {
    if (!editing) return;
    try {
      const updated = await updateTask(editing.id, body);
      setTasks(prev => prev.map(t => (t.id === editing.id ? updated : t)));
      setEditing(null);
      setSuccess('Задача успешно обновлена!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e) {
      console.error(e);
      setError('Не удалось обновить задачу');
    }
  }

  // DELETE
  async function handleDeleteConfirmed() {
    if (!confirmDel) return;
    try {
      await deleteTask(confirmDel.id);
      setTasks(prev => prev.filter(t => t.id !== confirmDel.id));
      setConfirmDel(null);
      setSuccess('Задача успешно удалена!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e) {
      console.error(e);
      setError('Не удалось удалить задачу');
    }
  }

  // TOGGLE completed
  async function handleToggle(task, value) {
    try {
      const updated = await setCompleted(task.id, value);
      setTasks(prev => prev.map(t => (t.id === task.id ? updated : t)));
      setSuccess(`Задача отмечена как ${value ? 'выполненная' : 'невыполненная'}`);
      setTimeout(() => setSuccess(''), 2000);
    } catch (e) {
      console.error(e);
      setError('Не удалось изменить статус');
    }
  }

  function handleReorder(newList) {
    setTasks(newList);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    window.location.href = '/login';
  }

  const username = localStorage.getItem('username') || 'User';

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Мои задачи</h1>
          <p className="welcome-message">Добро пожаловать, {username}! 👋</p>
        </div>
        <div className="header-actions">
          <button
            className={`btn btn-primary ${creating ? 'btn-secondary' : ''}`}
            onClick={() => setCreating(v => !v)}
          >
            <span className="btn-icon">+</span>
            {creating ? 'Отмена' : 'Новая задача'}
          </button>
          <button className="btn btn-logout" onClick={logout}>
            <span className="btn-icon">🚪</span>
            Выйти
          </button>
        </div>
      </div>

      {success && (
        <div className="success-message">
          <span className="success-icon">✓</span>
          {success}
        </div>
      )}

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠</span>
          {error}
        </div>
      )}

      {creating && (
        <div className="create-task-section">
          <div className="section-header">
            <h3>Создать новую задачу</h3>
            <div className="decorative-line"></div>
          </div>
          <TaskForm
            onSubmit={handleCreate}
            onCancel={() => setCreating(false)}
            submitText="Создать задачу"
          />
        </div>
      )}

      <div className="tasks-section">
        <div className="section-header">
          <h3>Список задач ({tasks.length})</h3>
          <div className="decorative-line"></div>
        </div>

        {loading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Загружаем ваши задачи...</p>
          </div>
        )}

        {!loading && error && (
          <div className="empty-state">
            <div className="empty-icon">😕</div>
            <p>Не удалось загрузить задачи</p>
            <button className="btn btn-primary" onClick={load}>
              Попробовать снова
            </button>
          </div>
        )}

        {!loading && !error && tasks.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h4>Пока нет задач</h4>
            <p>Создайте свою первую задачу, чтобы начать работу</p>
            <button
              className="btn btn-primary"
              onClick={() => setCreating(true)}
            >
              Создать первую задачу
            </button>
          </div>
        )}

        {!loading && !error && tasks.length > 0 && (
          <TaskList
            tasks={tasks}
            onReorder={handleReorder}
            onToggle={handleToggle}
            onEdit={setEditing}
            onDelete={setConfirmDel}
          />
        )}
      </div>

      {/* Модалка редактирования */}
      {editing && (
        <div className="modal-backdrop">
          <div className="modal-body">
            <div className="modal-header">
              <h3>Редактировать задачу</h3>
              <p className="task-id">ID: #{editing.id}</p>
            </div>
            <TaskForm
              initial={editing}
              onSubmit={handleUpdate}
              onCancel={() => setEditing(null)}
              submitText="Сохранить изменения"
            />
          </div>
        </div>
      )}

      {/* Подтверждение удаления */}
      {confirmDel && (
        <div className="modal-backdrop">
          <div className="modal-body">
            <div className="modal-header">
              <h3>Удалить задачу?</h3>
              <p className="task-id">ID: #{confirmDel.id}</p>
            </div>
            <div className="delete-confirmation">
              <p>Вы уверены, что хотите удалить эту задачу?</p>
              <div className="task-preview">
                <strong>{confirmDel.title}</strong>
                {confirmDel.description && (
                  <p className="task-description">{confirmDel.description}</p>
                )}
              </div>
              <div className="modal-actions">
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteConfirmed}
                >
                  Да, удалить
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setConfirmDel(null)}
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}