document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Fetch tasks from the API
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.innerHTML = `
                    <span>${task.title}</span>
                    <span class="${task.completed ? 'completed' : ''}">${task.description}</span>
                    <button class="completeBtn">${task.completed ? 'Undo' : 'Complete'}</button>
                `;
                taskList.appendChild(taskItem);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));

    // Add task functionality
    addTaskBtn.addEventListener('click', async function() {
        const title = prompt('Enter task title:');
        const description = prompt('Enter task description:');

        if (title && description) {
            const newTask = { title: title, description: description };

            try {
                const response = await fetch('/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTask)
                });

                if (response.ok) {
                    const newTasks = await response.json();
                    taskList.innerHTML = '';
                    newTasks.forEach(task => {
                        const taskItem = document.createElement('div');
                        taskItem.innerHTML = `
                            <span>${task.title}</span>
                            <span class="${task.completed ? 'completed' : ''}">${task.description}</span>
                            <button class="completeBtn">${task.completed ? 'Undo' : 'Complete'}</button>
                        `;
                        taskList.appendChild(taskItem);
                    });
                } else {
                    console.error('Error creating task:', response.status);
                    alert('Failed to create task.');
                }
            } catch (error) {
                console.error('Error creating task:', error);
                alert('An error occurred while creating the task.');
            }
        }
    });
});