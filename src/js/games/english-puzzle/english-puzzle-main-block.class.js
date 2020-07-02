import * as utils from '../../utils';
import { usersAppState } from '../../../app';
import { dragAndDrop, wordClick } from './drag-and-drop-and-click-word';
import EnglishPuzzleHintsBlock from './english-puzzle-hints-block.class';
import EnglishPuzzleButtonsBlock from './english-puzzle-buttons-block.class';

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
        <div class="english-puzzle-main__active-phrase__wrapper__element" index="${i}" word="${this.arrayWords[this.currentStage - 1].textExampleArray[i]}" draggable="true">
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
      utils.getStatistic(this.statistic)
    }
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

}
