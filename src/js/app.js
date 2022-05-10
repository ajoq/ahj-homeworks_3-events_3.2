import Task from './Task';

const form = document.getElementById('tasks-form');
const input = document.getElementById('tasks-input');

const tasksPinnedDiv = document.getElementById('pinned-tasks');
const tasksListDiv = document.getElementById('all-tasks');

const tasksPinnedList = document.getElementById('tasks-pinned');
const tasksList = document.getElementById('tasks-list');
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

    console.log(tasksArr);
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
            if (element.pinned === false) {
                addTask(element);
            }            
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
    li.dataset.id = task.id;

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

tasksListDiv.addEventListener('click', (e) => taskPinnedIn(e));
tasksPinnedDiv.addEventListener('click', (e) => taskPinnedOut(e));

function taskPinnedIn(e) {
    const checkbox = e.target.closest('input.attach');

    if (!checkbox) return;

    const pinnedTask = checkbox.closest('li');

    tasksArr.find(item => {
        if (item.id === +pinnedTask.dataset.id) {
            item.pinned = true;
        }
    });

    buildPinnedTasksList(pinnedTask, tasksPinnedList);

   if (tasksPinnedList.children.length > 0) {
       noPinnedTasksHide();
   }

};

function buildPinnedTasksList(pinnedTask, tasksPinnedList) {
    tasksPinnedList.append(pinnedTask);
}

function taskPinnedOut(e) {
    const checkbox = e.target.closest('input.attach');

    if (!checkbox) return;

    const pinnedTask = checkbox.closest('li');

    tasksArr.find(item => {
        if (item.id === +pinnedTask.dataset.id) {
            item.pinned = false;
        }
    });

    tasksList.append(pinnedTask);

    buildTasksList(tasksArr, tasksList);

    if (tasksPinnedList.children.length === 0) {
        noPinnedTasksDisplay();
       }
}

function noPinnedTasksDisplay() {
    const liNoPinnedTasks = document.querySelector('.tasks__no-pinned');
    liNoPinnedTasks.classList.remove('no-display');
}

function noPinnedTasksHide() {
    const liNoPinnedTasks = document.querySelector('.tasks__no-pinned');
    liNoPinnedTasks.classList.add('no-display');
}