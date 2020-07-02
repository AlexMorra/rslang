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

  checkCorrectAnswer(e) {
    const playableTarget = e.target.closest('.word');
    var isError = 0;
    if (playableTarget && !playableTarget.classList.contains('already-checked')) {
    // выяснить какого слова касается карточка
    // если слово совпало:
      if (playableTarget.dataset.word === currentObject.word) {
        // выключаем карточку
        playableTarget.classList.add('already-checked');
        // добавляем галочку
        ratingContainer.insertAdjacentHTML('beforeEnd', '<div class="correct"></div>');
        // если слов больше нету ->
        if (shuffledCurrentTheme.length === 0) {
          if (document.querySelector('.wrong') === null) {
            // показываем картинку
            cardsContainer.innerHTML = '<img src="Assets/img/crashbirthday.jpg" alt="success">';
            // проигрываем звук прохождения теста
            this.playGameSound('Assets/audio/success.mp3'); /* success */
          } else {
            cardsContainer.innerHTML = '<img src="Assets/img/failure.jpg" alt="failure">';
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
        this.playGameSound('Assets/audio/correct.mp3');
        // берем следующее слово
        // Проигрываем следуюций звук
        // (Взято из handleStart)
        currentObject = shuffledCurrentTheme.pop();
        setTimeout(function () {
          this.playGameSound(currentObject.audioSrc);
        }, 900);
      }
      // если слово НЕ совпало:
      else {
        // добавляем пустую звездочку
        ratingContainer.insertAdjacentHTML('beforeEnd', '<div class="wrong"></div>');
        // проигрываем звук поражения
        this.playGameSound('Assets/audio/error.mp3');
        isError++;
        console.log(isError);
        // ожидание слова
      }
    }
  }

  handleStart() {
    console.log(this.allWords);
    // выбор 50 елементов из массива слов вынес на уровень выше так как выбрать нужно единожды
    // запускаем стартовую страницу с выборкой 5 первых слов
    const currentWords = this.allWords.splice(0, 5);
    const currentPlayed = currentWords[0];
    // Перетасовываем массив
    this.shuffle(currentWords);
    // Выбираем [последний]
    // Проигрываем звук
    this.playGameSound(`../../../assets/${currentPlayed.audio}`);
    // Вешаем обработчик на контейнер
    // Превращаем "старт" в "повтор" / Прячем "старт", показываем "повтор"
    // startButton.classList.toggle('purple-gradient');
    // startButton.classList.toggle('repeat');
    /* if (!gameMogeSwitch.checked) return; */
    this.setAudiocallWrapper(currentWords);
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

  // <div class="word"><span>1</span>Слово-1</div>
  // <div class="word"><span>2</span>Слово-2</div>
  // <div class="word"><span>3</span>Слово-3</div>
  // <div class="word"><span>4</span>Слово-4</div>
  // <div class="word" data-audiosrc="{word.audio}"><span>5</span>Слово-5</div>

  setAudiocallWord(currentWords) {
    console.log(currentWords);
    this.wordsWrapper.innerHTML = currentWords.map((word) => `<div class="word" data-audiosrc="../../../assets/${word.audio}"><span></span>${word.word}</div>`).join('');
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
