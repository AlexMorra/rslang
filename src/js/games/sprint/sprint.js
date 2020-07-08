import SprintTimer from './sprintTimer';
import SprintCard from './sprintCard';
import SprintCounter from './sprintCounter';
import * as utils from '../../utils';
import { usersAppState } from '../../../app';

export default class Sprint {
  constructor() {
    this.wordListLenght = 100;
    this.startBell = new Audio('./assets/sounds/start-bell.wav');
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
      <button class="sprint__soundBtn j-sound"></button>
    `;
    return template.content.children[0];
  }

  initializeGame() {
    this.getArrayWords();
    this.initSoundBtnHandler();
    this.soundOn = true;
    this.counter = new SprintCounter();
    this.timer = new SprintTimer(this.gameTime);
    this.card = new SprintCard(
      this.counter,
      this.initStatistic,
      this.statistic,
      this.timer,
      this.arrayWords,
      this.soundOn
    );
  }

  getGameElements() {
    utils.destroy();
    setTimeout(() => {
      this.mainArea.append(this.getGameWrapper());
      this.initializeGame();
      this.timer.getElement().addEventListener('timer-end', () => {
        this.card.removeKeyEventsFromCardButtons();
        utils.getStatistic(this.statistic);
      });
      const wrapper = document.querySelector('.tab-wrapper');
      wrapper.append(this.timer.getElement());
      wrapper.append(this.counter.getElement());
      wrapper.append(this.card.getElement());
      wrapper.append(this.soundBtn);
      this.startBell.play();
      this.addMenuClickHandler();
    }, 400);
  }

  toggleSoundState() {
    this.soundOn = !this.soundOn;
    this.soundBtn.classList.toggle('off');
  }

  initSoundBtnHandler() {
    this.soundBtn.addEventListener('click', () => {
      this.toggleSoundState();
    });
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
