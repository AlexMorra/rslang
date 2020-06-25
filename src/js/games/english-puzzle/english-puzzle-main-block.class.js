import wordCards from '../../wordCards';
import TrainingCards from '../../trainingCards/trainingCards';
import State from '../../usersAppState';
import { dragAndDrop, wordClick } from './drag-and-drop-and-click-word';
import EnglishPuzzleHintsBlock from './english-puzzle-hints-block.class';
import EnglishPuzzleButtonsBlock from './english-puzzle-buttons-block.class';
export default class EnglishPuzzleMainBlock {
  constructor() {
    this.currentStage = 1;
    this.trainingCards = new TrainingCards();
    this.arrayWords = [];
    this.state = new State();
    this.hintsBlock = new EnglishPuzzleHintsBlock();
    this.buttonsBlock = new EnglishPuzzleButtonsBlock();
    this.statistic = [];
  }

  async getMainBlock() {
    const mainBlock = document.createElement('template');
    const targetNode = document.querySelector('.english-puzzle-main');
    mainBlock.innerHTML = `
      <div class="english-puzzle-main__stage">${this.currentStage}/10</div>
      <div class="english-puzzle-main__active-hints"></div>
      <div class="english-puzzle-main__result-block"></div>
      <div class="english-puzzle-main__active-phrase"></div>
    `.trim();
    targetNode.append(mainBlock.content);
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
    this.trainingCards.getTrainingWords();
    this.arrayWords = this.trainingCards.trainingWords;
    if (this.arrayWords.length < 10) {
      for (let i = this.arrayWords.length; i < 10; i += 1) {
        this.arrayWords.push(wordCards[Math.round(1 + Math.random() * (5 - 1))][Math.round(0 + Math.random() * (599 - 0))]);
      }
    }
    this.arrayWords.forEach(el => {
      el.textExample = el.textExample.replace(/<b>/gm, '').replace(/<\/b>/gm, '');
      el.textExampleArray = el.textExample.split(' ');
    });
    console.log(this.arrayWords);
    this.statistic = this.arrayWords.map(el => {
      return {
        id: el.id,
        group: el.group,
        page: el.page,
        word: el.word,
        checkClick: 0,
        dntKnowClick: 0
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
    await this.state.getUserSettings();
    if (this.state.translateWord) {
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
    if (this.currentStage === 5) this.getStatistic();
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
  }

  handingStatistic() {
    this.statistic.forEach(el => {
      if (el.checkClick === 1 && el.dntKnowClick === 0) {
        el.isLearned = true;
      } else {
        el.isLearned = false;
      }
    });
    console.log(this.statistic);
    return this.statistic;
  }

  getStatistic() {
    const handedStatistic = this.handingStatistic();
    const targetNode = document.querySelector('.english-puzzle-main');
    const statistic = document.createElement('template');
    statistic.innerHTML = `
      <div class="modal">
      <div class="english-puzzle__statistic">
        <div class="english-puzzle__statistic__learned">
          <p class="english-puzzle__statistic__learned__title">Изучено:</p>
        </div>
        <div class="english-puzzle__statistic__not-learned">
          <p class="english-puzzle__statistic__learned__title">Не изучено:</p>
        </div>
      </div>
    `.trim();
    targetNode.append(statistic.content);
    const learnedNode = document.querySelector('.english-puzzle__statistic__learned');
    const notLearnedNode = document.querySelector('.english-puzzle__statistic__not-learned');
    handedStatistic.forEach(el => {
      if (el.isLearned) {
        const statisticEl = document.createElement('template');
        statisticEl.innerHTML = `
          <div class="english-puzzle__statistic__learned__wrapper-el">
            <p class="english-puzzle__statistic__learned__wrapper-el__word">${el.word}</p>
            <button class="english-puzzle__statistic__learned__wrapper-el__btn-is-difficult">Сложное</button>
          </div>
        `;
        learnedNode.append(statisticEl.content);
      } else {
        const statisticEl = document.createElement('template');
        statisticEl.innerHTML = `
          <div class="english-puzzle__statistic__not-learned__wrapper-el">
            <p class="english-puzzle__statistic__not-learned__wrapper-el__word">${el.word}</p>
            <button class="english-puzzle__statistic__not-learned__wrapper-el__btn-is-difficult">Сложное</button>
          </div>
        `;
        notLearnedNode.append(statisticEl.content);
      }
    });
  }
}
