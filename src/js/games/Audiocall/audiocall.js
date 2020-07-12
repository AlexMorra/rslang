import wordCards from '../../wordCards';
import { usersAppState } from '../../../app';
import TrainingCards from '../../../js/trainingCards/trainingCards';
import * as utils from '../../utils';

console.log(usersAppState);

export default class Audiocall {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.wordsWrapper = null;
    this.currentObject = null;
    this.startButton = null;
    this.errors = 0;
    this.currentError = false;
    this.alreadyGuessed = false;
    this.wordsListLength = 50;
    this.soundOn = true;
    this.allWords = usersAppState.getTrainingWords(this.wordsListLength);
    this.startBell = new Audio('./assets/sounds/start-bell.wav');
    this.errorSound = new Audio('./assets/sounds/error.mp3');
    this.successSound = new Audio('./assets/sounds/success.mp3');
    this.gameOverSound = new Audio('./assets/sounds/game-over.wav');
    this.statistics = [];
  }

  show() {
    utils.destroy();
    this.getIntro();
  }

  playGameSound(url) {
    const mp3 = new Audio(url);
    mp3.play();
  }

  shuffle(array) {
    const newArray = array.slice();
    let m = array.length;
    let i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      [newArray[m], newArray[i]] = [newArray[i], newArray[m]];
    }
    return newArray;
  }

  toggleSoundState() {
    if (this.soundOn) {
      this.soundOn = false;
    } else {
      this.soundOn = true;
    }
    this.sound.classList.toggle('off');
  }

  getIntro() {
    const introTemplate = `
      <div class="tab-wrapper audiocall">
        <div class="intro">
          <h1 class="intro__title">Аудиовызов</h1>
          <p class="intro__description">Тренировка Аудиовызов развивает словарный запас.</br>
            В процессе игры будут звучать английские слова, которые нужно угадать среди предлагаемых.</p>
          <button class="into__button button">Начать</button>
        </div>
      </div>`.trim();

    setTimeout(() => {
      this.mainArea.innerHTML = introTemplate;
      const button = document.querySelector('.into__button');
      button.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
          utils.destroy();
          this.handleStart();
        }
      });
    }, 400);
  }

  handleStart() {
    this.currentError = false;
    // выбор 50 елементов из массива слов вынес на уровень выше так как выбрать нужно единожды
    // запускаем стартовую страницу с выборкой 5 первых слов
    const currentWords = this.allWords.splice(0, 5);
    this.currentObject = currentWords[0];
    // Перетасовываем массив
    const shuffledWords = this.shuffle(currentWords);
    // Выбираем [последний]
    // Проигрываем звук
    this.playGameSound(`./assets/${this.currentObject.audio}`);
    // Вешаем обработчик на контейнер
    // Превращаем "старт" в "повтор" / Прячем "старт", показываем "повтор"
    // startButton.classList.toggle('purple-gradient');
    // startButton.classList.toggle('repeat');
    /* if (!gameMogeSwitch.checked) return; */
    this.setAudiocallWrapper(shuffledWords);
  }

  checkCorrectAnswer(e) {
    if (!this.alreadyGuessed) {
      const playableTarget = e.target.closest('.word');
      if (playableTarget && !playableTarget.classList.contains('already-checked')) {
        // выяснить какого слова касается карточка
        // если слово совпало:
        if (playableTarget.dataset.word === this.currentObject.wordTranslate) {
          this.alreadyGuessed = true;
          // добавляем галочку
          playableTarget.insertAdjacentHTML('beforeEnd', '<span class="correct"></span>');
          // добавляем в массив угададанных, если раннее пользователь не ошибся
          if (!this.currentError) {
            this.addToStatistic(this.currentObject, true);
            usersAppState.updateProgressWord(this.currentObject.id, true);
          }
          // если слов больше нету ->
          if (this.allWords.length === 0) {
          // проигрываем звук прохождения теста
            // возврат в экран выбора категорий и return
            setTimeout(() => {
              utils.destroy();
              this.showResults();
            }, 500);
            return;
          }
          // проигрываем звук победы
          if (this.soundOn) this.playGameSound('./assets/sounds/success.mp3');
          // берем следующею пару слов
          setTimeout(() => {
            utils.destroy();
            this.handleStart();
          }, 5000);
        }
        // ---- если слово НЕ совпало----:
        else {
        // добавляем хрестик
          playableTarget.insertAdjacentHTML('beforeEnd', '<span class="wrong"></span>');
          // добавляем в массив не угаладанных
          if (!this.currentError) {
            this.currentError = true;
            this.errors += 1;
            this.addToStatistic(this.currentObject);
            usersAppState.updateProgressWord(this.currentObject.id, false);
          }
          // проигрываем звук поражения
          if (this.soundOn) this.playGameSound('./assets/sounds/error.mp3');
        // ожидание слова
        }
      }
    }
  }

  setAudiocallWrapper(currentWords) {
    const audiocallTemplate = `
    <div class="tab-wrapper audiocall">
      <div class="sound ${this.soundOn ? '' : 'off'}"></div>
      <div class="intro">
        <h1 class="intro__title">Аудиовызов</h1>
        <div class="word-wrapper">
        </div>
        <button class="into__button">Повторить слово</button>
      </div>
    </div>
    `;
    setTimeout(() => {
      this.mainArea.innerHTML = audiocallTemplate;
      this.wordsWrapper = document.querySelector('.word-wrapper');
      this.sound = document.querySelector('.sound');
      this.setAudiocallWord(currentWords);
      const button = document.querySelector('.into__button');
      button.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
          this.playGameSound(`./assets/${this.currentObject.audio}`);
        }
      });
      this.sound.addEventListener('click', () => {
        this.toggleSoundState();
      });
    }, 400);
  }

  setAudiocallWord(currentWords) {
    this.alreadyGuessed = false;
    this.wordsWrapper.innerHTML = currentWords.map((word) => `<div class="word" data-word="${word.wordTranslate}" data-ifcorrect="${word.wordTranslate === this.currentObject.wordTranslate ? 'correct' : ''}">${word.wordTranslate}</div>`).join('');
    this.wordsWrapper.onclick = (e) => {
      this.checkCorrectAnswer(e);
    };
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

  showResults() {
    this.gameOverSound.play();
    console.log(this.statistics);
    utils.getStatistic(this.statistics);
  }

  // startButton.onclick = () => {
  //   // Кликаем на кнопку только когда она "старт", а не "повтор"
  //   if (startButton.classList.contains('repeat')) this.playGameSound(currentObject.audioSrc);
  //   else handleStart();
  // };
}
