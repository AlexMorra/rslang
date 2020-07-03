import SprintTimer from './sprintTimer';
import SprintCard from './sprintCard';
import SprintCounter from './sprintCounter';
import SprintStatistic from './sprintStatistic';
import { usersAppState } from '../../../app';

export default class Sprint {
  constructor() {
    this.wordListLenght = 100;
    this.gameTime = 1000; // seconds
    this.wordList = usersAppState.getTrainingWords(this.wordListLenght);
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
    this.timer.getElement().addEventListener('timer-end', () => {
      document.removeEventListener('keydown', this.card.handler);
      this.element.innerHTML = '';
      this.element.append(this.statistic.getStatistic());
      this.addEventsToStatisticBtn();
    });
    this.element.append(this.timer.getElement());
    this.element.append(this.counter.getElement());
    this.element.append(this.card);
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

  addEventsToStatisticBtn() {
    document.querySelector('.j-statisticBtn').addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('j-playAgain')) {
        this.element.innerHTML = '';
        this.getGameElements();
      }
    });
  }
}
