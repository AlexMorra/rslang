import * as utils from '../../utils';
import { usersAppState } from '../../../app';
import SavannaIntro from './savannaIntro';

export default class Savanna {
  constructor() {
    this.element = null;
    this.mainArea = document.querySelector('.main-area');
    this.startButton = null;
    this.loader = null;
    this.gameContent = null;
    this.counter = null;
    this.counterOn = false;
    this.count = 3;
    this.soundOn = true;
    this.startDataIndex = 0;
    this.endDataIndex = 4;
    this.gameNum = 0;
    this.wordsListLength = 48;
    this.wordsList = null;
    this.answers = null;
    this.question = null;
    this.questionWord = null;
    this.allAnswers = null;
    this.answersIndex = null;
    this.questionWrapper = null;
    this.currentAnswer = null;
    this.errors = 0;
    this.successes = 0;
    this.bgPosition = 100;
    this.lives = null;
    this.gameOn = false;
    this.intro = new SavannaIntro().getElement();
    this.statistics = [];
    this.usersAppState = usersAppState;
  }

  playSuccessSound() {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = './assets/sounds/success.mp3';
    audio.play();
  }

  playErrorSound() {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = './assets/sounds/error.mp3';
    audio.play();
  }

  playGameOverSound() {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = './assets/sounds/game-over.wav';
    audio.play();
  }

  playStartBellSound() {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = './assets/sounds/start-bell.wav';
    audio.play();
  }

  show() {
    setTimeout(() => {
      this.wordsList = this.usersAppState.getTrainingWords(this.wordsListLength);
      this.element = this.getElement();
      this.element.append(this.intro);
      this.mainArea.append(this.element);
      this.initElements();
      this.startButtonClickHandler();
    }, 400);
  }

  startAgain() {
    setTimeout(() => {
      this.wordsList = this.usersAppState.getTrainingWords(this.wordsListLength);
      this.element = this.getElement();
      this.mainArea.append(this.element);
      this.initElements();
      this.loader.classList.toggle('none');

      this.counterOn = true;
      this.tickPlay(this.initGame.bind(this));
      
      this.playStartBellSound();

    }, 400);
  }

  initElements() {
    this.startButton = this.element.querySelector('.into__button');
    this.loader = this.element.querySelector('.loader');
    this.counter = this.element.querySelector('.preloader__counter');
    this.sound = this.element.querySelector('.sound');
    this.allAnswers = [...this.element.querySelectorAll('.answer__word')];
    this.questionWord = this.element.querySelector('.question__word');
    this.questionWrapper = this.element.querySelector('.question');
    this.blockAnswers = this.element.querySelector('.answers');
    this.gameContent = this.element.querySelector('.game-wrapper');
    this.lives = [...this.element.querySelectorAll('.heart')];
    this.results = this.element.querySelector('.results');
  }

  startButtonClickHandler() {
    this.startButton.addEventListener('click', () => {
      this.intro.remove();
      this.loader.classList.toggle('none');

      this.counterOn = true;
      this.tickPlay(this.initGame.bind(this));

      this.playStartBellSound();

    });
  }

  initGame() {
    setTimeout(() => {
      this.gameOn = true;
      this.gameNum += 1;
      this.generateGameData();
      this.showGame();
      this.checkDistance();
      this.initHandlers();
    }, 400);

    setTimeout((() => this.toggleFall()), 500);
  }

