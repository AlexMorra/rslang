export default class SprintCard {
  constructor(counter, initStatistic, statistic, timer, wordList) {
    this.timer = timer;
    this.wordList = wordList;
    this.wordListRangeStart = 0;
    this.wordListRangeEnd = wordList.length - 1;
    this.counter = counter;
    this.initStatistic = initStatistic;
    this.statistic = statistic;
    this.soundOn = true;
    this.errorSound = new Audio('./assets/sounds/error.mp3');
    this.successSound = new Audio('./assets/sounds/success.mp3');
    this.answers = 0;
    this.correctAnswers = 0;
    this.allCorrectAnswers = 0;
    this.points = 0;
    this.cur = 10;
    this.multiplier = 2;
    this.isSame = null;
    this.element = this.getCard();
    this.info = this.element.querySelector('.j-info');
    this.word = this.element.querySelector('.j-word');
    this.card = this.element.querySelector('.j-card');
    this.translation = this.element.querySelector('.j-translation');
    this.addWordAndTranslateToCard();
    this.addClickEventsToCardButtons();
    this.addKeyEventsToCardButtons();
  }

  getElement() {
    return this.element;
  }

  getCard() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="sprint__card j-card">
        <div class="sprint__card-main">
            <ul class="sprint__card-main-indicator j-indicator">
              <li class="sprint__card-main-indicator-item"></li>
              <li class="sprint__card-main-indicator-item"></li>
              <li class="sprint__card-main-indicator-item"></li>
              <li class="sprint__card-main-indicator-item"></li>
            </ul>
            <p class="sprint__card-main-info j-info"></p>
<!--            <img class="sprint__card-main-icon" src="#" alt="icon">-->
            <p class="sprint__card-main-word j-word"></p>
            <p class="sprint__card-main-translation j-translation"></p>
        </div>
        <div class="sprint__card-btn">
            <button class="sprint__card-btn-item button j-falseBtn">Неверно</button>
            <button class="sprint__card-btn-item button j-trueBtn">Верно</button>
        </div>
      </div>
    `;
    return template.content;
  }

  addWordAndTranslateToCard() {
    if (this.wordList.length === this.answers) {
      this.timer.destroy();
    } else {
      this.word.innerHTML = this.wordList[this.answers].word;
      this.isSame = Boolean(Math.random() < 0.5);
      if (this.isSame === true) {
        this.translation.innerHTML = this.wordList[this.answers].wordTranslate;
      } else {
        // eslint-disable-next-line max-len
        let rand = Math.floor(this.wordListRangeStart + Math.random() * (this.wordListRangeEnd + 1 - this.wordListRangeStart));
        this.translation.innerHTML = this.wordList[rand].wordTranslate;
        if (rand === this.answers) {
          this.isSame = true;
        }
      }
      this.answers++;
    }
  }

  addClickEventsToCardButtons() {
    const btnGroup = this.element.querySelector('.sprint__card-btn');
    btnGroup.addEventListener('click', (event) => {
      const target = event.target;
      if ((target.classList.contains('j-falseBtn') && this.isSame === false) || (target.classList.contains('j-trueBtn') && this.isSame === true)) {
        this.updateAnswersAndStatistic();
        this.counter.setCounter(this.points);
      } else if (target.classList.contains('j-falseBtn') || target.classList.contains('j-trueBtn')) {
        this.resetAnswers();
      }
      this.addWordAndTranslateToCard();
    });
  }

  removeKeyEventsFromCardButtons() {
    document.removeEventListener('keydown', this.onKeyDown.bind(this));
  }

  addKeyEventsToCardButtons() {
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown(event) {
    if ((event.code === 'ArrowLeft' && this.isSame === false) || (event.code === 'ArrowRight' && this.isSame === true)) {
      this.updateAnswersAndStatistic();
      this.counter.setCounter(this.points);
      this.addWordAndTranslateToCard();
    } else if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      this.resetAnswers();
      this.addWordAndTranslateToCard();
    }
  }

  resetAnswers() {
    this.errorSound.play();
    this.correctAnswers = 0;
    this.cur = 10;
    this.statistic.push(this.initStatistic[this.answers - 1]);
    this.toggleIndicatorAndInfo();
  }

  updateAnswersAndStatistic() {
    this.successSound.play();
    if (this.correctAnswers === 4) {
      this.cur *= this.multiplier;
      this.correctAnswers = 0;
      this.toggleIndicatorAndInfo();
    }
    this.toggleIndicatorAndInfo(this.correctAnswers);
    this.correctAnswers++;
    this.allCorrectAnswers++;
    this.points += this.cur;
    this.initStatistic[this.answers - 1].isLearned = true;
    this.statistic.push(this.initStatistic[this.answers - 1]);
  }

  highlightCard() {
    this.card.classList.add('sprint__card_highlight');
    setTimeout(() => {
      this.card.classList.remove('sprint__card_highlight');
    }, 200);
  }

  toggleIndicatorAndInfo(childNumber) {
    const indicator = document.querySelector('.j-indicator');
    if (childNumber === undefined) {
      Array.from(indicator.children).forEach(child => child.innerHTML = '');
      this.info.innerHTML = '';
    } else {
      indicator.children[childNumber].innerHTML = `
        <img class="sprint__card-main-indicator-item-img" alt='' src='../../../assets/icons/sprint_check-mark.png'>
      `;
      this.highlightCard();
      if (this.cur > 10) {
        this.info.innerHTML = `+${this.cur} очков за слово`;
      }
    }
  }
}
