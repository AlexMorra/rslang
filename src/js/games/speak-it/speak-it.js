import * as utils from '../../utils';
import SpeakItHintsBlock from './speak-it.hints-block.class';
import SpeakItMainBlock from './speak-it.main-block.class';

export default class SpeakIt {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.hintsBlock = new SpeakItHintsBlock();
    this.mainBlock = new SpeakItMainBlock();
  }

  showStartPage() {
    utils.destroy();
    setTimeout(async () => {
      this.mainArea.append(this.getStartPage());
    }, 400);
  }

  getMainPage() {
    utils.destroy();
    setTimeout(async () => {
      this.mainArea.append(this.getMainPageWrapper());
      this.hintsBlock.getHintsBlock();
      this.mainBlock.getMainBlock();
    }, 400);
  }

  getMainPageWrapper() {
    const mainPage = document.createElement('template');
    mainPage.innerHTML = `
    <div class="tab-wrapper speak-it">
      <div class="speak-it__main"></div>
    </div>
    `.trim();
    return mainPage.content;
  }

  getStartPage() {
    const startPage = document.createElement('template');
    startPage.innerHTML = `
      <div class="tab-wrapper speak-it">
        <div class="speak-it__start-page">
          <div class="speak-it__start-page__title">Говори правильно
          </div>
          <p class="speak-it__start-page__description">Нажмите на слово, чтобы услышать его произношение.
          Нажмите на кнопку и произнесите слова в микрофон.</p>
          <button class="speak-it__start-page__start-btn">Начать</button>
        </div>
      </div>
    `.trim();
    startPage.content.querySelector('.speak-it__start-page__start-btn').addEventListener('click', this.getMainPage.bind(this));
    return startPage.content;
  }
}