  getElement() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="tab-wrapper savanna">
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
              <span class="answer__word answer__word--1" data-index="0"></span>            
            </div>
            <div class="answer">
              <span class="answer__word answer__word--2" data-index="1"></span>
            </div>
            <div class="answer">
              <span class="answer__word answer__word--3" data-index="2"></span>
            </div>
            <div class="answer">
              <span class="answer__word answer__word--4" data-index="3"></span>
            </div>
          </div>
        </div>  
      </div>`.trim();
    return template.content.children[0];
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
    this.answersIndex = Math.floor(Math.random() * (4 - 0)) + 0;
    this.question = this.answers[this.answersIndex];

    this.allAnswers.forEach((element, index) => {
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

  resetAnswersState() {
    if (this.currentAnswer) {
      this.currentAnswer.classList.remove('answer--true');
      this.currentAnswer.classList.remove('answer--false');
    }
    this.allAnswers[this.answersIndex].parentNode.classList.remove('answer--true');
  }

  resetQuestionState() {
    this.questionWrapper.classList.remove('question--fail');
    this.questionWrapper.classList.remove('question--success');
    this.questionWrapper.classList.remove('start');
  }

  playGame() {
    this.resetAnswersState();
    this.gameOn = true;
    this.gameNum += 1;

    if (this.gameNum > 12) {
      setTimeout(() => this.showResults(), 600);
    } else {
      setTimeout(() => {
        this.resetQuestionState();
        this.generateGameData();
        this.checkDistance();

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
      this.playSuccessSound();
    }

    this.addSuccess();
    this.moveBackground();
    this.addToStatistic(this.question, true);
    this.usersAppState.updateProgressWord(this.question.id, true);
  }

  moveBackground() {
    this.successes += 1;
    this.bgPosition -= 5;
    this.element.style.backgroundPositionY = `${this.bgPosition}%`;
  }

  getWrongAnswer() {
    if (this.soundOn) {
      this.playErrorSound();
    }

    this.addFail();

    if (this.lives[this.errors]) {      
      this.lives[this.errors].classList.add('heart--lost');
    }

    this.errors += 1;
    this.addToStatistic(this.question);
    this.usersAppState.updateProgressWord(this.question.id, false);
  }

  checkDistance() {
    const threshold = document.documentElement.clientHeight / 2;

    if (this.gameOn) {
      const timerId = setInterval(() => {
        const posY = this.questionWord.getBoundingClientRect().y;

        if (posY === threshold) {
          clearInterval(timerId);
          this.allAnswers[this.answersIndex].parentNode.classList.add('answer--true');
          this.getWrongAnswer();

          if (this.errors === 5) {
            setTimeout(() => this.showResults(), 600);
          } else {
            setTimeout(() => {
              this.questionWrapper.classList.add('start');
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
      this.allAnswers[this.answersIndex].parentNode.classList.add('answer--true');
      this.getWrongAnswer();

      if (this.errors === 5) {
        setTimeout(() => this.showResults(), 600);
      } else {
        setTimeout(() => this.playGame(), 400);
      }
    }
  }

  addToStatistic(el, isLearned = false) {
    const question = {
      id: el.id,
      word: el.word,
      translate: el.wordTranslate,
      isLearned: isLearned,
      audioSrc: el.audio,
      transcription: el.transcription
    };

    this.statistics.push(question);
  }

  resetQuestion() {
    this.questionWrapper.classList.value = '';
    this.questionWrapper.classList.value = 'question';
  }

  showGame() {
    this.gameContent.classList.toggle('none');
  }

  showResults() {
    this.gameOn = false;
    this.playGameOverSound();
    utils.getStatistic(this.statistics);
  }

  numberKeyPressHandler() {
    document.addEventListener('keyup', ({ keyCode } = event) => {
      if (this.gameOn) {
        if (keyCode === 49 || keyCode === 35) {
          this.checkAnswer(this.allAnswers[0]);
        }
  
        if (keyCode === 50 || keyCode === 40) {
          this.checkAnswer(this.allAnswers[1]);
        }
  
        if (keyCode === 51 || keyCode === 34) {
          this.checkAnswer(this.allAnswers[2]);
        }
  
        if (keyCode === 52 || keyCode === 37) {
          this.checkAnswer(this.allAnswers[3]);
        }
      }      
    });
  }

  initHandlers() {
    this.sound.addEventListener('click', () => {
      this.toggleSoundState();
    });

    this.blockAnswers.addEventListener('click', (e) => {
      if (e.target.classList.contains('answer__word')) {
        this.checkAnswer(e.target);
      }
    });

    this.numberKeyPressHandler();
  }
}
