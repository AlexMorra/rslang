import * as utils from '../../utils';
import DEFAULT_DATA from './defaultData';

export default class Savanna {
  constructor() {
    this.element = null;
    this.cardList = null;
    this.mainArea = document.querySelector('.main-area');
    this.startButton = null;
    this.intro = null;
    this.loader = null;
    this.gameContent = null;
    this.counter = null;
    this.counterOn = false;
    this.count = 3;
    this.soundOn = true;
    this.startDataIndex = 0;
    this.endDataIndex = 4;
    this.gameNum = 1;
    this.wordsArr = DEFAULT_DATA.slice(0, 48);
    this.answers = null;
    this.question = null;
    this.answerWords = null;
    this.questionWord = null;
    this.questionWrapper = null;
    this.errors = 0;
    this.successes = 0;
    this.bgPosition = 100;
    this.lives = null;
  }

  show() {
    setTimeout(() => {
      this.start();
      this.mainArea.append(this.element);
    }, 400);
  }

  getElement() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="tab-wrapper savanna">
        <div class="intro">
          <h1 class="intro__title">Саванна</h1>
          <p class="intro__description">Тренировка Саванна развивает словарный запас.</br>
            Чем больше слов ты знаешь, тем больше очков опыта получишь.</p>
          <button class="into__button button">Начать</button>
        </div>

        <div class="loader none">
          <div class="preloader">
            <p class="preloader__counter">3</p>
          </div>  
        </div>

        <div class="game-wrapper none">
          <div class="controls">
            <button class="controls__sound sound"></button>
            <div class="controls__lives lives">
              <div class="heart"></div>
              <div class="heart"></div>
              <div class="heart"></div>
              <div class="heart"></div>
              <div class="heart"></div>
            </div>
          </div>
          
          <div class="question">
            <div class="question__word">word</div>
          </div>

          <div class="answers">
            <div class="answer">
              <span class="answer__word answer__word--1">word1</span>
            
            </div>
            <div class="answer">
              <span class="answer__word answer__word--2">word2</span>
            </div>
            <div class="answer">
              <span class="answer__word answer__word--3">word3</span>
            </div>
            <div class="answer">
              <span class="answer__word answer__word--4">word4</span>
            </div>
          </div>
        </div>  
        
        <div class="results none">
          <div class="results__content"></div>
        </div>
      </div>`.trim();
    return template.content.children[0];
  }

  shuffle(array) {
    let counter = array.length;
    const shuffleArr = array.slice();

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter -= 1;

      let temp = shuffleArr[counter];
      shuffleArr[counter] = shuffleArr[index];
      shuffleArr[index] = temp;
    }

    return shuffleArr;
  }

  toggleFall() {
    this.questionWrapper.classList.toggle('fall');
  }

  addFail() {
    this.questionWrapper.classList.add('question--fail');
  }

  addSuccess() {
    this.questionWrapper.classList.add('question--success');
  }

  generateGameData() {
    this.dataIndex += 4;
    this.answers = this.shuffle(this.wordsArr.slice(this.startDataIndex, this.endDataIndex));
    this.question = this.answers[Math.floor(Math.random() * (4 - 0)) + 0];
    console.log(this.question);

    this.answerWords.forEach((element, index) => {
      element.textContent = this.answers[index].wordTranslate;
    });

    this.questionWord.textContent = this.question.word;

    this.startDataIndex += 4;
    this.endDataIndex += 4;
  }

  tick() {
    this.count -= 1;
    this.counter.innerHTML = this.count;
  }

  tickPlay() {
    const timerId = setInterval(() => {
      if (this.count === 1) {
        clearInterval(timerId);
        this.counterOn = false;
        this.loader.classList.toggle('hidden');
        this.gamePlay();
      }

      if (this.counterOn) {
        this.tick();
      }
    }, 1000);
  }

  playGame() {
    this.resetAnswers();

    this.gameNum += 1;

    console.log(this.gameNum);
    if (this.gameNum > 12) {
      console.log('game over');
      this.showResults();
    } else {
      setTimeout(() => {
        this.questionWrapper.classList.remove('question--fail');
        this.questionWrapper.classList.remove('question--success');
        this.questionWrapper.classList.remove('start');
        this.generateGameData();
        this.toggleFall();
      }, 400);
    }
  }

  toggleSoundState() {
    if (this.soundOn) {
      this.soundOn = false;
    } else {
      this.soundOn = true;
    }

    this.sound.classList.toggle('off');
  }

  getSuccessAnswer() {
    // this.correctSound.play();

    this.addSuccess();
    this.successes += 1;
    this.bgPosition -= 5;
    this.element.style.backgroundPositionY = `${this.bgPosition}%`;
  }

  getWrongAnswer() {
    // this.errorSound.play();

    this.addFail();
    this.lives[this.errors].classList.add('heart--lost');
    this.errors += 1;
  }

  checkAnswer(target) {
    const answer = target.innerHTML;
    console.log(this.questionWrapper);
    this.questionWrapper.classList.remove('fall');

    if (answer === this.question.wordTranslate) {
      console.log('correct');

      target.parentNode.classList.add('answer--true');
      this.getSuccessAnswer();
      setTimeout(() => {
        this.questionWrapper.classList.add('start');
        this.playGame();
      }, 400);
    } else {
      console.log('wrong');
      target.parentNode.classList.add('answer--false');
      this.getWrongAnswer();

      if (this.errors === 5) {
        console.log('game over');
        this.showResults();
      } else {
        setTimeout(() => this.playGame(), 400);
      }
    }
  }

  timeIsOver() {

  }

  resetQuestion() {
    this.questionWrapper.classList.value = '';
    this.questionWrapper.classList.value = 'question';
  }

  resetAnswers() {
    const trueAnswer = document.querySelector('.answer--true');
    const falseAnswer = document.querySelector('.answer--false');

    if (trueAnswer) {
      trueAnswer.classList.value = '';
      trueAnswer.classList.value = 'answer';
    }

    if (falseAnswer) {
      falseAnswer.classList.value = '';
      falseAnswer.classList.value = 'answer';
    }
  }

  showGame() {
    this.gameContent.classList.toggle('none');
  }

  showResults() {
    this.results.classList.toggle('none');
    this.showGame();
  }

  initGame() {
    setTimeout(() => {
      this.toggleFall();
      this.generateGameData();
    }, 600); // 3000
  }

  start() {
    this.element = this.getElement();
    this.startButton = this.element.querySelector('.into__button');
    this.intro = this.element.querySelector('.intro');
    this.loader = this.element.querySelector('.loader');
    this.counter = this.element.querySelector('.preloader__counter');
    this.sound = this.element.querySelector('.controls__sound');
    this.answerWords = this.element.querySelectorAll('.answer__word');
    this.questionWord = this.element.querySelector('.question__word');
    this.questionWrapper = this.element.querySelector('.question');
    this.blockAnswers = this.element.querySelector('.answers');
    this.gameContent = this.element.querySelector('.game-wrapper');
    this.lives = [...this.element.querySelectorAll('.heart')];
    this.results = this.element.querySelector('.results');

    this.startButton.addEventListener('click', () => {
      this.intro.classList.toggle('none');
      this.showGame();
      this.initGame();
      // this.loader.classList.toggle('hidden');

      // this.counterOn = true;
      // this.tickPlay();
    });

    this.sound.addEventListener('click', () => {
      this.toggleSoundState();
    });

    this.blockAnswers.addEventListener('click', (e) => {
      if (e.target.classList.contains('answer__word')) {
        this.checkAnswer(e.target);
      }
    });

    // utils.destroy();
    // this.show();
  }
}
