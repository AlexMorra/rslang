import wordCards from '../../wordCards';
import * as utils from '../../utils';
import { usersAppState } from '../../../app';
import { dragAndDrop, wordClick } from './drag-and-drop-and-click-word';
import EnglishPuzzleHintsBlock from './english-puzzle-hints-block.class';
import EnglishPuzzleButtonsBlock from './english-puzzle-buttons-block.class';
import EnglishPuzzle from './english-puzzle';
export default class EnglishPuzzleMainBlock {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.currentStage = 1;
    this.arrayWords = [];
    this.usersAppState = usersAppState;
    this.hintsBlock = new EnglishPuzzleHintsBlock();
    this.buttonsBlock = new EnglishPuzzleButtonsBlock();
    this.statistic = [];
  }

  async getMainBlock() {
    const targetNode = document.querySelector('.english-puzzle-main__control-block');
    const mainBlock = document.createElement('template');
    mainBlock.innerHTML = `
      <div class="english-puzzle-main__stage">${this.currentStage}/10</div>
      <div class="english-puzzle-main__active-hints"></div>
      <div class="english-puzzle-main__result-block"></div>
      <div class="english-puzzle-main__active-phrase"></div>
    `.trim();
    targetNode.after(mainBlock.content);
    this.getArrayWords();
    this.hintsBlock.getAudioHint(this.arrayWords[this.currentStage - 1].audioExample);
    await this.getTranslateBlock();
    this.getPhraseBlock();
    this.getResultBlock();
    dragAndDrop();
    wordClick();
    this.addEventHandlers();
  }

  getArrayWords() {
    this.arrayWords = this.usersAppState.getTrainingWords();
    this.arrayWords.forEach(el => {
      el.textExample = el.textExample.replace(/<b>/gm, '').replace(/<\/b>/gm, '');
      el.textExampleArray = el.textExample.split(' ');
    });
    console.log(this.arrayWords);
    this.statistic = this.arrayWords.map(el => {
      return {
        id: el.id,
        word: el.word,
        checkClick: 0,
        dntKnowClick: 0,
        translate: el.wordTranslate,
        isLearned: false,
        audioSrc: el.audio,
        transcription: el.transcription
      };
    });
    console.log(this.statistic);
  }

  getPhraseBlock() {
    const activePhrase = document.querySelector('.english-puzzle-main__active-phrase');
    for (let i = 0; i < this.arrayWords[this.currentStage - 1].textExampleArray.length; i += 1) {
      const phraseElement = document.createElement('template');
      phraseElement.innerHTML = `
      <div class="english-puzzle-main__active-phrase__wrapper">
        <div class="english-puzzle-main__active-phrase__wrapper__element" index="${i}" draggable="true">
        ${this.arrayWords[this.currentStage - 1].textExampleArray[i]}</div>
      </div>
      `;
      activePhrase.append(phraseElement.content);
    }
    const words = document.querySelectorAll('.english-puzzle-main__active-phrase__wrapper');
    const randomSequenceWords = [...words].sort(() => Math.random() - 0.5);
    activePhrase.innerHTML = '';
    activePhrase.append(...randomSequenceWords);
  }

  getResultBlock() {
    const resultBlock = document.querySelector('.english-puzzle-main__result-block');
    for (let i = 0; i < this.arrayWords[this.currentStage - 1].textExampleArray.length; i += 1) {
      const resultElement = document.createElement('template');
      resultElement.innerHTML = `
      <div class="english-puzzle-main__result-block__element" isFree="true">
      </div>
      `;
      resultBlock.append(resultElement.content);
    }
  }

  async getTranslateBlock() {
    const translateBtn = document.querySelector('.english-puzzle-main__control-block__hints__translate');
    const translateHintNode = document.querySelector('.english-puzzle-main__active-hints');
    await this.usersAppState.getUserSettings();
    if (this.usersAppState.translateWord) {
      translateHintNode.innerHTML = this.arrayWords[this.currentStage - 1].textExampleTranslate;
      translateBtn.classList.remove('blocked');
    }
  }

  addEventHandlers() {
    const checkBtn = document.querySelector('.english-puzzle-main__btn-block__check');
    const continuedBtn = document.querySelector('.english-puzzle-main__btn-block__continued');
    const dntKnowBtn = document.querySelector('.english-puzzle-main__btn-block__dnt-know');
    const audioBtn = document.querySelector('.english-puzzle-main__control-block__hints__audio-repeat');
    audioBtn.addEventListener('click', () => {
      this.hintsBlock.getAudioHint(this.arrayWords[this.currentStage - 1].audioExample);
    });
    checkBtn.addEventListener('click', () => {
      this.buttonsBlock.checkBtnHandler();
      this.statistic[this.currentStage - 1].checkClick += 1;
    });
    continuedBtn.addEventListener('click', this.nextStage.bind(this));
    dntKnowBtn.addEventListener('click', () => {
      this.buttonsBlock.dntKnowBtnHandler();
      this.statistic[this.currentStage - 1].dntKnowClick += 1;
    });
  }

  nextStage() {
    if (this.currentStage !== 10) {
      const dntKnowBtn = document.querySelector('.english-puzzle-main__btn-block__dnt-know');
      const continuedBtn = document.querySelector('.english-puzzle-main__btn-block__continued');
      const checkBtn = document.querySelector('.english-puzzle-main__btn-block__check');
      const resultBlock = document.querySelector('.english-puzzle-main__result-block');
      const activePhrase = document.querySelector('.english-puzzle-main__active-phrase');
      const stage = document.querySelector('.english-puzzle-main__stage');
      dntKnowBtn.classList.remove('blocked');
      checkBtn.classList.add('blocked');
      continuedBtn.classList.add('blocked');
      this.currentStage += 1;
      stage.innerHTML = `${this.currentStage}/10`;
      this.getTranslateBlock();
      this.hintsBlock.getAudioHint(this.arrayWords[this.currentStage - 1].audioExample);
      activePhrase.innerHTML = '';
      resultBlock.innerHTML = '';
      this.getPhraseBlock();
      this.getResultBlock();
      dragAndDrop();
      wordClick();
    } else {
      this.handingStatistic();
      this.getStatistic(this.statistic);
    }
  }

  getStatistic(statisticArray) {
    utils.destroy();
    setTimeout(() =>{
      this.createStatistic(statisticArray);
      this.addEventHandlerInStatistic();
    }, 400);
  }

  handingStatistic() {
    this.statistic.forEach(el => {
      if (el.checkClick === 1 && el.dntKnowClick === 0) {
        el.isLearned = true;
      } else {
        el.isLearned = false;
      }
    });
     this.statistic.forEach(el => {
      if (el.isLearned) {
        this.usersAppState.updateProgressWord(el.id, true);
      } else {
        this.usersAppState.updateProgressWord(el.id, false);
      }
    });
    return this.statistic;
  }

  createStatistic(statisticArray) {
    const errors = statisticArray.reduce((acc, currentValue) => {
      if (!currentValue.isLearned) {
        acc += 1;
      }
      return acc;
    }, 0);
    const right = statisticArray.reduce((acc, currentValue) => {
      if (currentValue.isLearned) {
        acc += 1;
      }
      return acc;
    }, 0);
    const statisticNode = document.createElement('template');
    statisticNode.innerHTML = `
    <div class="tab-wrapper">
      <div class="statistic">
        <div class="statistic-wrapper">
          <div class="statistic__learned">
            <div class="statistic__learned__title__wrapper">
              <p class="statistic__learned__title">Знаю</p>
              <span class="statistic__learned__quantity">${right}</span>
            </div>
          </div>
          <div class="statistic__not-learned">
            <div class="statistic__not-learned__title__wrapper">
              <p class="statistic__not-learned__title">Ошибок</p>
              <span class="statistic__not-learned__quantity">${errors}</span>
            </div>
          </div>
        </div>
        <div class="statistic__btn-container">
          <button class="statistic__btn-container__repeat">Попробовать еще раз</button>
          <button class="statistic__btn-container__return">Вернуться к играм</button>
        </div>
      </div>
      </div>
    `.trim();
    const learnedNode = statisticNode.content.querySelector('.statistic__learned');
    const notLearnedNode = statisticNode.content.querySelector('.statistic__not-learned');
    statisticArray.forEach(el => {
      if (el.isLearned) {
        const statisticEl = document.createElement('template');
        statisticEl.innerHTML = `
          <div class="statistic__el__wrapper">
            <button id="${el.audioSrc}" class="statistic__el__audio"></button>
            <p class="statistic__el__word">${el.word}</p>
            <p class="statistic__el__transcription">${el.transcription}</p>
            <p class="statistic__el__translate">${el.translate}</p>
            <button id="${el.id}" class="statistic__el__delete" title="Удалить из словаря"></button>
          </div>
        `;
        learnedNode.append(statisticEl.content);
      } else {
        const statisticEl = document.createElement('template');
        statisticEl.innerHTML = `
          <div class="statistic__el__wrapper">
            <button id="${el.audioSrc}" class="statistic__el__audio"></button>
            <p class="statistic__el__word">${el.word}</p>
            <p class="statistic__el__transcription">${el.transcription}</p>
            <p class="statistic__el__translate">${el.translate}</p>
            <button id="${el.id}" class="statistic__el__delete" title="Удалить из словаря"></button>
          </div>
        `;
        notLearnedNode.append(statisticEl.content);
      }
      this.mainArea.append(statisticNode.content);
    });
  }

  addEventHandlerInStatistic() {
    const audioBtns = document.querySelectorAll('.statistic__el__audio');
    audioBtns.forEach(el => {
      el.addEventListener('click', () => {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = `https://raw.githubusercontent.com/yarkin13/rslang-data/master/${el.id}`;
        audio.play();
      });
    });
    const deleteBtns = document.querySelectorAll('.statistic__el__delete');
    deleteBtns.forEach(el => {
      el.addEventListener('click', () => {
        this.usersAppState.deleteUserWord(el.id, true);
      });
    });
    const returnBtn = document.querySelector('.statistic__btn-container__return');
    returnBtn.addEventListener('click', () => {
      utils.destroy();
      document.querySelector('#nav-games').click();
    });
    const repeatBtn = document.querySelector('.statistic__btn-container__repeat');
    repeatBtn.addEventListener('click', () => {
      utils.destroy();
      new EnglishPuzzle().showMainPage();
    });
  }
}
