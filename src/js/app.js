

const form = document.getElementById('tasks-form');
const input = document.getElementById('tasks-input');
const tasksAll = document.getElementById('tasks-all');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputText = input.value.trim();

    if(inputText) {
        addTask(inputText);
        input.value = '';
    } else {
        console.log('Атата');
    }
})

input.addEventListener('keydown', (e) => {
    // console.log(e.key);
    // console.log(input.value);
})

function addTask(text) {
    const li = document.createElement('li');

    const divTask = document.createElement('div');
    divTask.className = 'task';

    const spanTask = document.createElement('span');
    spanTask.className = 'text';
    spanTask.innerText = text;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList = 'attach';

    divTask.append(spanTask);
    divTask.append(checkbox);
    li.append(divTask);

    tasksAll.append(li);
}