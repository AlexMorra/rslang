import wordCards from '../../wordCards';
import { usersAppState } from '../../../app';
import * as utils from '../../utils';

export default class SkinWalkerStartGame {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.usWords = usersAppState.learningWords;
    this.wordListDictionary = [];
    this.wordAllListDictionary = [];
    this.wordListMixDictionary = [];
    this.choiseWords = null;
    this.difficult = null;
    this.difficultLevel = null;
    this.userWodLevelChoise = null;
    this.sortDictionary = [];
  }

  show() {
    utils.destroy();
    this.getStart();
  }

  getStart() {
    const start = `
    <div class="tab-wrapper skimwalker">
      <div class="skinwalker__start">
        <div class="skinwalker__start__intro">
          <h1 class="skinwalker__start__intro__title">Найди пару</h1>
          <p class="skinwalker__start__intro__description">Игра "Найди пару" развивает словарный запас и тренирует память.</br>
            Чем больше слов ты знаешь, тем больше очков опыта получишь.</p>
          <button class="skinwalker__start__into__button">Начать</button>
        </div>
      </div>
    </div>
    `;
    setTimeout(() => {
      this.mainArea.innerHTML = start;
      const button = document.querySelector('.skinwalker__start__into__button');
      button.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
          this.startClickHandler();
        }
      });
    }, 400);
  }

  startClickHandler() {
    const wrapper = document.querySelector('.skinwalker__start');
    wrapper.classList.add('destroy');
    setTimeout(() => this.mainArea.innerHTML = '', 400);
    setTimeout(() => {
      this.getButtonsListTemplate();
      this.getWordListDictionary();
      this.getAllWordListDictionary();
    }, 400);
  }

  getWordListDictionary() {
    this.usWords.forEach(obj => {
      const word = wordCards[obj.difficulty].find(item => item.id === obj.wordId);
      this.wordListDictionary.push({
        id: word.id,
        audioSrc: word.audio,
        word: word.word,
        translate: word.wordTranslate,
        isLearned: false,
        transcription: word.transcription,
        targetIdCountClick: 0,
        group: word.group
      });
    });
  }

  getAllWordListDictionary() {
    wordCards[1].forEach(word => {
      this.wordAllListDictionary.push({
        id: word.id,
        audioSrc: word.audio,
        word: word.word,
        translate: word.wordTranslate,
        isLearned: false,
        transcription: word.transcription,
        targetIdCountClick: 0,
        group: word.group
      });
    });
  }

  getMixWordListDictionary() {
    this.wordListDictionary.sort(() => Math.random() - 0.5);
    this.wordAllListDictionary.sort(() => Math.random() - 0.5);
    const halfWordListDictionary = this.wordListDictionary.slice(0, this.difficultLevel / 2);
    const halfWordAllListDictionary = this.wordAllListDictionary.slice(0, this.difficultLevel / 2);
    this.wordListMixDictionary = halfWordListDictionary.concat(halfWordAllListDictionary);
  }

  getWordTemplate(word) {
    const template = document.createElement('template');
    template.innerHTML = `
      <li class="skinwalker__word" data-id="${word.id}" data-audio="./assets/${word.audioSrc}">
        <p class="skinwalker__word__title-front">
          <img class="skinwalker__shirt" src="./assets/icons/shirtword.png">
        </p>
        <p class="skinwalker__word__title-back">${word.word}</p>
      </li>
      <li class="skinwalker__word" data-id="${word.id}" data-audio="./assets/${word.audioSrc}">
        <p class="skinwalker__word__title-front">
          <img class="skinwalker__shirt" src="./assets/icons/shirtword.png">
        </p>
        <p class="skinwalker__word__title-back">${word.translate}</p>
      </li>`;
    return template.content;
  }

  getRepeatWordTemplate(word) {
    const template = document.createElement('template');
    template.innerHTML = `
    <li class="skinwalker__word" data-id="${word.id}" data-audio="./assets/${word.audioSrc}">
      <p class="skinwalker__word__repeat">${word.word}</p>
    </li>
    <li class="skinwalker__word" data-id="${word.id}">
      <p class="skinwalker__word__repeat">${word.translate}</p>
    </li>
    `;
    return template.content;
  }

  getRepeatGamesTemplate() {
    this.wordWrapper = document.querySelector('.skinwalker__word__list');

    const fragment = document.createDocumentFragment();

    this.sortDictionary.forEach((word) => {
      fragment.append(this.getRepeatWordTemplate(word));
    });

    this.wordWrapper.append(fragment);
    const allWord = this.wordWrapper.querySelectorAll('li');
    this.wordWrapper.innerHTML = '';
    const sortAllWord = Array.from(allWord);
    sortAllWord.sort(() => Math.random() - 0.5);
    sortAllWord.forEach((li) => {
      this.wordWrapper.innerHTML += `${li.outerHTML}`;
    });
  }

  getGamesTemplate() {
    this.wordWrapper = document.querySelector('.skinwalker__word__list');

    const fragment = document.createDocumentFragment();

    this.sortDictionary.forEach((word) => {
      fragment.append(this.getWordTemplate(word));
    });

    this.wordWrapper.append(fragment);
    const allWord = this.wordWrapper.querySelectorAll('li');
    this.wordWrapper.innerHTML = '';
    const sortAllWord = Array.from(allWord);
    sortAllWord.sort(() => Math.random() - 0.5);
    sortAllWord.forEach((li) => {
      this.wordWrapper.innerHTML += `${li.outerHTML}`;
    });
  }

  getUserWordDictionary() {
    this.wordListDictionary.sort(() => Math.random() - 0.5);
    this.sortDictionary = this.wordListDictionary.slice(0, this.difficultLevel);
    this.sortDictionary.forEach(word => {
      this.uploadLerningWords(word.id, word.group);
    });
    return this.getGamesTemplate();
  }

  getAllRandomDictionary() {
    this.wordAllListDictionary.sort(() => Math.random() - 0.5);
    this.sortDictionary = this.wordAllListDictionary.slice(0, this.difficultLevel);
    this.sortDictionary.forEach(word => {
      this.uploadLerningWords(word.id, word.group);
    });
    return this.getGamesTemplate();
  }

  getMixWordDictionary() {
    this.sortDictionary = this.wordListMixDictionary;
    this.sortDictionary.forEach(word => {
      this.uploadLerningWords(word.id, word.group);
    });
    return this.getGamesTemplate();
  }

  uploadLerningWords(id, group) {
    const words = [...usersAppState.learningWords, ...usersAppState.difficultWords];
    const exists = words.some(word => word.wordId === id);
    if (!exists) {
      usersAppState.createUserWord(id, group + 1)
        .then(response => usersAppState.learningWords.push(response));
    }
  }

  getButtonsListTemplate() {
    const buttonsBlock = `
      <div class="tab-wrapper">
        <div class="games__skinwalkers__start">
          <div class="skinwalker__settings__window">
            <div class="skinwalker__title">
              <p>Сейчас в Вашем словаре ${this.usWords.length} слов</p>
              <p class="skinwalker__title__choise__level"></p>
            </div>
            <p class="skinwalker__buttons__description">Выберите условия для начала игры:</p>
            <div class="skinwalker__checkbox">
              <div class="skinwalker__checkbox_description" data-level="Лёгкий">Лёгкий уровень сложности <br> (10 пар слов)</div>
              <div class="skinwalker__checkbox_description" data-level="Средний">Средний уровень сложности <br> (16 пар слов)</div>
              <div class="skinwalker__checkbox_description" data-level="Тяжёлый">Тяжёлый уровень сложности <br> (20 пар слов)</div>
              <button class="skinwalker__choise-difficult">Продолжить</button>
            </div>
          </div>
        </div>
      </div>
    `;
    setTimeout(() => {
      this.mainArea.innerHTML = buttonsBlock;
      const skinwalkerHandlerLevelCheck = document.querySelector('.skinwalker__checkbox');
      this.checkLevelButton(skinwalkerHandlerLevelCheck);
    }, 400);
  }

  checkLevelButton(skinwalkerHandlerLevelCheck) {
    skinwalkerHandlerLevelCheck.addEventListener(('click'), (event) => {
      const target = event.target;
      if (target.classList.contains('skinwalker__checkbox_description')) {
        skinwalkerHandlerLevelCheck.querySelectorAll('.skinwalker__checkbox_description').forEach(button => {
          button.classList.remove('skinwalker__checkbox_active');
          target.classList.add('skinwalker__checkbox_active');
          const choiceActiveDifficult = document.querySelector('.skinwalker__checkbox_active');
          this.difficult = choiceActiveDifficult.dataset.level;
          if (this.difficult === 'Лёгкий') {
            this.difficultLevel = 10;
          }
          if (this.difficult === 'Средний') {
            this.difficultLevel = 16;
          }
          if (this.difficult === 'Тяжёлый') {
            this.difficultLevel = 20;
          }
          const nextChoice = document.querySelector('.skinwalker__choise-difficult');
          nextChoice.classList.add('skinwalker-opacity');
          nextChoice.addEventListener(('click'), () => {
            this.buttonsAddChecked();
          });
        });
      }
    });
  }

  getNextChoice() {
    const blockTitle = document.querySelector('.skinwalker__title__choise__level');
    const blockChoice = `Уровень сложности: ${this.difficult}`;
    blockTitle.textContent = blockChoice;
  }

  buttonsAddChecked() {
    const buttonsBlockGame = `
    <div class="tab-wrapper">
        <div class="games__skinwalkers__start">
          <p class="skinwalker__start__description"></p>
          <div class="skinwalker__settings__window">
            <div class="skinwalker__title">
              <p>Сейчас в Вашем словаре ${this.usWords.length} слов</p>
              <p class="skinwalker__title__choise__level"></p>
            </div>
            <p class="skinwalker__buttons__description">Выберите условия для начала игры:</p>
            <div class="skinwalker__buttons__block">
              <div class="skinwalker__buttons__block_checked" data-words="random">
                Выбрать случайные слова для изучения.
              </div>
              <div class="skinwalker__buttons__block_checked" data-words="mywords">
                Выбрать произвольные слова из добавленных в словарь для изучения.
              </div>
              <div class="skinwalker__buttons__block_checked" data-words="mix">
                Выбрать произвольные слова из словаря и случайные для изучения.
              </div>
              <div class="skinwalker__game__buttons__choise">
                <button class="skinwalker__game__start-button-prev">Назад</button>
                <button class="skinwalker__game__start-button-go skinwalker-events">Старт</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    setTimeout(() => {
      this.mainArea.innerHTML = buttonsBlockGame;
      this.getNextChoice();
      const skinwalkerBlockChoise = document.querySelector('.skinwalker__buttons__block');
      this.getChoiseToStartGame(skinwalkerBlockChoise);
    }, 400);
  }

  getChoiseToStartGame(skinwalkerBlockChoise) {
    if (this.usWords.length < this.difficultLevel) {
      document.querySelector('.skinwalker__buttons__block_checked[data-words="mywords"]').classList.add('skinwalker-events');
    }
    if (this.usWords.length < (this.difficultLevel / 2)) {
      document.querySelector('.skinwalker__buttons__block_checked[data-words="mix"]').classList.add('skinwalker-events');
    }
    skinwalkerBlockChoise.addEventListener(('click'), (event) => {
      const target = event.target;
      const descriptionChoise = this.mainArea.querySelector('.skinwalker__start__description');
      if (target.classList.contains('skinwalker__buttons__block_checked')) {
        skinwalkerBlockChoise.querySelectorAll('.skinwalker__buttons__block_checked').forEach(button => {
          button.classList.remove('skinwalker__checkbox_active');
          if (target.classList.contains('skinwalker__buttons__block_checked')) {
            target.classList.add('skinwalker__checkbox_active');
            const choiceActiveWordSelect = document.querySelector('.skinwalker__checkbox_active');
            this.choiseWords = choiceActiveWordSelect.dataset.words;
            if (this.choiseWords === 'random') {
              descriptionChoise.textContent = 'Для игры будут подобраны случайные слова, которые добавятся в словарь для изучения!';
            }
            if (this.choiseWords === 'mywords') {
              descriptionChoise.textContent = 'В игре будут учавствовать только те слова, которые добавлены в словарь для изучения!';
            }
            if (this.choiseWords === 'mix') {
              descriptionChoise.textContent = 'В игре будет часть слов из добавленных в словарь для изучения, и часть случайно подобранных, которые добавятся в словарь для изучения!';
            }
          }
        });
        this.getSecondChoise();
      }
      if (target.classList.contains('skinwalker__game__start-button-prev')) {
        this.getButtonsListTemplate();
      }
    });
  }

  getSecondChoise() {
    const secondChoice = document.querySelector('.skinwalker__game__start-button-go');
    secondChoice.classList.remove('skinwalker-events');
    secondChoice.classList.add('skinwalker-opacity');
    secondChoice.addEventListener(('click'), () => {
      setTimeout(() => {
        this.skinWalkerHandler();
      }, 400);
    });
  }

  greenCardCount(countAll) {
    const green = this.mainArea.querySelectorAll('.skinwalker_green');
    const gameCount = this.mainArea.querySelector('.skinwalker__game__count');
    const finishButtons = this.mainArea.querySelector('.skinwalker__finish__buttons');

    if (green.length === this.difficultLevel * 2) {
      finishButtons.classList.remove('skinwalker__none-opacity');
      finishButtons.classList.add('skinwalker-opacity');
      gameCount.classList.remove('skinwalker__none-opacity');
      gameCount.classList.add('skinwalker-opacity');
      gameCount.textContent = `Всего попыток понадобилось: ${countAll}`;
      finishButtons.addEventListener(('click'), (event) => {
        const target = event.target;
        if (target.classList.contains('skinwalker__finish__repeat')) {
          this.getButtonsListTemplate();
        }
        if (target.classList.contains('skinwalker__finish__end')) {
          this.skinWalkerRepeatHandler();
        }
      });
    }
  }

  greenRepeatCardCount() {
    const green = this.mainArea.querySelectorAll('.skinwalker_green');

    if (green.length === this.difficultLevel * 2) {
      utils.getStatistic(this.sortDictionary);
    }
  }

  skinWalkerHandler() {
    let countAll = 0;
    const skinwalkerBegin = `
      <div class="tab-wrapper skinwalker__game">
        <div class="skinwalker__game__zone">
          <div class="skinwalker__button__game__zone">
            <button class="skinwalker__sound-button"></button>
          </div>
          <div class="skinwalker__game__count skinwalker__none-opacity"></div>
          <ul class="skinwalker__word__list"></ul>
          <div class="skinwalker__finish__buttons skinwalker__none-opacity">
            <button class="skinwalker__finish__repeat">Попробовать ещё раз</button>
            <button class="skinwalker__finish__end">Закрепить знания</button>
          </div>
        </div>
      </div>
    `;

    this.mainArea.innerHTML = skinwalkerBegin;
    this.checkToSound();

    let countClick = 0;
    let targetIdFirst = '';
    const gameZone = document.querySelector('.skinwalker__word__list');
    if (this.choiseWords === 'random') {
      this.getAllRandomDictionary();
    }
    if (this.choiseWords === 'mywords') {
      this.getUserWordDictionary();
    }
    if (this.choiseWords === 'mix') {
      this.getMixWordListDictionary();
      this.getMixWordDictionary();
    }

    gameZone.addEventListener(('click'), (event) => {
      let target = event.target;
      if (target.tagName === 'LI' && !target.classList.contains('skinwalker_rotate')) {
        countAll += 1;
        if (usersAppState.appSound) {
          this.checkToSound();
          const audio = new Audio();
          audio.src = target.dataset.audio;
          audio.play();
        }

        if (target.tagName === 'LI' && countClick < 1) {
          target.classList.add('skinwalker_rotate');
          countClick += 1;
          targetIdFirst = target.dataset.id;
        } else if (target.tagName === 'LI' && countClick === 1) {
          target.classList.add('skinwalker_rotate');
          if (targetIdFirst === target.dataset.id) {
            document.querySelectorAll('.skinwalker_rotate').forEach((li) => {
              setTimeout(() => {
                li.classList.add('skinwalker_green');
                this.greenCardCount(countAll);
              }, 300);
            });
          } else {
            document.querySelectorAll('.skinwalker_rotate').forEach((li) => {
              if (!li.classList.contains('skinwalker_green')) {
                setTimeout(() => {
                  li.classList.remove('skinwalker_rotate');
                }, 600);
              }
            });
          }
          countClick = 0;
        }
      }
    });
  }

  checkToSound() {
    const soundButton = this.mainArea.querySelector('.skinwalker__sound-button');
    soundButton.style.opacity = 0.3;
    if (usersAppState.appSound) {
      soundButton.style.opacity = 1;
    }
    document.addEventListener('change', () => {
      soundButton.style.opacity = 0.3;
      if (usersAppState.appSound) {
        soundButton.style.opacity = 1;
      }
    });
  }

  skinWalkerRepeatHandler() {
    let countAll = 0;
    const skinwalkerRepeat = `
      <div class="tab-wrapper skinwalker__game">
        <div class="skinwalker__game__zone">
          <div class="skinwalker__button__game__zone">
            <button class="skinwalker__sound-button skinwalker-opacity"></button>
          </div>
          <ul class="skinwalker__word__list"></ul>
        </div>
      </div>
    `;
    this.mainArea.innerHTML = skinwalkerRepeat;
    this.checkToSound();
    let countClick = 0;
    let targetIdFirst = '';
    const gameZone = document.querySelector('.skinwalker__word__list');
    this.getRepeatGamesTemplate();
    gameZone.addEventListener(('click'), (event) => {
      let target = event.target;
      if (target.tagName === 'LI' && !target.classList.contains('skinwalker_animation')) {
        countAll += 1;
        if (usersAppState.appSound && target.dataset.audio) {
          this.checkToSound();
          const audio = new Audio();
          audio.src = target.dataset.audio;
          audio.play();
        }
        if (target.tagName === 'LI' && countClick < 1) {
          target.classList.add('skinwalker_animation');
          countClick += 1;
          targetIdFirst = target.dataset.id;
          let index = this.sortDictionary.findIndex(el => el.id === targetIdFirst);
          this.sortDictionary[index].targetIdCountClick += 1;
        } else if (target.tagName === 'LI' && countClick === 1) {
          target.classList.add('skinwalker_animation');
          if (targetIdFirst === target.dataset.id) {
            let index = this.sortDictionary.findIndex(el => el.id === targetIdFirst);
            this.sortDictionary[index].targetIdCountClick += 1;
            if (this.sortDictionary[index].targetIdCountClick === 2) {
              this.sortDictionary[index].isLearned = true;
              usersAppState.updateProgressWord(targetIdFirst, true);
            }
            document.querySelectorAll('.skinwalker_animation').forEach((li) => {
              setTimeout(() => {
                li.classList.remove('skinwalker_animation');
                li.classList.add('skinwalker_green');
                this.greenRepeatCardCount(countAll);
              }, 300);
            });
          } else {
            document.querySelectorAll('.skinwalker_animation').forEach((li) => {
              if (!li.classList.contains('skinwalker_green')) {
                li.classList.add('skinwalker-error');
                setTimeout(() => {
                  li.classList.remove('skinwalker_animation');
                  li.classList.remove('skinwalker-error');
                }, 600);
                usersAppState.updateProgressWord(targetIdFirst, false);
              }
            });
          }
          countClick = 0;
        }
      }
    });
  }
}
