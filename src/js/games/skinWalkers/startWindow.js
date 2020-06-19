export default class SkinWalkerStartGame {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
  }

  show() {
    setTimeout(() => {
      this.mainArea.append(this.getButtons());
    }, 400);
  }

  getButtonsListTemplate() {
    const buttonsBlock = `
      <div class="tab-wrapper games__skinwalkers__start">
        <div class="skinwalker__settings__window">
          <div class="skinwalker__title">Сейчас в Вашем словаре 0 слов, добавить слова из справочника</div>
            <div class="skinwalker__buttons__block">
              <button class="skinwalker__start__random">Выбрать случайные слова</button>
              <button class="skinwalker__start__vocabulary">Взять слова из справочника</button>
              <button class="skinwalker__start__mix">Взять слова из справочника и случайные</button>
            </div>
        </div>
      </div>
    `;
    this.mainArea.innerHTML = `${buttonsBlock}`;
  }

  getButtons() {
    this.getButtonsListTemplate();
  }
}
