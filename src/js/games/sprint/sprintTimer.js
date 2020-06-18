export default class SprintTimer {
  constructor(time = 5, title = '') {
    this.time = time;
    this.title = title;
    this.intervalId = null;
    this.element = this.createElement();
    this.startTimer();
  }

  createElement() {
    const template = document.createElement('div');
    template.classList.add('.sprint__timer');
    template.innerHTML = `
      <h3>${this.title}</h3>
      <div class="j-time">${this.time}</div>
    `;
    return template;
  }

  getElement() {
    return this.element;
  }

  startTimer() {
    const timerField = this.element.querySelector('.j-time');
    this.intervalId = setInterval(() => {
      if (this.time > 1) {
        this.time--;
        timerField.innerHTML = this.time;
      } else {
        this.destroy();
      }
    }, 1000);
  }

  destroy() {
    this.element.dispatchEvent(new CustomEvent('timer-end'));
    clearInterval(this.intervalId);
  }
}
