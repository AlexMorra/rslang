export default class SavannaIntro {
  constructor() {
    this.element = null;
  }

  getElement() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="intro">
        <h1 class="intro__title">Саванна</h1>
        <p class="intro__description">Тренировка Саванна развивает словарный запас.</br>
          Чем больше слов ты знаешь, тем больше очков опыта получишь.</p>
        <button class="into__button button">Начать</button>
      </div>`.trim();

    this.element = template.content.children[0];
    return this.element;
  }
}
