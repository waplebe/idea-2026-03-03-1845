import React, { useState, useEffect } from 'react';
import TaskItem from './components/TaskItem';
import './styles.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="App">
      <h1>Simple Task Manager</h1>
      <button id="addTaskBtn">Add Task</button>
      <div id="taskList">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default App;