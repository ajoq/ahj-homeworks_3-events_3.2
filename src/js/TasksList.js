/* eslint-disable class-methods-use-this */
import Task from './Task';

export default class TasksList {
  constructor() {
    this.tasksDiv = document.querySelector('.tasks');
    this.form = document.querySelector('.tasks-form');
    this.formInput = document.querySelector('.tasks-form__input');
    this.formInputEmpty = document.querySelector('.tasks-form__error');

    this.tasksPinnedBlock = document.querySelector('.tasks-pinned');
    this.tasksPinnedList = document.querySelector('.tasks-pinned__list');
    this.tasksPinnedListEmpty = document.querySelector('.tasks-pinned__empty');

    this.tasksAllBlock = document.querySelector('.tasks-all');
    this.tasksAllList = document.querySelector('.tasks-all__list');
    this.tasksAllListEmpty = document.querySelector('.tasks-all__empty');

    this.arrTasks = [];

    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.submitForm(e, this.arrTasks, this.tasksAllList, this.formInput, this.formInputEmpty));
    this.formInput.addEventListener('input', () => this.buildTasksAllList(this.containsText(this.arrTasks, this.formInput.value), this.tasksAllList));
    this.tasksDiv.addEventListener('click', (e) => this.taskPinned(e, this.arrTasks, this.tasksPinnedList, this.tasksAllList));
  }

  submitForm(e, arrTasks, tasksAllList, formInput, formInputEmpty) {
    e.preventDefault();

    const inputText = formInput.value.trim();

    if (inputText) {
      const newTask = new Task(inputText);
      newTask.setId(arrTasks.length);
      arrTasks.push(newTask);
      this.buildTasksAllList(arrTasks, tasksAllList);
      this.formInput.value = '';
      formInputEmpty.classList.add('no-display');
    } else {
      formInputEmpty.classList.remove('no-display');
    }
  }

  buildTasksAllList(arrTasks, tasksAllList) {
    this.tasksAllList.innerHTML = '';

    arrTasks.forEach((element) => {
      if (element.pinned === false) {
        this.addTask(element, tasksAllList);
      }
    });
    this.tasksListEmptyCheck(tasksAllList, this.tasksAllListEmpty);
  }

  tasksListEmptyCheck(taskList, taskListEmpty) {
    if (taskList.children.length > 0) {
      taskListEmpty.classList.add('no-display');
    } else {
      taskListEmpty.classList.remove('no-display');
    }
  }

  addTask(task, tasksAllList) {
    const li = document.createElement('li');
    li.className = 'tasks-item';
    li.dataset.id = task.id;

    const spanTask = document.createElement('span');
    spanTask.classList.add('tasks-item__text');
    spanTask.innerText = task.text;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList = 'tasks-item__attach';

    li.append(spanTask);
    li.append(checkbox);

    tasksAllList.append(li);
  }

  containsText(arrTasks, tasksAllList) {
    const clean = tasksAllList.trim().toLowerCase();
    return arrTasks.filter((item) => item.text.toLowerCase().includes(clean));
  }

  taskPinned(e, arrTasks, tasksPinnedList, tasksAllList) {
    const checkbox = e.target.closest('input.tasks-item__attach');

    if (!checkbox) return;

    const pinnedTask = checkbox.closest('li');
    const pinnedTaskId = pinnedTask.dataset.id;

    if (arrTasks[pinnedTaskId].pinned === false) {
      this.arrTasks[pinnedTaskId].pinned = true;
      tasksPinnedList.append(pinnedTask);
    } else {
      this.arrTasks[pinnedTaskId].pinned = false;
      tasksAllList.append(pinnedTask);
    }

    this.tasksListEmptyCheck(tasksAllList, this.tasksAllListEmpty);
    this.tasksListEmptyCheck(tasksPinnedList, this.tasksPinnedListEmpty);
  }
}
