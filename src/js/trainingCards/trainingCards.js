export default class TrainingCards {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
  }

  show() {
    setTimeout(() => {
      this.mainArea.append(this.getTemplate());
    }, 400);
  }

  getTemplate() {
    let template = document.createElement('template');
    template.innerHTML = `
      <div class="tab-wrapper training">
        111111
      </div>
    `;
    return template.content;
  }
}
