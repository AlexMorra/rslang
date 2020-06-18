import SprintTimer from './sprintTimer';
import SprintCard from './sprintCard';
import SprintCounter from './sprintCounter';
import SprintStatistic from './sprintStatistic';
import { usersAppState } from '../../../app';
import wordCards from '../../wordCards';

export default class Sprint {
  constructor() {
    this.gameTime = 10;
    this.currentWords = [];
    this.wordList = this.createWordList();
    this.element = this.getGameWrapper();
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

  initializeGame() {
    this.counter = new SprintCounter(this.statistic);
    this.statistic = new SprintStatistic();
    this.timer = new SprintTimer(this.gameTime);
    this.card = new SprintCard(this.counter, this.statistic, this.timer, this.wordList);
  }

  getGameElements() {
    this.initializeGame();
    this.element.append(this.card);
    this.element.append(this.counter.getElement());
    this.timer.getElement().addEventListener('timer-end', () => {
      this.element.innerHTML = '';
      this.element.append(this.statistic.getStatistic());
      this.addEventsToStatisticBtn();
    });
    this.element.append(this.timer.getElement());
  }

  getInitialTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="sprint__intro">
        <h1 class="sprint__intro-title">Спринт</h1>
        <p class="sprint__intro-description">
          Тренировка Спринт - это игра на время.</br>
          Чем больше верных ответов ты дашь за 60 секунд, тем больше очков опыта получишь.</p>
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

  addEventsToStatisticBtn() {
    document.querySelector('.j-statisticBtn').addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('j-playAgain')) {
        this.element.innerHTML = '';
        this.show();
        console.log(this.card);
      } else if (target.classList.contains('j-menu')) {
        console.log('В меню!');
      }
    });
  }

  createWordList() {
    // Create array with words, translates and other data by word ID
    usersAppState.userWords.forEach(obj => {
      let word = wordCards[obj.difficulty].find(item => item.id === obj.wordId);
      this.currentWords.push(word);
    });
    // Randomize array
    for (let i = this.currentWords.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.currentWords[i], this.currentWords[j]] = [this.currentWords[j], this.currentWords[i]];
    }
    return this.currentWords;
  }
}
