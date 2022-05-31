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
    this.form.addEventListener('submit', this.submitForm.bind(this));
    this.formInput.addEventListener('input', () => this.buildTasksAllList(this.containsText()));
    this.tasksDiv.addEventListener('click', this.taskPinned.bind(this));
  }

  submitForm(e) {
    e.preventDefault();

    const inputText = this.formInput.value.trim();

    if (inputText) {
      const newTask = new Task(inputText);
      newTask.setId(this.arrTasks.length);
      this.arrTasks.push(newTask);
      this.buildTasksAllList(this.arrTasks);
      this.formInput.value = '';
      this.formInputEmpty.classList.add('no-display');
    } else {
      this.formInputEmpty.classList.remove('no-display');
    }
  }

  buildTasksAllList(arrTasks) {
    this.tasksAllList.innerHTML = '';

    arrTasks.forEach((element) => {
      if (element.pinned === false) {
        this.addTask(element);
      }
    });
    this.tasksListEmptyCheck(this.tasksAllList, this.tasksAllListEmpty);
  }

  tasksListEmptyCheck(taskList, taskListEmpty) {
    if (taskList.children.length > 0) {
      taskListEmpty.classList.add('no-display');
    } else {
      taskListEmpty.classList.remove('no-display');
    }
  }

  addTask(task) {
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

    this.tasksAllList.append(li);
  }

  containsText() {
    const clean = this.formInput.value.trim().toLowerCase();
    return this.arrTasks.filter((item) => item.text.toLowerCase().startsWith(clean));
  }

  taskPinned(e) {
    const checkbox = e.target.closest('input.tasks-item__attach');

    if (!checkbox) return;

    const pinnedTask = checkbox.closest('li');
    const pinnedTaskId = pinnedTask.dataset.id;

    if (this.arrTasks[pinnedTaskId].pinned === false) {
      this.arrTasks[pinnedTaskId].pinned = true;
      this.tasksPinnedList.append(pinnedTask);
    } else {
      this.arrTasks[pinnedTaskId].pinned = false;
      this.tasksAllList.append(pinnedTask);
    }

    this.tasksListEmptyCheck(this.tasksAllList, this.tasksAllListEmpty);
    this.tasksListEmptyCheck(this.tasksPinnedList, this.tasksPinnedListEmpty);
  }
}
