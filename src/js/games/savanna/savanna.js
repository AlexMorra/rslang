import * as utils from '../../utils';
import { usersAppState } from '../../../app';

export default class Savanna {
  constructor(state) {
    this.element = null;
    this.userState = state;
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
    this.wordsListLength = 48;
    this.wordsList = usersAppState.getTrainingWords(this.wordsListLength);
    this.answers = null;
    this.question = null;
    this.questionWord = null;
    this.answerWords = null;
    this.questionWrapper = null;
    this.currentAnswer = null;
    this.errors = 0;
    this.successes = 0;
    this.bgPosition = 100;
    this.lives = null;
    this.gameOn = false;
    this.startBell = new Audio('./assets/sounds/start-bell.wav');
    this.errorSound = new Audio('./assets/sounds/error.mp3');
    this.successSound = new Audio('./assets/sounds/success.mp3');
    this.gameOverSound = new Audio('./assets/sounds/game-over.wav');
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
            <div class="controls__lives lives">
              <div class="heart"></div>
              <div class="heart"></div>
              <div class="heart"></div>
              <div class="heart"></div>
              <div class="heart"></div>
            </div>
          </div>

          <button class="sound"></button>
          
          <div class="question">
            <div class="question__word">word</div>
          </div>

          <div class="answers">
            <div class="answer">
              <span class="answer__word answer__word--1"></span>
            
            </div>
            <div class="answer">
              <span class="answer__word answer__word--2"></span>
            </div>
            <div class="answer">
              <span class="answer__word answer__word--3"></span>
            </div>
            <div class="answer">
              <span class="answer__word answer__word--4"></span>
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
    this.answers = this.wordsList.slice(this.startDataIndex, this.endDataIndex);
    this.question = this.answers[Math.floor(Math.random() * (4 - 0)) + 0];

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

  tickPlay(playFunc) {
    const timerId = setInterval(() => {
      if (this.count === 1) {
        clearInterval(timerId);
        this.counterOn = false;
        this.loader.classList.toggle('none');
        playFunc();
      }

      if (this.counterOn) {
        this.tick();
      }
    }, 1000);
  }

  playGame() {
    this.currentAnswer.classList.remove('answer--true');
    this.currentAnswer.classList.remove('answer--false');

    this.gameOn = true;
    this.gameNum += 1;

    if (this.gameNum > 12) {
      setTimeout(() => this.showResults(), 600);
    } else {
      setTimeout(() => {
        this.questionWrapper.classList.remove('question--fail');
        this.questionWrapper.classList.remove('question--success');
        this.questionWrapper.classList.remove('start');
        this.generateGameData();
        this.checkOffset();

        if (!this.questionWrapper.classList.contains('fall')) {
          this.questionWrapper.classList.add('fall');
        }
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
    if (this.soundOn) {
      this.successSound.play();
    }

    this.addSuccess();
    this.successes += 1;
    this.bgPosition -= 5;
    this.element.style.backgroundPositionY = `${this.bgPosition}%`;
  }

  getWrongAnswer() {
    if (this.soundOn) {
      this.errorSound.play();
    }

    this.addFail();
    this.lives[this.errors].classList.add('heart--lost');
    this.errors += 1;   
  }

  checkOffset() {
    const threshold = document.documentElement.clientHeight / 2;

    if (this.gameOn) {
      const timerId = setInterval(() => {
        const posY = this.questionWord.getBoundingClientRect().y;

        if (posY === threshold) {
          clearInterval(timerId);
          this.getWrongAnswer();

          if (this.errors === 5) {
            setTimeout(() => this.showResults(), 600);
          } else {
            setTimeout(() => {
              this.questionWrapper.classList.add('start');
              this.toggleFall();
              this.playGame();
            }, 300);
          }
        }
      }, 1000);
    }
  }

  checkAnswer(target) {
    const answer = target.innerHTML;
    this.questionWrapper.classList.remove('fall');
    this.gameOn = false;
    this.currentAnswer = target.parentNode;

    if (answer === this.question.wordTranslate) {
      this.currentAnswer.classList.add('answer--true');
      this.getSuccessAnswer();

      setTimeout(() => {
        this.questionWrapper.classList.add('start');
        this.playGame();
      }, 400);
    } else {
      this.currentAnswer.classList.add('answer--false');
      this.getWrongAnswer();

      if (this.errors === 5) {
        setTimeout(() => this.showResults(), 600);
      } else {
        setTimeout(() => this.playGame(), 400);
      }
    }
  }

  resetQuestion() {
    this.questionWrapper.classList.value = '';
    this.questionWrapper.classList.value = 'question';
  }

  showGame() {
    this.gameContent.classList.toggle('none');
  }

  showResults() {
    this.results.classList.toggle('none');
    this.gameOverSound.play();
    this.showGame();
  }

  initGame() {
    setTimeout(() => {
      this.gameOn = true;
      this.generateGameData();
      this.showGame();

      setTimeout(() => {
        this.toggleFall();
        this.checkOffset();
      }, 600);
    }, 4000);
  }

  toggleMenuIcon() {
    const menu = document.querySelector();
  }

  start() {
    this.element = this.getElement();
    this.startButton = this.element.querySelector('.into__button');
    this.intro = this.element.querySelector('.intro');
    this.loader = this.element.querySelector('.loader');
    this.counter = this.element.querySelector('.preloader__counter');
    this.sound = this.element.querySelector('.sound');
    this.answerWords = this.element.querySelectorAll('.answer__word');
    this.questionWord = this.element.querySelector('.question__word');
    this.questionWrapper = this.element.querySelector('.question');
    this.blockAnswers = this.element.querySelector('.answers');
    this.gameContent = this.element.querySelector('.game-wrapper');
    this.lives = [...this.element.querySelectorAll('.heart')];
    this.results = this.element.querySelector('.results');

    this.startButton.addEventListener('click', () => {
      this.intro.classList.toggle('none');
      this.loader.classList.toggle('none');

      this.counterOn = true;
      this.tickPlay(this.playGame);
      this.startBell.play();

      this.initGame();
    });

    this.sound.addEventListener('click', () => {
      this.toggleSoundState();
    });

    this.blockAnswers.addEventListener('click', (e) => {
      if (e.target.classList.contains('answer__word')) {
        this.checkAnswer(e.target);
      }
    });
  }
}
