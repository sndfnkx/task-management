import React from 'react';
import './TaskCard.css';

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const t = task || {};
  const completed = !!t.completed;

  const getPriorityClass = (priority) => {
    const prio = (priority || 'LOW').toLowerCase();
    return `priority-${prio}`;
  };

  const getPriorityLabel = (priority) => {
    const prio = priority || 'LOW';
    const labels = {
      'LOW': 'Низкий',
      'MEDIUM': 'Средний',
      'HIGH': 'Высокий'
    };
    return labels[prio] || prio;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={`task-card ${completed ? 'completed' : ''}`}>
      <div className="task-card-header">
        <div className="task-main-info">
          <div className="task-title-section">
            {completed && (
              <div className="completed-badge">
                <span className="check-icon">✓</span>
                Выполнено
              </div>
            )}
            <h3 className="task-title">{t.title || 'Без названия'}</h3>
          </div>
          <div className="task-meta">
            <span className={`priority-badge ${getPriorityClass(t.priorityLevel)}`}>
              {getPriorityLabel(t.priorityLevel)}
            </span>
            {t.dueDate && (
              <span className="due-date">
                📅 {formatDate(t.dueDate)}
              </span>
            )}
          </div>
        </div>
        <div className="task-actions">
          <button 
            className="btn-icon edit-btn"
            onClick={() => onEdit && onEdit(t)}
            title="Редактировать"
          >
            ✏️
          </button>
          <button 
            className="btn-icon delete-btn"
            onClick={() => onDelete && onDelete(t)}
            title="Удалить"
          >
            🗑️
          </button>
        </div>
      </div>

      {t.description && (
        <div className="task-description">
          {t.description}
        </div>
      )}

      <div className="task-card-footer">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => onToggle && onToggle(t, e.target.checked)}
            className="checkbox-input"
          />
          <span className="custom-checkbox">
            {completed && <span className="checkmark">✓</span>}
          </span>
          <span className="checkbox-text">
            {completed ? 'Завершена' : 'Отметить как выполненную'}
          </span>
        </label>
        
        <div className="task-id">
          ID: #{t.id}
        </div>
      </div>

      {t.createdAt && (
        <div className="task-created">
          Создано: {formatDate(t.createdAt)}
        </div>
      )}
    </div>
  );
}