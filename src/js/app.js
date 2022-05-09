import Task from './Task';

const form = document.getElementById('tasks-form');
const input = document.getElementById('tasks-input');
export const tasksList = document.getElementById('tasks-all');
export const tasksArr = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputText = input.value.trim();

    if(inputText) {
        const newTask = new Task(inputText);
        tasksArr.push(newTask);
        buildTasksList(tasksArr, tasksList);
        input.value = '';
        emptyInputHide();
    } else {
        emptyInputDisplay();
    }
});

function emptyInputDisplay() {
    const liNoTasks = document.querySelector('.error');
    liNoTasks.classList.remove('no-display');
}

function emptyInputHide() {
    const liNoTasks = document.querySelector('.error');
    liNoTasks.classList.add('no-display');
}

input.addEventListener('input', () => {
    buildTasksList(containsText(tasksArr, input.value), tasksList);
});

export function containsText(data, search) {
    const clean = search.trim().toLowerCase();
    return data.filter(item => item.text.toLowerCase().includes(clean));
}

export function buildTasksList(tasksArr, tasksList) {
    tasksList.innerHTML = '';

    if (tasksArr.length === 0) {
        noTasksFoundDisplay();
    } else {
        noTasksFoundHide();
        tasksArr.forEach(element => {
            addTask(element);
        });
    }
};

function noTasksFoundDisplay() {
    const liNoTasks = document.querySelector('.noTasks');
    liNoTasks.classList.remove('no-display');
}

function noTasksFoundHide() {
    const liNoTasks = document.querySelector('.noTasks');
    liNoTasks.classList.add('no-display');
}

export function addTask(task) {
    const li = document.createElement('li');

    const divTask = document.createElement('div');
    divTask.className = 'task';

    const spanTask = document.createElement('span');
    spanTask.className = 'text';
    spanTask.innerText = task.text;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList = 'attach';

    divTask.append(spanTask);
    divTask.append(checkbox);
    li.append(divTask);

    tasksList.append(li);
}