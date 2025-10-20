import React from 'react';
import TaskCard from './TaskCard';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function TaskList({
  tasks = [],
  onReorder,
  onToggle,
  onEdit,
  onDelete
}) {
  const list = Array.isArray(tasks) ? tasks : [];

  function handleDragEnd(result) {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.index === source.index) return;

    const items = Array.from(list);
    const [moved] = items.splice(source.index, 1);
    items.splice(destination.index, 0, moved);
    onReorder && onReorder(items); // отдаём новый порядок наверх
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="task-list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ display: 'grid', gap: 10 }}
          >
            {list.map((t, idx) => (
              <Draggable key={String(t.id)} draggableId={String(t.id)} index={idx}>
                {(p, snapshot) => (
                  <div
                    ref={p.innerRef}
                    {...p.draggableProps}
                    {...p.dragHandleProps}
                    style={{
                      ...p.draggableProps.style,
                      boxShadow: snapshot.isDragging ? '0 8px 16px rgba(0,0,0,0.15)' : 'none',
                      borderRadius: 10
                    }}
                  >
                    <TaskCard
                      task={t}
                      onToggle={onToggle}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {list.length === 0 && <div>Список пуст</div>}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
