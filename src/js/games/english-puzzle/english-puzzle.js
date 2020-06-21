import State from '../../usersAppState';
import * as utils from '../../utils';
import '../../../css/games/english-puzzle/style.css';
import './drag-and-drop';
import dragAndDrop from './drag-and-drop';
import wordClick from './word-click-handler';

export default class EnglishPuzzle {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.state = new State();
    this.currentStage = 0;
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
      <div class="english-puzzle-main__stage">1/10</div>
      <div class="english-puzzle-main__active-hints"></div>
      <div class="english-puzzle-main__result-block"></div>
      <div class="english-puzzle-main__active-phrase"></div>
      <div class="english-puzzle-main__btn-block">
        <button class="english-puzzle-main__btn-block__check">Проверить</button>
        <button class="english-puzzle-main__btn-block__dnt-know">Не знаю :(</button>
        <button class="english-puzzle-main__btn-block__next">Продолжить</button>           
      </div>
    </div>
</div>
    `.trim();
    return mainPage.content;
  }

  showMainPage() {
    utils.destroy();
    setTimeout(async () => {
      this.mainArea.append(this.getMainPage());
      await this.renderPhrase();
      await this.renderResultBlock();
      dragAndDrop();
      wordClick();
      this.renderTranslate();
    }, 400);
  }

  async getNewWord() {
    let token = localStorage.getItem('token');
    await this.state.getUserWords();
    let wordId = await this.state.userWords[3].wordId;
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    const content = await rawResponse.json();
    const exampleFiltered = content.textExample.split(' ').map(el => el.replace(/<b>/gm, '').replace(/<\/b>/gm, ''));
    return {
      word: content.word,
      phrase: exampleFiltered,
      translate: content.textExampleTranslate,
      audioSrc: content.audioExample
    };
  }

  async renderPhrase() {
    const data = await this.getNewWord();
    const activePhrase = document.querySelector('.english-puzzle-main__active-phrase');
    for (let i = 0; i < data.phrase.length; i += 1) {
      const phraseElement = document.createElement('div');
      phraseElement.className = 'english-puzzle-main__active-phrase__wrapper';
      const word = document.createElement('div');
      word.className = 'english-puzzle-main__active-phrase__wrapper__element';
      word.innerText = data.phrase[i];
      phraseElement.append(word);
      word.setAttribute('draggable', 'true');
      activePhrase.insertAdjacentElement('beforeend', phraseElement);
    }
  }

  async renderResultBlock() {
    const data = await this.getNewWord();
    const resultBlock = document.querySelector('.english-puzzle-main__result-block');
    for (let i = 0; i < data.phrase.length; i += 1) {
      const resultElement = document.createElement('div');
      resultElement.className = 'english-puzzle-main__result-block__element';
      resultElement.setAttribute('isFree', 'true');
      resultBlock.insertAdjacentElement('beforeend', resultElement);
    }
  }

  async renderTranslate() {
    const translateHintNode = document.querySelector('.english-puzzle-main__active-hints');
    const data = await this.getNewWord();
    await this.state.getUserSettings();
    if (this.state.translateWord) {
      translateHintNode.innerHTML = data.translate;
    }
  }
}
