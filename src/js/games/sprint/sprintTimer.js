export default class SprintTimer {
  constructor(time = 5) {
    this.time = time;
    this.intervalId = null;
    this.element = this.createElement();
    this.startTimer();
  }

  createElement() {
    const template = document.createElement('div');
    template.classList.add('.sprint__timer');
    template.innerHTML = `
      <div class="sprint__timer-wrap">
        <div class="time j-time">${this.time}</div>
        <svg>
          <circle r="18" cx="20" cy="20"></circle>
        </svg>
      </div>
    `;
    template.querySelector('circle').style.animation = `countdown ${this.time}s linear infinite forwards`;
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
