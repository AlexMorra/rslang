import SprintTimer from './sprintTimer';
import SprintCard from './sprintCard';
import SprintCounter from './sprintCounter';
import * as utils from '../../utils';
import { usersAppState } from '../../../app';

export default class Sprint {
  constructor() {
    this.wordListLenght = 100;
    this.startBell = new Audio('./assets/sounds/start-bell.wav');
    this.gameOverSound = new Audio('./assets/sounds/game-over.wav');
    this.usersAppState = usersAppState;
    this.gameTime = 60; // seconds
    this.arrayWords = [];
    this.initStatistic = [];
    this.statistic = [];
    this.element = this.getGameWrapper();
    this.soundBtn = this.getSoundButton();
    this.mainArea = document.querySelector('.main-area');
  }

  show() {
    setTimeout(() => {
      this.mainArea.append(this.getInitialTemplate());
      this.addEventsToInitialTemplateBtn();
    }, 400);
  }

  getGameWrapper() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="tab-wrapper sprint-wrapper"></div>
    `;
    return template.content.children[0];
  }

  getSoundButton() {
    const template = document.createElement('template');
    template.innerHTML = `
      <button class="sprint__soundBtn"></button>
    `;
    return template.content.children[0];
  }

  initializeGame() {
    this.getArrayWords();
    this.counter = new SprintCounter();
    this.timer = new SprintTimer(this.gameTime);
    this.card = new SprintCard(
      this.counter,
      this.initStatistic,
      this.statistic,
      this.timer,
      this.arrayWords
    );
  }

  getGameElements() {
    this.initializeGame();
    this.timer.getElement().addEventListener('timer-end', () => {
      this.card.removeKeyEventsFromCardButtons();
      this.handingStatistic()
        .then(() => {
          utils.getStatistic(this.statistic);
        })
        .catch(console.error);
    });
    this.element.append(this.timer.getElement());
    this.element.append(this.counter.getElement());
    this.element.append(this.card.getElement());
    this.element.append(this.soundBtn);
    this.startBell.play();
    this.addMenuClickHandler();
  }

  addMenuClickHandler() {
    const menu = document.querySelector('.nav-menu');
    menu.addEventListener('click', (event) => {
      const target = event.target;
      if (target.tagName === 'LI') {
        this.timer.clearInterval();
        this.card.removeKeyEventsFromCardButtons();
      }
    });
  }

  handingStatistic() {
    const promises = this.statistic.map(el => {
      if (el.isLearned) {
        return this.usersAppState.updateProgressWord(el.id, true);
      }
      return this.usersAppState.updateProgressWord(el.id, false);
    });
    return Promise.all(promises);
  }

  getArrayWords() {
    this.arrayWords = this.usersAppState.getTrainingWords(this.wordListLenght);
    this.initStatistic = this.arrayWords.map(el => {
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
  }

  getInitialTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="sprint__intro">
        <h1 class="sprint__intro-title">Спринт</h1>
        <p class="sprint__intro-description">
          Тренировка Спринт - это игра на время.</br>
          Чем больше верных ответов ты дашь за 60 секунд, </br>
          тем больше очков опыта получишь.
        </p>
        <button class="sprint__intro-button button">Начать</button>
      </div>
    `;
    this.element.append(template.content);
    return this.element;
  }

  addEventsToInitialTemplateBtn() {
    this.introBtn = document.querySelector('.sprint__intro-button');
    this.introBtn.addEventListener('click', () => {
      this.element.innerHTML = '';
      this.getGameElements();
    });
  }
}
