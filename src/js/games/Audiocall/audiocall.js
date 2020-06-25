import State from './js/usersAppState';

export let usersAppState = new State();

console.log(usersAppState);

export default class Audiocall {
  winamp(e) {
    const playableTarget = e.target.closest('.flip-card');
    let volumeSlider = document.querySelector('#volume');
    if (playableTarget && !gameModeSwitch.checked) {
      let mp3 = new Audio(playableTarget.dataset.audiosrc);
      mp3.volume = volumeSlider.value / (volumeSlider.max - volumeSlider.min);
      mp3.play();
    }
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

  playGameSound(url) {
    let volumeSlider = document.querySelector('#volume');
    const mp3 = new Audio(url);
    mp3.volume = (volumeSlider.value) / (volumeSlider.max);
    mp3.play();
  }

  checkCorrectAnswer(e) {
    const playableTarget = e.target.closest('.flip-card');
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
            playGameSound('Assets/audio/success.mp3'); /* success */
          } else {
            cardsContainer.innerHTML = '<img src="Assets/img/failure.jpg" alt="failure">';
            playGameSound('Assets/audio/failure.mp3');
          }
          // возврат в экран выбора категорий и return
          // startButton.classList.add('purple-gradient');
          // startButton.classList.remove('repeat');
          setTimeout(() => {
            this.mainContentGenerator();
            this.menuOutlineGenerator(0);
            if (document.querySelector('.wrong') === null) sakuraPetals();
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
}
