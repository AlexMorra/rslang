import * as utils from '../../utils';
import EnglishPuzzleHintsBlock from './english-puzzle-hints-block.class';
import EnglishPuzzleMainBlock from './english-puzzle-main-block.class';
import EnglishPuzzleButtonsBlock from './english-puzzle-buttons-block.class';

export default class EnglishPuzzle {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.hintsBlock = new EnglishPuzzleHintsBlock();
    this.mainBlock = new EnglishPuzzleMainBlock();
    this.buttonsBlock = new EnglishPuzzleButtonsBlock();
  }

  getMainPageWrapper() {
    const mainPage = document.createElement('template');
    mainPage.innerHTML = `
    <div class="tab-wrapper english-puzzle">
      <div class="english-puzzle-main"></div>
    </div>
    `.trim();
    return mainPage.content;
  }

  async getMainPage() {
    this.mainArea.append(this.getMainPageWrapper());
    const wrapper = document.querySelector('.english-puzzle-main');
    wrapper.style.opacity = '0';
    this.hintsBlock.getHintsBlock();
    this.buttonsBlock.getButtonsBlock();
    await this.mainBlock.getMainBlock();
    wrapper.style.opacity = '1';
  }

  showMainPage() {
    utils.destroy();
    setTimeout(async () => {
      this.getMainPage();
    }, 400);
  }

  showStartPage() {
    utils.destroy();
    setTimeout(() => {
      this.mainArea.append(this.getStartPage());
      this.getEventHandlerStartBtn();
    }, 400);
  }

  getStartPage() {
    const startPage = document.createElement('template');
    startPage.innerHTML = `
      <div class="tab-wrapper english-puzzle">
        <div class="english-puzzle__start-page">
          <div class="english-puzzle__start-page__title">Конструктор фраз
          </div>
          <p class="english-puzzle__start-page__description">Нажимайте на слова, собирайте фразы. Слова можно перетаскивать.</p>
          <button class="english-puzzle__start-page__start-btn">Start</button>
        </div>
      </div>
    `.trim();
    return startPage.content;
  }

  getEventHandlerStartBtn() {
    document.querySelector('.english-puzzle__start-page__start-btn').addEventListener('click', this.showMainPage.bind(this));
  }
}
