import React from 'react';

function TaskItem({ task }) {
  const isCompleted = task.completed;
  const className = isCompleted ? 'completed' : '';

  return (
    <div className={className}>
      <span>{task.title}</span>
      <span style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>{task.description}</span>
      <button className="completeBtn" onClick={() => {
        const updatedTask = { ...task, completed: !isCompleted };
        fetch(`/tasks/${task.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedTask)
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.error('Error updating task:', response.status);
            return null;
          }
        })
        .then(updatedTask => {
          // Update the task list after successful update
          taskList.innerHTML = '';
          updatedTask.forEach(updatedTask => {
            const taskItem = document.createElement('div');
            taskItem.innerHTML = `
              <span>${updatedTask.title}</span>
              <span style={{ textDecoration: updatedTask.completed ? 'line-through' : 'none' }}>${updatedTask.description}</span>
              <button className="completeBtn">${updatedTask.completed ? 'Undo' : 'Complete'}</button>
            `;
            taskList.appendChild(taskItem);
          });
        });
      }}>
        {isCompleted ? 'Undo' : 'Complete'}
      </button>
    </div>
  );
}

export default TaskItem;