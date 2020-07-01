import * as utils from '../../utils';
import SpeakItHintsBlock from './speak-it.hints-block.class';
import SpeakItMainBlock from './speak-it.main-block.class'

export default class SpeakIt {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.hintsBlock = new SpeakItHintsBlock();
    this.mainBlock = new SpeakItMainBlock();
  }
  showMainPage() {
    utils.destroy();
    setTimeout(async () => {
      this.getMainPage();
    }, 400);
  }

  getMainPage() {
    this.mainArea.append(this.getMainPageWrapper())
    this.hintsBlock.getHintsBlock();
    this.mainBlock.getMainBlock();
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
}