import wordCards from '../../wordCards';
import { usersAppState } from '../../../app';

// export let usersAppState = new State();

console.log(usersAppState);

export default class Audiocall {
  getAudiocallTemplate() {
    let audiocallTemplate = document.createElement('div');
    audiocallTemplate.innerHTML = `
    <div class="tab-wrapper audiocall">
      <div class="intro">
        <h1 class="intro__title">Аудиовызов</h1>
        <div class="word-wrapper">
          <div class="word"><span>1</span>Слово-1</div>
          <div class="word"><span>2</span>Слово-2</div>
          <div class="word"><span>3</span>Слово-3</div>
          <div class="word"><span>4</span>Слово-4</div>
          <div class="word" data-audiosrc="${word.audio}><span>5</span>Слово-5</div>
        </div>
        <button class="into__button answer">Не знаю</button>
      </div>
    </div>
    `;
    return audiocallTemplate.content;
  }
  winamp(e) {
    const playableTarget = e.target.closest('.flip-card');
    let volumeSlider = document.querySelector('#volume');
    if (playableTarget && !gameModeSwitch.checked) {
      let mp3 = new Audio(playableTarget.dataset.audiosrc);
      mp3.volume = volumeSlider.value / (volumeSlider.max - volumeSlider.min);
      mp3.play();
    }
  }

  playGameSound(url) {
    let volumeSlider = document.querySelector('#volume');
    const mp3 = new Audio(url);
    mp3.volume = (volumeSlider.value) / (volumeSlider.max);
    mp3.play();
  }

  handleStart() {
    // Выбираем массив соответствующий теме
    // Копируем в отдельную переменную
    const currentTheme = dataStorage[menu.querySelector(".active").dataset.order].slice();
    // Перетасовываем массив
    shuffledCurrentTheme = shuffle(currentTheme);
    // Выбираем [последний]
    currentObject = shuffledCurrentTheme.pop();
    // Проигрываем звук
    playGameSound(currentObject.audioSrc);
    // Вешаем обработчик на контейнер
    cardsContainer.onclick = (e) => {
      checkCorrectAnswer(e)
    };
    // Превращаем "старт" в "повтор" / Прячем "старт", показываем "повтор"
    startButton.classList.toggle('purple-gradient');
    startButton.classList.toggle('repeat');
    /* if (!gameMogeSwitch.checked) return; */
  }

  checkCorrectAnswer(e) {
    const playableTarget = e.target.closest('.word');
    var isError = 0;
    if (playableTarget && !playableTarget.classList.contains('already-guessed')) {
    // выяснить какого слова касается карточка
    // если слово совпало:
      if (playableTarget.dataset.word === currentObject.word) {
        // выключаем карточку
        playableTarget.classList.add('already-guessed');
        // добавляем звездочку
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
    // Выбираем массив соответствующий теме
    // Копируем в отдельную переменную
    const currentWords = usersAppState.getTrainingWords(5);
    // Перетасовываем массив
    // Выбираем [последний]
    let currentObject = currentWords.pop();
    // Проигрываем звук
    this.playGameSound(currentObject.audio);
    // Вешаем обработчик на контейнер
    cardsContainer.onclick = (e) => {
      this.checkCorrectAnswer(e);
    };
    // Превращаем "старт" в "повтор" / Прячем "старт", показываем "повтор"
    startButton.classList.toggle('purple-gradient');
    startButton.classList.toggle('repeat');
    /* if (!gameMogeSwitch.checked) return; */
  }

  startButton.onclick = () => {
    // Кликаем на кнопку только когда она "старт", а не "повтор"
    if (startButton.classList.contains('repeat')) this.playGameSound(currentObject.audioSrc);
    else handleStart();
  };

}
