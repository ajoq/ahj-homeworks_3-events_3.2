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
    } else {
        console.log('Атата');
    }
});

input.addEventListener('input', () => {
    buildTasksList(containsText(tasksArr, input.value), tasksList);
});

export function containsText(data, search) {
    const clean = search.trim().toLowerCase();
    return data.filter(item => item.text.toLowerCase().includes(clean));
}

export function buildTasksList(tasksArr, tasksList) {
    tasksList.innerHTML = '';

    tasksArr.forEach(element => {
        addTask(element);
    });
};

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