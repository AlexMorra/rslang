import wordCards from '../../wordCards';
import { usersAppState } from '../../../app';
import Dictionary from '../../dictionary';
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

  // Получаем массив слов добавленных слов для изучения.
  getWordListDictionary() {
    this.usWords.forEach(obj => {
      const word = wordCards[obj.difficulty].find(item => item.id === obj.wordId);
      this.wordListDictionary.push({
        wordId: word.id,
        wordAudio: word.audio,
        wordGroup: word.group,
        wordWord: word.word,
        wordWordTranslate: word.wordTranslate
      });
    });
  }

  // Получаем массив случайных слов this.wordAllListDictionary.
  getAllWordListDictionary() {
    wordCards[1].forEach(word => {
      this.wordAllListDictionary.push({
        wordId: word.id,
        wordAudio: word.audio,
        wordGroup: word.group,
        wordWord: word.word,
        wordWordTranslate: word.wordTranslate
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
      <li class="skinwalker__word" data-id="${word.wordId}" data-audio="../assets/${word.wordAudio}">
        <p class="skinwalker__word__title-front">
          <img class="skinwalker__shirt" src="../assets/icons/shirtword.jpg">
        </p>
        <p class="skinwalker__word__title-back">${word.wordWord}</p>
      </li>
      <li class="skinwalker__word" data-id="${word.wordId}" data-audio="../assets/${word.wordAudio}">
        <p class="skinwalker__word__title-front">
          <img class="skinwalker__shirt" src="../assets/icons/shirtword.jpg">
        </p>
        <p class="skinwalker__word__title-back">${word.wordWordTranslate}</p>
      </li>`;
    return template.content;
  }

  getGamesTemplate(sortDictionary) {
    this.wordWrapper = document.querySelector('.skinwalker__word__list');

    const fragment = document.createDocumentFragment();

    sortDictionary.forEach((word) => {
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
    const sortDictionary = this.wordListDictionary.slice(0, this.difficultLevel);
    return this.getGamesTemplate(sortDictionary);
  }

  getAllRandomDictionary() {
    this.wordAllListDictionary.sort(() => Math.random() - 0.5);
    const sortDictionary = this.wordAllListDictionary.slice(0, this.difficultLevel);
    return this.getGamesTemplate(sortDictionary);
  }

  getMixWordDictionary() {
    this.wordListMixDictionary.sort(() => Math.random() - 0.5);
    const sortDictionary = this.wordListMixDictionary;
    return this.getGamesTemplate(sortDictionary);
  }

  getButtonsListTemplate() {
    const buttonsBlock = `
      <div class="tab-wrapper">
        <div class="games__skinwalkers__start">
          <div class="skinwalker__settings__window">
            <div class="skinwalker__title">
              <p>Сейчас в Вашем словаре ${this.usWords.length} слов</p>
              <p class="skinwalker__title__link">добавить слова из словаря</p>
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
      const skinwalkerReturnDictionary = document.querySelector('.skinwalker__title__link');
      const skinwalkerHandlerLevelCheck = document.querySelector('.skinwalker__checkbox');
      this.skinWalkerBackToMenu(skinwalkerReturnDictionary);
      this.checkLevelButton(skinwalkerHandlerLevelCheck);
    }, 400);
  }

  skinWalkerBackToMenu(skinwalkerReturnDictionary) {
    skinwalkerReturnDictionary.addEventListener('click', () => {
      const Diary = new Dictionary();
      utils.destroy();
      Diary.show();
    });
  }

  checkLevelButton(skinwalkerHandlerLevelCheck) {
    skinwalkerHandlerLevelCheck.addEventListener(('click'), (event) => {
      const target = event.target;
      skinwalkerHandlerLevelCheck.querySelectorAll('.skinwalker__checkbox_description').forEach(button => {
        button.classList.remove('skinwalker__checkbox_active');
        if (target.classList.contains('skinwalker__checkbox_description')) {
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
        }
      });
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
          <div class="skinwalker__settings__window">
            <div class="skinwalker__title">
              <p>Сейчас в Вашем словаре ${this.usWords.length} слов</p>
              <p class="skinwalker__title__link">добавить слова из словаря</p>
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
      skinwalkerBlockChoise.querySelectorAll('.skinwalker__buttons__block_checked').forEach(button => {
        button.classList.remove('skinwalker__checkbox_active');
        if (target.classList.contains('skinwalker__buttons__block_checked')) {
          target.classList.add('skinwalker__checkbox_active');
          const choiceActiveWordSelect = document.querySelector('.skinwalker__checkbox_active');
          this.choiseWords = choiceActiveWordSelect.dataset.words;
          this.getSecondChoise();
        }
        if (target.classList.contains('skinwalker__game__start-button-prev')) {
          this.getButtonsListTemplate();
        }
      });
    });
  }

  getSecondChoise() {
    const secondChoice = document.querySelector('.skinwalker__game__start-button-go');
    secondChoice.classList.remove('skinwalker-events');
    secondChoice.classList.add('skinwalker-opacity');
    secondChoice.addEventListener(('click'), () => {
      this.skinWalkerHandler();
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
          console.log('clicl');
        }
      });
    }
  }

  skinWalkerHandler() {
    let countAll = 0;
    const skinwalkerBegin = `
      <div class="tab-wrapper">
        <div class="skinwalker__game__zone">
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
        const audio = new Audio();
        audio.src = target.dataset.audio;
        audio.play();

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
}
