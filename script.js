const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task));

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if(taskText !== '') {
        const task = { text: taskText, completed: false };
        tasks.push(task);
        addTaskToDOM(task);
        updateLocalStorage();
        taskInput.value = '';
    }
});

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    if(task.completed) li.classList.add('completed');

    // Toggle complete
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        task.completed = !task.completed;
        updateLocalStorage();
    });

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.classList.add('delete-btn');
    delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        taskList.removeChild(li);
        tasks = tasks.filter(t => t !== task);
        updateLocalStorage();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
