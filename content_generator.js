document.addEventListener('DOMContentLoaded', () => {
  const dataStorage = [
    [
      {
        title: 'Action (set A)',
        image: 'Assets/img/dance.jpg'
      },
      {
        title: 'Action (set B)',
        image: 'Assets/img/swim.jpg'
      },
      {
        title: 'Action (set C)',
        image: 'Assets/img/drop.jpg'
      },
      {
        title: 'Animal (set A)',
        image: 'Assets/img/cat.jpg'
      },
      {
        title: 'Animal (set B)',
        image: 'Assets/img/bird.jpg'
      },
      {
        title: 'Adjective',
        image: 'Assets/img/friendly.jpg'
      },
      {
        title: 'Clothes',
        image: 'Assets/img/blouse.jpg'
      },
      {
        title: 'Emotions',
        image: 'Assets/img/dance.jpg'
      }
    ],
    [
      {
        word: 'cry',
        translation: 'плакать',
        image: 'Assets/img/cry.jpg',
        audioSrc: 'Assets/audio/cry.mp3'
      },
      {
        word: 'dance',
        translation: 'танцевать',
        image: 'Assets/img/dance.jpg',
        audioSrc: 'Assets/audio/dance.mp3'
      },
      {
        word: 'dive',
        translation: 'нырять',
        image: 'Assets/img/dive.jpg',
        audioSrc: 'Assets/audio/dive.mp3'
      },
      {
        word: 'draw',
        translation: 'рисовать',
        image: 'Assets/img/draw.jpg',
        audioSrc: 'Assets/audio/draw.mp3'
      },
      {
        word: 'fish',
        translation: 'ловить рыбу',
        image: 'Assets/img/fish.jpg',
        audioSrc: 'Assets/audio/fish.mp3'
      },
      {
        word: 'fly',
        translation: 'летать',
        image: 'Assets/img/fly.jpg',
        audioSrc: 'Assets/audio/fly.mp3'
      },
      {
        word: 'hug',
        translation: 'обнимать',
        image: 'Assets/img/hug.jpg',
        audioSrc: 'Assets/audio/hug.mp3'
      },
      {
        word: 'jump',
        translation: 'прыгать',
        image: 'Assets/img/jump.jpg',
        audioSrc: 'Assets/audio/jump.mp3'
      }
    ],
    [
      {
        word: 'open',
        translation: 'открывать',
        image: 'Assets/img/open.jpg',
        audioSrc: 'Assets/audio/open.mp3'
      },
      {
        word: 'play',
        translation: 'играть',
        image: 'Assets/img/play.jpg',
        audioSrc: 'Assets/audio/play.mp3'
      },
      {
        word: 'point',
        translation: 'указывать',
        image: 'Assets/img/point.jpg',
        audioSrc: 'Assets/audio/point.mp3'
      },
      {
        word: 'ride',
        translation: 'ездить',
        image: 'Assets/img/ride.jpg',
        audioSrc: 'Assets/audio/ride.mp3'
      },
      {
        word: 'run',
        translation: 'бегать',
        image: 'Assets/img/run.jpg',
        audioSrc: 'Assets/audio/run.mp3'
      },
      {
        word: 'sing',
        translation: 'петь',
        image: 'Assets/img/sing.jpg',
        audioSrc: 'Assets/audio/sing.mp3'
      },
      {
        word: 'skip',
        translation: 'пропускать, прыгать',
        image: 'Assets/img/skip.jpg',
        audioSrc: 'Assets/audio/skip.mp3'
      },
      {
        word: 'swim',
        translation: 'плавать',
        image: 'Assets/img/swim.jpg',
        audioSrc: 'Assets/audio/swim.mp3'
      }
    ],
    [
      {
        word: 'bend',
        translation: 'сгибать',
        image: 'Assets/img/bend.jpg',
        audioSrc: 'https://wooordhunt.ru/data/sound/word/us/mp3/bend.mp3'
      },
      {
        word: 'lift',
        translation: 'поднимать',
        image: 'Assets/img/lift.jpg',
        audioSrc: 'https://wooordhunt.ru/data/sound/word/us/mp3/lift.mp3'
      },
      {
        word: 'carry',
        translation: 'носить',
        image: 'Assets/img/carry.jpg',
        audioSrc: 'https://wooordhunt.ru/data/sound/word/us/mp3/carry.mp3'
      },
      {
        word: 'pick up',
        translation: 'подбирать',
        image: 'Assets/img/pick-up.jpg',
        audioSrc: 'https://wooordhunt.ru/data/sound/word/uk/mp3/pick-up.mp3'
      },
      {
        word: 'clap',
        translation: 'хлопать',
        image: 'Assets/img/clap.jpg',
        audioSrc: 'https://wooordhunt.ru/data/sound/word/us/mp3/clap.mp3'
      },
      {
        word: 'put down',
        translation: 'класть',
        image: 'Assets/img/put-down.jpg',
        audioSrc: 'https://wooordhunt.ru/data/sound/word/uk/mp3/put-down.mp3'
      },
      {
        word: 'drag',
        translation: 'тащить',
        image: 'Assets/img/drag.jpg',
        audioSrc: 'https://wooordhunt.ru/data/sound/word/uk/mp3/drag.mp3'
      },
      {
        word: 'listen',
        translation: 'слушать',
        image: 'Assets/img/listen.jpg',
        audioSrc: 'https://wooordhunt.ru/data/sound/word/us/mp3/listen.mp3'
      }
    ],
    [
      {
        word: 'cat',
        translation: 'кот',
        image: 'Assets/img/cat.jpg',
        audioSrc: 'Assets/audio/cat.mp3'
      },
      {
        word: 'chicken',
        translation: 'цыплёнок',
        image: 'Assets/img/chicken.jpg',
        audioSrc: 'Assets/audio/chicken.mp3'
      },
      {
        word: 'chick',
        translation: 'курица',
        image: 'Assets/img/chick.jpg',
        audioSrc: 'Assets/audio/chick.mp3'
      },
      {
        word: 'dog',
        translation: 'собака',
        image: 'Assets/img/dog.jpg',
        audioSrc: 'Assets/audio/dog.mp3'
      },
      {
        word: 'horse',
        translation: 'лошадь',
        image: 'Assets/img/horse.jpg',
        audioSrc: 'Assets/audio/horse.mp3'
      },
      {
        word: 'pig',
        translation: 'свинья',
        image: 'Assets/img/pig.jpg',
        audioSrc: 'Assets/audio/pig.mp3'
      },
      {
        word: 'rabbit',
        translation: 'кролик',
        image: 'Assets/img/rabbit.jpg',
        audioSrc: 'Assets/audio/rabbit.mp3'
      },
      {
        word: 'sheep',
        translation: 'овца',
        image: 'Assets/img/sheep.jpg',
        audioSrc: 'Assets/audio/sheep.mp3'
      }
    ],
    [
      {
        word: 'bird',
        translation: 'птица',
        image: 'Assets/img/bird.jpg',
        audioSrc: 'Assets/audio/bird.mp3'
      },
      {
        word: 'fish',
        translation: 'рыба',
        image: 'Assets/img/fish1.jpg',
        audioSrc: 'Assets/audio/fish.mp3'
      },
      {
        word: 'frog',
        translation: 'жаба',
        image: 'Assets/img/frog.jpg',
        audioSrc: 'Assets/audio/frog.mp3'
      },
      {
        word: 'giraffe',
        translation: 'жирафа',
        image: 'Assets/img/giraffe.jpg',
        audioSrc: 'Assets/audio/giraffe.mp3'
      },
      {
        word: 'lion',
        translation: 'лев',
        image: 'Assets/img/lion.jpg',
        audioSrc: 'Assets/audio/lion.mp3'
      },
      {
        word: 'mouse',
        translation: 'мышь',
        image: 'Assets/img/mouse.jpg',
        audioSrc: 'Assets/audio/mouse.mp3'
      },
      {
        word: 'turtle',
        translation: 'черепаха',
        image: 'Assets/img/turtle.jpg',
        audioSrc: 'Assets/audio/turtle.mp3'
      },
      {
        word: 'dolphin',
        translation: 'дельфин',
        image: 'Assets/img/dolphin.jpg',
        audioSrc: 'Assets/audio/dolphin.mp3'
      }
    ],
    [
      {
        word: 'interesting',
        translation: 'интересный',
        image: 'Assets/img/interesting.jpg',
        audioSrc: 'https://wooordhunt.ru/data/sound/word/us/mp3/interesting.mp3'
      },
      {
        word: 'good',
        translation: 'хороший',
        image: 'Assets/img/good.jpg',
        audioSrc: 'https://wooordhunt.ru/data/sound/word/us/mp3/good.mp3'
      },
      {
        word: 'old',
        translation: 'старый',
        image: 'Assets/img/old.jpg',
        audioSrc: 'https://wooordhunt.ru/data/sound/word/us/mp3/old.mp3'
      },
      {
        word: 'young',
        translation: 'молодой',
        image: 'Assets/img/young.jpg',
        audioSrc: 'https://wooordhunt.ru/data/sound/word/us/mp3/young.mp3'
      },
      {
        word: 'clever',
        translation: 'умный',
        image: 'Assets/img/clever.jpg',
        audioSrc: 'https://wooordhunt.ru/data/sound/word/us/mp3/clever.mp3'
      },
      {
        word: 'educated',
        translation: 'образованный',
        image: 'Assets/img/educated.jpg',
        audioSrc: 'https://wooordhunt.ru/data/sound/word/us/mp3/educated.mp3'
      },
      {
        word: 'mature',
        translation: 'зрелый',
        image: 'Assets/img/mature.jpg',
        audioSrc: 'https://wooordhunt.ru/data/sound/word/us/mp3/mature.mp3'
      },
      {
        word: 'beautiful',
        translation: 'прекрасный, красивый',
        image: 'Assets/img/beautiful.jpg',
        audioSrc: 'https://wooordhunt.ru/data/sound/word/us/mp3/beautiful.mp3'
      }
    ],
    [
      {
        word: 'skirt',
        translation: 'юбка',
        image: 'Assets/img/skirt.jpg',
        audioSrc: 'Assets/audio/skirt.mp3'
      },
      {
        word: 'pants',
        translation: 'брюки',
        image: 'Assets/img/pants.jpg',
        audioSrc: 'Assets/audio/pants.mp3'
      },
      {
        word: 'blouse',
        translation: 'блузка',
        image: 'Assets/img/blouse.jpg',
        audioSrc: 'Assets/audio/blouse.mp3'
      },
      {
        word: 'dress',
        translation: 'платье',
        image: 'Assets/img/dress.jpg',
        audioSrc: 'Assets/audio/dress.mp3'
      },
      {
        word: 'boot',
        translation: 'ботинок',
        image: 'Assets/img/boot.jpg',
        audioSrc: 'Assets/audio/boot.mp3'
      },
      {
        word: 'shirt',
        translation: 'рубашка',
        image: 'Assets/img/shirt.jpg',
        audioSrc: 'Assets/audio/shirt.mp3'
      },
      {
        word: 'coat',
        translation: 'пальто',
        image: 'Assets/img/coat.jpg',
        audioSrc: 'Assets/audio/coat.mp3'
      },
      {
        word: 'shoe',
        translation: 'туфли',
        image: 'Assets/img/shoe.jpg',
        audioSrc: 'Assets/audio/shoe.mp3'
      }
    ],
    [
      {
        word: 'sad',
        translation: 'грустный',
        image: 'Assets/img/sad.jpg',
        audioSrc: 'Assets/audio/sad.mp3'
      },
      {
        word: 'angry',
        translation: 'сердитый',
        image: 'Assets/img/angry.jpg',
        audioSrc: 'Assets/audio/angry.mp3'
      },
      {
        word: 'happy',
        translation: 'счастливый',
        image: 'Assets/img/happy.jpg',
        audioSrc: 'Assets/audio/happy.mp3'
      },
      {
        word: 'tired',
        translation: 'уставший',
        image: 'Assets/img/tired.jpg',
        audioSrc: 'Assets/audio/tired.mp3'
      },
      {
        word: 'surprised',
        translation: 'удивлённый',
        image: 'Assets/img/surprised.jpg',
        audioSrc: 'Assets/audio/surprised.mp3'
      },
      {
        word: 'scared',
        translation: 'испуганный',
        image: 'Assets/img/scared.jpg',
        audioSrc: 'Assets/audio/scared.mp3'
      },
      {
        word: 'smile',
        translation: 'улыбка',
        image: 'Assets/img/smile.jpg',
        audioSrc: 'Assets/audio/smile.mp3'
      },
      {
        word: 'laugh',
        translation: 'смех',
        image: 'Assets/img/laugh.jpg',
        audioSrc: 'Assets/audio/laugh.mp3'
      }
    ]
  ];

  const cardsContainer = document.querySelector('body > div > div.wrapper.d-flex.flex-wrap.justify-content-center');
  const menu = document.querySelector('body > div > ul');
  const menuToggler = document.querySelector('body > div > header > div.menu-toggler > input[type=checkbox]');
  const menuTogglerTriggers = document.querySelectorAll('[data-menuswitch]');
  const gameModeSwitch = document.querySelector('#toggler');
  const gameGradient = 'game-mode';
  const startButton = document.querySelector('.start-button');
  const ratingContainer = document.querySelector('div.rating');
  let gameMode; let shuffledCurrentTheme; let
    currentObject;

  mainContentGenerator = () => {
    let gradient = 'blue-gradient';
    if (gameModeSwitch.checked) gradient = gameGradient;
    startButton.classList.remove('shown');
    cardsContainer.innerHTML = dataStorage[0].map((item, index) => `<a href="#" class="card testimonial-card m-4" data-order="${index + 1}">
      <!-- Background color -->
      <div class="card-up ${gradient}"></div>
      <!-- Avatar --> 
      <div class="avatar mx-auto white">
        <img src="${item.image}" class="rounded-circle" alt="${item.title}">
      </div>
      <!-- Content -->
      <div class="card-body">
        <!-- Name -->
        <h4 class="card-title text-center mt-5">${item.title}</h4>
      </div>
    </a>`).join('');
  };

  pageContentGenerator = (pageNumber) => {
    if (gameModeSwitch.checked) {
      startButton.classList.add('shown');
      gameMode = 'game-mode';
    } else {
      gameMode = '';
    }
    cardsContainer.innerHTML = dataStorage[pageNumber].map(item => `<div class="flip-card m-4" data-word="${item.word}" data-audiosrc="${item.audioSrc}">
      <div class="card flip-card-inner">
        <div class="flip-card-front">
          <!-- Card image -->
          <div class="view overlay d-flex justify-content-center">
            <img class="card-img-top ${gameMode}" src="${item.image}" alt="${item.title}">
            <a href="#!">
              <div class="mask rgba-white-slight waves-effect waves-light"></div>
            </a>
          </div>
          <!-- Card content -->
          <div class="card-body ${gameMode}">
            <!-- Title -->
            <h4 class="card-title text-center">${item.word}</h4>
            <!-- rotation icon -->
            <div class="rotate-icon"></div>
          </div>
        </div>
        <div class="flip-card-back">
          <!-- Card image -->
          <div class="view overlay d-flex justify-content-center">
            <img class="card-img-top ${gameMode}" src="${item.image}" alt="${item.word}">
            <a href="#!">
              <div class="mask rgba-white-slight waves-effect waves-light"></div>
            </a>
          </div>
          <!-- Card content -->
          <div class="card-body ${gameMode}">
            <!-- Title -->
            <h4 class="card-title text-center">${item.translation}</h4>
          </div>
        </div>
      </div>
    </div>`).join('');
  };

  function statsGenerator() {
    const statStorage = dataStorage.slice(1).flat().map(element => element = {
      word: element.word, translation: element.translation, clickCount: 0, guessedCount: 0, missedCount: 0
    });
    console.log(statStorage);
    const tableContainer = document.createElement('table');
    tableContainer.innerHTML = statStorage.map((object, index) => `
      <tr class="tr">
        <td class="td">${dataStorage[0][Math.floor(index / 8)].title}</td>
        <td class="td">${object.word}</td>
        <td class="td">${object.translation}</td>
        <td class="td">${object.clickCount}</td>
        <td class="td">${object.guessedCount}</td>
        <td class="td">${object.missedCount}</td>
      </tr>`).join('');
    tableContainer.insertAdjacentHTML('beforeend', tableContainer);
    cardsContainer.appendChild(tableContainer);
  }
  statsGenerator();

  function menuSelector(e) {
    const targetWithDataOrder = e.target.closest('[data-order]');
    if (e.target.dataset.order == 0) {
      mainContentGenerator();
      menuOutlineGenerator(0);
    } else if (targetWithDataOrder) {
      pageContentGenerator(targetWithDataOrder.dataset.order);
      menuOutlineGenerator(targetWithDataOrder.dataset.order);
    }
  }

  function menuOutlineGenerator(order) {
    menu.querySelectorAll('li > a').forEach(a => a.classList.remove('active'));
    menu.querySelector(`li > a[data-order='${order}']`).classList.add('active');
  }

  function rotateIcons(e) {
    const rotatedTarget = e.target.closest('.flip-card');
    if (e.target.closest('.rotate-icon')) {
      rotatedTarget.classList.add('rotate');
      rotatedTarget.onmouseleave = () => rotatedTarget.classList.remove('rotate');
    }
  }

  function winamp(e) {
    const playableTarget = e.target.closest('.flip-card');
    let volumeSlider = document.querySelector('#volume');
    if (playableTarget && !gameModeSwitch.checked) {
      let mp3 = new Audio(playableTarget.dataset.audiosrc);
      mp3.volume = volumeSlider.value / (volumeSlider.max - volumeSlider.min);
      mp3.play();
    }
  }

  function playGameSound(url) {
    let volumeSlider = document.querySelector('#volume');
    const mp3 = new Audio(url);
    mp3.volume = (volumeSlider.value) / (volumeSlider.max);
    mp3.play();
  }

  function shuffle(array) {
    let m = array.length; let
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      [array[m], array[i]] = [array[i], array[m]];
    }
    return array;
  }

  gameModeSwitch.onchange = () => {
    const findDataOrder = menu.querySelector('.active').dataset.order;
    if (findDataOrder == 0) mainContentGenerator();
    else pageContentGenerator(findDataOrder);
    if (gameModeSwitch.checked) {
      menu.classList.add(gameGradient);
      if (findDataOrder != 0) startButton.classList.add('shown');
      // document.querySelectorAll('.card-img-top').forEach(el => {el.classList.add('game-mode') });
    } else {
      menu.classList.remove(gameGradient);
      startButton.classList.remove('shown');
      // document.querySelectorAll('.card-img-top').forEach(el => {el.classList.remove('game-mode') });
      // startButton.classList.add('purple-gradient');
      // startButton.classList.remove('repeat');
      nonGameMode();
    }
  };

  function nonGameMode() {
    cardsContainer.onclick = (e) => {
      winamp(e);
      menuSelector(e);
      rotateIcons(e);
      if (document.querySelector('.petals') != null) document.querySelector('.petals').remove();
    };
    ratingContainer.innerHTML = '';
    startButton.classList.add('purple-gradient');
    startButton.classList.remove('repeat');
  }

  function handleStart() {
    // Выбираем массив соответствующий теме
    // Копируем в отдельную переменную
    const currentTheme = dataStorage[menu.querySelector('.active').dataset.order].slice();
    // Перетасовываем массив
    shuffledCurrentTheme = shuffle(currentTheme);
    // Выбираем [последний]
    currentObject = shuffledCurrentTheme.pop();
    // Проигрываем звук
    playGameSound(currentObject.audioSrc);
    // Вешаем обработчик на контейнер
    cardsContainer.onclick = (e) => {
      checkCorrectAnswer(e);
    };
    // Превращаем "старт" в "повтор" / Прячем "старт", показываем "повтор"
    startButton.classList.toggle('purple-gradient');
    startButton.classList.toggle('repeat');
    /* if (!gameMogeSwitch.checked) return; */
  }

  startButton.onclick = () => {
    // Кликаем на кнопку только когда она "старт", а не "повтор"
    if (startButton.classList.contains('repeat')) playGameSound(currentObject.audioSrc);
    else handleStart();
  };

  function checkCorrectAnswer(e) {
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
          setTimeout(function () {
            mainContentGenerator();
            menuOutlineGenerator(0);
            if (document.querySelector('.wrong') === null) sakuraPetals();
            nonGameMode();
          }, 2500);
          return;
        }
        // проигрываем звук победы
        playGameSound('Assets/audio/correct.mp3');
        // берем следующее слово
        // Проигрываем следуюций звук
        // (Взято из handleStart)
        currentObject = shuffledCurrentTheme.pop();
        setTimeout(function () {
          playGameSound(currentObject.audioSrc);
        }, 900);
      }
      // если слово НЕ совпало:
      else {
        // добавляем пустую звездочку
        ratingContainer.insertAdjacentHTML('beforeEnd', '<div class="wrong"></div>');
        // проигрываем звук поражения
        playGameSound('Assets/audio/error.mp3');
        isError++;
        console.log(isError);
        // ожидание слова
      }
    }
  }

  // mainContentGenerator();

  menu.onmouseleave = () => {
    menu.dataset.menuswitch = 'hidden';
    menuToggler.checked = false;
  };

  menu.onclick = (e) => {
    startButton.classList.add('purple-gradient');
    startButton.classList.remove('repeat');
    menuSelector(e);
    nonGameMode();
  };

  menuToggler.onclick = () => {
    if (document.querySelectorAll('[data-menuswitch="hidden"]').length === 0) {
      menuTogglerTriggers.forEach(toggler => {
        toggler.dataset.menuswitch = 'hidden';
      });
    } else {
      menuTogglerTriggers.forEach(toggler => {
        toggler.dataset.menuswitch = '';
      });
    }
  };
  // nonGameMode ();

  /*  ============================================== Volume bar ===================================================== */

  var s = document.createElement('style');
  var r = document.querySelector('#volume');
  var prefs = ['webkit-slider-runnable', 'moz-range'];

  document.body.appendChild(s);

  var getTrackStyleStr = function (el, val) {
    var str = ''; var
      len = prefs.length;

    for (var i = 0; i < len; i++) {
      str += '.js input[type=range]::-' + prefs[i]
        + '-track{background-size:' + val + '}';
    }

    return str;
  };

  var getValStr = function (el, p) {
    var min = el.min || 0;
    var p = p || el.value;
    var perc = (el.max) ? ~~(100 * (p - min) / (el.max - min)) : p;
    var val = perc + '% 100%,100% 100%,100% 100%';

    return val;
  };

  r.addEventListener('input', function () {
    s.textContent = getTrackStyleStr(this, getValStr(this));
  }, false);

  /*  =================================================Sakura Petals =================================================== */

  function sakuraPetals() {
    var Petal = /** @class */(function () {
      class Petal {
        constructor(config) {
          this.customClass = config.customClass || '';
          this.x = config.x || 0;
          this.y = config.y || 0;
          this.z = config.z || 0;
          this.xSpeedVariation = config.xSpeedVariation || 0;
          this.ySpeed = config.ySpeed || 0;
          this.rotation = {
            axis: 'X',
            value: 0,
            speed: 0,
            x: 0
          };
          if (config.rotation && typeof config.rotation === 'object') {
            this.rotation.axis = config.rotation.axis || this.rotation.axis;
            this.rotation.value = config.rotation.value || this.rotation.value;
            this.rotation.speed = config.rotation.speed || this.rotation.speed;
            this.rotation.x = config.rotation.x || this.rotation.x;
          }
          this.el = document.createElement('div');
          this.el.className = 'petal  ' + this.customClass;
          this.el.style.position = 'absolute';
          this.el.style.backfaceVisibility = 'visible';
        }
      }
      return Petal;
    }());
    var BlossomScene = /** @class */(function () {
      class BlossomScene {
        constructor(config) {
          var container = document.querySelector(config.id);
          if (container === null) {
            throw new Error('[id] provided was not found in document');
          }
          this.container = container;
          this.placeholder = document.createElement('div');
          this.petals = [];
          this.numPetals = config.numPetals || 300;
          this.petalsTypes = config.petalsTypes;
          this.gravity = config.gravity || 0.8;
          this.windMaxSpeed = config.windMaxSpeed || 4;
          this.windMagnitude = 0.2;
          this.windDuration = 0;
          this.width = this.container.offsetWidth;
          this.height = this.container.offsetHeight;
          this.timer = 0;
          this.container.style.overflow = 'hidden';
          this.placeholder.style.transformStyle = 'preserve-3d';
          this.placeholder.classList = 'petals';
          this.placeholder.style.position = 'fixed';
          this.placeholder.style.width = this.container.offsetWidth + 'px';
          this.placeholder.style.height = this.container.offsetHeight + 'px';
          this.container.appendChild(this.placeholder);
          this.createPetals();
          requestAnimationFrame(this.updateFrame.bind(this));
        }

        /**
             * Reset the petal position when it goes out of container
             */
        resetPetal(petal) {
          petal.x = this.width * 2 - Math.random() * this.width * 1.75;
          petal.y = petal.el.offsetHeight * -1;
          petal.z = Math.random() * 200;
          if (petal.x > this.width) {
            petal.x = this.width + petal.el.offsetWidth;
            petal.y = Math.random() * this.height / 2;
          }
          // Rotation
          petal.rotation.speed = Math.random() * 10;
          var randomAxis = Math.random();
          if (randomAxis > 0.5) {
            petal.rotation.axis = 'X';
          } else if (randomAxis > 0.25) {
            petal.rotation.axis = 'Y';
            petal.rotation.x = Math.random() * 180 + 90;
          } else {
            petal.rotation.axis = 'Z';
            petal.rotation.x = Math.random() * 360 - 180;
            // looks weird if the rotation is too fast around this axis
            petal.rotation.speed = Math.random() * 3;
          }
          // random speed
          petal.xSpeedVariation = Math.random() * 0.8 - 0.4;
          petal.ySpeed = Math.random() + this.gravity;
          return petal;
        }

        /**
              * Calculate wind speed
              */
        calculateWindSpeed(t, y) {
          var a = this.windMagnitude / 2 * (this.height - 2 * y / 3) / this.height;
          return a * Math.sin(2 * Math.PI / this.windDuration * t + 3 * Math.PI / 2) + a;
        }

        /**
              * Update petal position
              */
        updatePetal(petal) {
          var petalWindSpeed = this.calculateWindSpeed(this.timer, petal.y);
          var xSpeed = petalWindSpeed + petal.xSpeedVariation;
          petal.x -= xSpeed;
          petal.y += petal.ySpeed;
          petal.rotation.value += petal.rotation.speed;
          var t = 'translateX( '
            + petal.x
            + 'px ) translateY( '
            + petal.y
            + 'px ) translateZ( '
            + petal.z
            + 'px )  rotate'
            + petal.rotation.axis
            + '( '
            + petal.rotation.value
            + 'deg )';
          if (petal.rotation.axis !== 'X') {
            t += ' rotateX(' + petal.rotation.x + 'deg)';
          }
          petal.el.style.transform = t;
          // reset if out of view
          if (petal.x < -10 || petal.y > this.height + 10) {
            this.resetPetal(petal);
          }
        }

        /**
              * Change the wind speed
              */
        updateWind() {
          // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration
          this.windMagnitude = Math.random() * this.windMaxSpeed;
          this.windDuration = this.windMagnitude * 50 + (Math.random() * 20 - 10);
        }

        /**
              * Create the petals elements
              */
        createPetals() {
          for (var i = 0; i < this.numPetals; i++) {
            var tmpPetalType = this.petalsTypes[Math.floor(Math.random() * (this.petalsTypes.length - 1))];
            var tmpPetal = new Petal({ customClass: tmpPetalType.customClass });
            this.resetPetal(tmpPetal);
            this.petals.push(tmpPetal);
            this.placeholder.appendChild(tmpPetal.el);
          }
        }

        /**
              * Update the animation frame
              */
        updateFrame() {
          if (this.timer === this.windDuration) {
            this.updateWind();
            this.timer = 0;
          }
          var petalsLen = this.petals.length;
          for (var i = 0; i < petalsLen; i++) {
            this.updatePetal(this.petals[i]);
          }
          this.timer++;
          requestAnimationFrame(this.updateFrame.bind(this));
        }
      }
      return BlossomScene;
    }());
    var petalsTypes = [
      new Petal({ customClass: 'petal-style1' }),
      new Petal({ customClass: 'petal-style2' }),
      new Petal({ customClass: 'petal-style3' }),
      new Petal({ customClass: 'petal-style4' })];

    var myBlossomSceneConfig = {
      id: '#blossom_container',
      petalsTypes: petalsTypes
    };

    var myBlossomScene = new BlossomScene(myBlossomSceneConfig);
  }
});
