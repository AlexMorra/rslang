import * as utils from '../../utils';
import EnglishPuzzleHintsBlock from './english-puzzle-hints-block.class';
import EnglishPuzzleMainBlock from './english-puzzle-main-block.class';
import EnglishPuzzleButtonsBlock from './english-puzzle-buttons-block.class';

export default class EnglishPuzzle1 {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.hintsBlock = new EnglishPuzzleHintsBlock();
    this.mainBlock = new EnglishPuzzleMainBlock();
    this.buttonsBlock = new EnglishPuzzleButtonsBlock();
  }

  getMainPage() {
    const mainPage = document.createElement('template');
    mainPage.innerHTML = `
    <div class="tab-wrapper english-puzzle">
      <div class="english-puzzle-main"></div>
    </div>
    `.trim();
    return mainPage.content;
  }

  showMainPage() {
    utils.destroy();
    setTimeout(async () => {
      this.mainArea.append(this.getMainPage());
      this.hintsBlock.getHintsBlock();
      this.mainBlock.getMainBlock();
      this.buttonsBlock.getButtonsBlock();
    }, 400);
  }
}
