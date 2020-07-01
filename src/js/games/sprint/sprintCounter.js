export default class SprintCounter {
  constructor() {
    this.startValue = 0;
    this.element = this.getCounter();
    this.counter = this.element.querySelector('.j-counter');
  }

  getCounter() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="sprint__counter j-counter">${this.startValue}</div>
    `;
    return template.content;
  }

  setCounter(points) {
    this.counter.innerHTML = points;
  }

  getElement() {
    return this.element;
  }
}
