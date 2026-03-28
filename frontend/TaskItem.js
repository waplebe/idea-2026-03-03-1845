import React, { useState, useEffect } from 'react';

function TaskItem({ task }) {
  const isCompleted = task.completed;
  const className = isCompleted ? 'completed' : '';

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(task.title);
  const [updateDescription, setUpdateDescription] = useState(task.description);

  useEffect(() => {
    if (isUpdating) {
      const fetchUpdatedTask = async () => {
        try {
          const response = await fetch(`/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: updateTitle,
              description: updateDescription,
              completed: task.completed,
            }),
          });

          if (response.ok) {
            const updatedTask = await response.json();
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
          } else {
            console.error('Error updating task:', response.status);
          }
        } catch (error) {
          console.error('Error updating task:', error);
        }
      };

      fetchUpdatedTask();
    }
  }, [isUpdating, updateTitle, updateDescription, task.id]);

  const handleCompleteClick = () => {
    setIsUpdating(true);
    setUpdateTitle(task.title);
    setUpdateDescription(task.description);
  };

  return (
    <div className={className}>
      <span>{updateTitle}</span>
      <span style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>{updateDescription}</span>
      <button className="completeBtn" onClick={handleCompleteClick}>
        {isCompleted ? 'Undo' : 'Complete'}
      </button>
    </div>
  );
}

export default TaskItem;