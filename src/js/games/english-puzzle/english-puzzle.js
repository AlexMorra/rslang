import State from '../../usersAppState';
import * as utils from '../../utils';
import '../../../css/games/english-puzzle/style.css';
import './drag-and-drop';
import wordCards from '../../wordCards';
import dragAndDrop from './drag-and-drop';
import {
  wordClick, checkBtnHandler, /* continuedBtnHandler */ dntKnowBtnHandler
} from './event-handlers';

export default class EnglishPuzzle {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.state = new State();
    this.currentStage = 1;
    this.currentWord = null;
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
          <button class="english-puzzle-main__control-block__hints__translate blocked">translate</button>
          <button class="english-puzzle-main__control-block__hints__audio-repeat">repeat</button>
        </div>
      </div>
      <div class="english-puzzle-main__stage">${this.currentStage}/10</div>
      <div class="english-puzzle-main__active-hints"></div>
      <div class="english-puzzle-main__result-block"></div>
      <div class="english-puzzle-main__active-phrase"></div>
      <div class="english-puzzle-main__btn-block">
        <button class="english-puzzle-main__btn-block__check blocked">Проверить</button>
        <button class="english-puzzle-main__btn-block__dnt-know">Не знаю :(</button>
        <button class="english-puzzle-main__btn-block__continued blocked">Продолжить</button>           
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
      await this.renderTranslate();
      this.addEventHandlers();
      dragAndDrop();
      wordClick();
    }, 400);
  }

  async getNewWord() {
    try {
      let token = localStorage.getItem('token');
      await this.state.getUserWords();
      let wordId = await this.state.userWords[this.currentStage - 1].wordId;
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
    } catch (er) {
      const wordInfo = wordCards[Math.round(0 + Math.random() * (6 - 0))][Math.round(0 + Math.random() * (600 - 0))];
      const exampleFiltered = wordInfo.textExample.split(' ').map(el => el.replace(/<b>/gm, '').replace(/<\/b>/gm, ''));
      return {
        word: wordInfo.word,
        phrase: exampleFiltered,
        translate: wordInfo.textExampleTranslate,
        audioSrc: wordInfo.audioExample
      };
    }
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
      word.setAttribute('index', `${i}`);
      word.setAttribute('draggable', 'true');
      phraseElement.append(word);
      console.log(data.phrase.length);
      activePhrase.insertAdjacentElement('beforeend', phraseElement);
    }
    const words = document.querySelectorAll('.english-puzzle-main__active-phrase__wrapper');
    const wordsParentNode = document.querySelector('.english-puzzle-main__active-phrase');
    const randomSequenceWords = [...words].sort(() => Math.random() - 0.5);
    wordsParentNode.innerHTML = '';
    wordsParentNode.append(...randomSequenceWords);
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
    const translateBtn = document.querySelector('.english-puzzle-main__control-block__hints__translate');
    const translateHintNode = document.querySelector('.english-puzzle-main__active-hints');
    const data = await this.getNewWord();
    await this.state.getUserSettings();
    if (this.state.translateWord) {
      translateHintNode.innerHTML = data.translate;
      translateBtn.classList.remove('blocked');
    }
  }

  addEventHandlers() {
    const checkBtn = document.querySelector('.english-puzzle-main__btn-block__check');
    const continuedBtn = document.querySelector('.english-puzzle-main__btn-block__continued');
    const dntKnowBtn = document.querySelector('.english-puzzle-main__btn-block__dnt-know');
    checkBtn.addEventListener('click', checkBtnHandler);
    continuedBtn.addEventListener('click', this.continuedBtnHandler.bind(this));
    dntKnowBtn.addEventListener('click', dntKnowBtnHandler);
  }

  async continuedBtnHandler() {
    if (this.currentStage === 10) alert('end');
    const continuedBtn = document.querySelector('.english-puzzle-main__btn-block__continued');
    const checkBtn = document.querySelector('.english-puzzle-main__btn-block__check');
    checkBtn.classList.add('blocked');
    continuedBtn.classList.add('blocked');
    const resultBlock = document.querySelector('.english-puzzle-main__result-block');
    const activePhrase = document.querySelector('.english-puzzle-main__active-phrase');
    const stage = document.querySelector('.english-puzzle-main__stage');
    this.currentStage += 1;
    stage.innerHTML = `${this.currentStage}/10`;
    resultBlock.innerHTML = '';
    this.renderTranslate();
    activePhrase.innerHTML = '';
    await this.renderResultBlock();
    await this.renderPhrase();
    dragAndDrop();
    wordClick();
  }
}
