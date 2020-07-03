import wordCards from '../../wordCards';
import { usersAppState } from '../../../app';
import TrainingCards from '../../../js/trainingCards/trainingCards';
import * as utils from '../../utils';

// export let usersAppState = new State();

console.log(usersAppState);

export default class Audiocall {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    // выбираем 50 елементов из массива слов
    this.allWords = usersAppState.getTrainingWords(50);
    this.wordsWrapper = '';
    this.currentPlayed = '';
  }

  show() {
    utils.destroy();
    this.handleStart();
  }

  winamp(e) {
    const playableTarget = e.target.closest('.flip-card');
    let volumeSlider = document.querySelector('#volume');
    if (playableTarget && !gameModeSwitch.checked) {
      let mp3 = new Audio(playableTarget.dataset.audiosrc);
      // mp3.volume = volumeSlider.value / (volumeSlider.max - volumeSlider.min);
      mp3.play();
    }
  }

  playGameSound(url) {
    let volumeSlider = document.querySelector('#volume');
    const mp3 = new Audio(url);
    // mp3.volume = (volumeSlider.value) / (volumeSlider.max);
    mp3.play();
  }

  shuffle(array) {
    let m = array.length; let
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      [array[m], array[i]] = [array[i], array[m]];
    }
    return array;
  }

  handleStart() {
    console.log(this.allWords);
    // выбор 50 елементов из массива слов вынес на уровень выше так как выбрать нужно единожды
    // запускаем стартовую страницу с выборкой 5 первых слов
    const currentWords = this.allWords.splice(0, 5);
    this.currentPlayed = currentWords[0];
    // Перетасовываем массив
    this.shuffle(currentWords);
    // Выбираем [последний]
    // Проигрываем звук
    this.playGameSound(`../../../assets/${this.currentPlayed.audio}`);
    // Вешаем обработчик на контейнер
    // Превращаем "старт" в "повтор" / Прячем "старт", показываем "повтор"
    // startButton.classList.toggle('purple-gradient');
    // startButton.classList.toggle('repeat');
    /* if (!gameMogeSwitch.checked) return; */
    this.setAudiocallWrapper(currentWords);
  }

  checkCorrectAnswer(e) {
    var isError = 0;
    const playableTarget = e.target.closest('.word');
    console.log(playableTarget.innerHTML);
    if (playableTarget && !playableTarget.classList.contains('already-checked')) {
    // выяснить какого слова касается карточка
    // если слово совпало:
      if (playableTarget.innerHTML === this.currentPlayed.wordTranslate) {
        // добавляем галочку
        playableTarget.insertAdjacentHTML('beforeEnd', '<div class="correct"></div>');
        // если слов больше нету ->
        if (this.allWords.length === 0) {
          if (document.querySelector('.wrong') === null) {
            // показываем картинку
            this.mainArea.innerHTML = '<img src="Assets/img/crashbirthday.jpg" alt="success">';
            // проигрываем звук прохождения теста
            this.playGameSound('../../../assets/sounds/game-over.mp3'); /* success */
          } else {
            this.mainArea.innerHTML = '<img src="Assets/img/failure.jpg" alt="failure">';
            this.playGameSound('Assets/audio/failure.mp3');
          }
          // возврат в экран выбора категорий и return
          // startButton.classList.add('purple-gradient');
          // startButton.classList.remove('repeat');
          setTimeout(() => {
            this.mainContentGenerator();
            this.menuOutlineGenerator(0);
            this.nonGameMode();
          }, 2500);
          return;
        }
        // проигрываем звук победы
        this.playGameSound('../../../assets/sounds/success.mp3');
        // берем следующее слово
        // Проигрываем следуюций звук
        // (Взято из handleStart)
        setTimeout(() => {
          this.handleStart();
        }, 900);
      }
      // ---- если слово НЕ совпало----:
      else {
        // добавляем пустую звездочку
        playableTarget.insertAdjacentHTML('beforeEnd', '<span class="wrong"></span>');
        // проигрываем звук поражения
        this.playGameSound('../../../assets/sounds/error.mp3');
        isError++;
        console.log(isError);
        // ожидание слова
      }
    }
  }

  setAudiocallWrapper(currentWords) {
    const audiocallTemplate = `
    <div class="tab-wrapper audiocall">
      <div class="intro">
        <h1 class="intro__title">Аудиовызов</h1>
        <div class="word-wrapper">
        </div>
        <button class="into__button answer">Не знаю</button>
      </div>
    </div>
    `;
    setTimeout(() => {
      this.mainArea.innerHTML = audiocallTemplate;
      this.wordsWrapper = document.querySelector('.word-wrapper');
      this.setAudiocallWord(currentWords);
    }, 400);
  }

  setAudiocallWord(currentWords) {
    console.log(currentWords);
    this.wordsWrapper.innerHTML = currentWords.map((word) => `<div class="word" data-audiosrc="../../../assets/${word.word}">${word.wordTranslate}</div>`).join('');
    this.wordsWrapper.onclick = (e) => {
      this.checkCorrectAnswer(e);
    };
  }

  // startButton.onclick = () => {
  //   // Кликаем на кнопку только когда она "старт", а не "повтор"
  //   if (startButton.classList.contains('repeat')) this.playGameSound(currentObject.audioSrc);
  //   else handleStart();
  // };
}
