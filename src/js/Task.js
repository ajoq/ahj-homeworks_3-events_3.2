export default class Task {
  constructor(text) {
    this.text = text;
    this.id = 0;
    this.pinned = false;
  }

  setId(number) {
    this.id = number;
  }
}
