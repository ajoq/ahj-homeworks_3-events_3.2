import {tasksArr} from './app';

export default class Task {
    constructor(text) {
        this.text = text;
        this.id = tasksArr.length;
        this.pinned = false;
    }
}