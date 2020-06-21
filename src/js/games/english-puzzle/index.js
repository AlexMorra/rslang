import State from '../../usersAppState';
import * as utils from '../../utils';
import '../../../css/games/english-puzzle/style.css';

export default class EnglishPuzzle {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.state = new State();
  }

  /* showStartPage() {
    utils.destroy();
    setTimeout(() => {
      this.mainArea.append(this.getStartPage());
      this.getStartBtn();
    }, 400);
  }

  getStartPage() {
    const startPage = document.createElement('template');
    startPage.innerHTML = `
      <div class="tab-wrapper english-puzzle">
        <div class="english-puzzle-start__title">English Puzzle
        </div>
        <p class="english-puzzle-start__description">Click on words, collect phrases</p>
        <p class="english-puzzle-start__description">Words can be drag and drop. Select tooltips in the menu</p>
        <button class="english-puzzle-start__start-btn">Start</button>
      </div>
    `.trim();
    return startPage.content;
  }

  getStartBtn() {
    document.querySelector('.english-puzzle-start__start-btn').addEventListener('click', this.showMainPage.bind(this));
  } */

  getMainPage() {
    const mainPage = document.createElement('template');
    mainPage.innerHTML = `
    <div class="tab-wrapper english-puzzle">
    <div class="english-puzzle-main">
      <div class="english-puzzle-main__control-block">
        <div class="english-puzzle-main__control-block__choice-other-word">
          <p class="english-puzzle-main__control-block__choice-other-word__title">Level</p>
          <select class="english-puzzle-main__control-block__choice-other-word__select">
            <option>1</option>
          </select>
          <p class="english-puzzle-main__control-block__choice-other-word__title">Page</p>
          <select class="english-puzzle-main__control-block__choice-other-word__select">
            <option>1</option>
          </select>
        </div>
        <div class="english-puzzle-main__control-block__hints">
          <button class="english-puzzle-main__control-block__hints__translate">translate</button>
          <button class="english-puzzle-main__control-block__hints__audio-repeat">repeat</button>
        </div>
      </div>
      <div class="english-puzzle-main__active-hints">translate</div>
      <div class="english-puzzle-main__result-block">result</div>
      <div class="english-puzzle-main__active-phrase">active phrase</div>
      <div class="english-puzzle-main__btn-block">
        <button class="english-puzzle-main__btn-block__check">check</button>
        <button class="english-puzzle-main__btn-block__dnt-know">i don't know</button>          
      </div>
    </div>
</div>
    `.trim();
    return mainPage.content;
  }

  showMainPage() {
    utils.destroy();
    setTimeout(() => {
      this.mainArea.append(this.getMainPage());
      this.renderPhrase();
    }, 400);
  }

  async getNewWord() {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('user_id');
    await this.state.getUserWords();
    let wordId = await this.state.userWords[0].wordId;
    console.log(wordId);
    console.log(userId);
    console.log(token);
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    const content = await rawResponse.json();

    return [content.word, content.Example, content.ExampleTranslte, content.audioExample];
  }

  /* async renderPhrase() {
    this;
  } */
}
