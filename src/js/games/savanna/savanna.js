import * as utils from '../../utils';
import { usersAppState } from '../../../app';
import SavannaIntro from './savannaIntro';

export default class Savanna {
  constructor(state) {
    this.element = null;
    this.userState = state;
    this.cardList = null;
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
    this.gameNum = 1;
    this.wordsListLength = 48;
    this.wordsList = usersAppState.getTrainingWords(this.wordsListLength);
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
    this.startBell = new Audio('./assets/sounds/start-bell.wav');
    this.errorSound = new Audio('./assets/sounds/error.mp3');
    this.successSound = new Audio('./assets/sounds/success.mp3');
    this.gameOverSound = new Audio('./assets/sounds/game-over.wav');
    this.intro = new SavannaIntro().getElement();
    this.statistics = [];
  }

  show() {
    setTimeout(() => {
      this.element = this.getElement();
      this.element.append(this.intro);
      this.mainArea.append(this.element);
      this.initElements();
      this.startButtonClickHandler();
    }, 400);
  }
  
  startAgain() {
    setTimeout(() => {
      this.element = this.getElement();
      this.mainArea.append(this.element);
      this.initElements();
      this.loader.classList.toggle('none');

      this.counterOn = true;
      this.tickPlay(this.initGame.bind(this));
      this.startBell.play();
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
      this.startBell.play();
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
      this.successSound.play();
    }

    this.addSuccess();
    this.moveBackground();
  }

  moveBackground() {    
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

  getCorrectAnswer() {
    console.log(this.answers)
    console.log(this.questionWord)
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
    console.log(this.question)
    const arr = {
      audio: "files/02_0030.mp3",
      audioExample: "files/02_0030_example.mp3",
      audioMeaning: "files/02_0030_meaning.mp3",
      group: 0,
      id: "5e9f5ee35eb9e72bc21af4bd",
      image: "files/02_0030.jpg",
      page: 1,
      textExample: "The sound of her <b>laugh</b> filled the room.",
      textExampleTranslate: "Звук ее смеха заполнил комнату",
      textMeaning: "<i>Laugh</i> is the sound made when someone is happy or a funny thing occurs.",
      textMeaningTranslate: "Смех - это звук, который звучит, когда кто-то счастлив или происходит смешная вещь",
      transcription: "[læf]",
      word: "laugh",
      wordTranslate: "смех",
      wordsPerExampleSentence: 8
    }
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

  resetQuestion() {
    this.questionWrapper.classList.value = '';
    this.questionWrapper.classList.value = 'question';
  }

  showGame() {
    this.gameContent.classList.toggle('none'); 
  }

  showResults() {
    this.gameOn = false;
    this.results.classList.toggle('none');
    this.gameOverSound.play();
    this.showGame();
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
  }
}
