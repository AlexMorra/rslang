import wordCards from '../../wordCards';
import { usersAppState } from '../../../app';
import Dictionary from '../../dictionary';
import * as utils from '../../utils';

export default class SkinWalkerStartGame {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.usWords = usersAppState.learningWords;
    this.wordListDictionary = [];
    this.wordList = null;
  }

  show() {
    utils.destroy();
    this.getStart();
  }

  getStart() {
    const start = `
    <div class="skinwalker__start">
      <div class="skinwalker__start__intro">
        <h1 class="skinwalker__start__intro__title">Найди пару</h1>
        <p class="skinwalker__start__intro__description">Игра "Найди пару" развивает словарный запас и тренирует память.</br>
          Чем больше слов ты знаешь, тем больше очков опыта получишь.</p>
        <button class="skinwalker__start__into__button">Начать</button>
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
    }, 400);
  }

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
  }

  getRandomDictionary() {
    this.wordListDictionary.sort(() => Math.random() - 0.5);
    const sortDictionary = this.wordListDictionary;
    sortDictionary.length = 10;
    return this.getGamesTemplate(sortDictionary);
  }

  getButtonsListTemplate() {
    const buttonsBlock = `
      <div class="tab-wrapper games__skinwalkers__start">
        <div class="skinwalker__settings__window">
          <div class="skinwalker__title">
            <p>Сейчас в Вашем словаре ${this.usWords.length} слов</p>
            <p class="skinwalker__title__link">добавить слова из словаря</p>
          </div>
          <p class="skinwalker__buttons__description">Выберите условия для начала игры:</p>
          <div class="skinwalker__checkbox">
            <div class="skinwalker__checkbox_description skinwalker-light">Лёгкий уровень сложности <br> (10 пар слов)</div>
            <div class="skinwalker__checkbox_description skinwalker-middle">Средний уровень сложности <br> (15 пар слов)</div>
            <div class="skinwalker__checkbox_description skinwalker-hard">Тяжёлый уровень сложности <br> (20 пар слов)</div>
            <button class="skinwalker__choise-difficult">Продолжить</button>
          </div>
        </div>
        <div class="skinwalker__game__zone">
          <ul class="skinwalker__word__list"></ul>
        </div>
      </div>
    `;
    this.mainArea.innerHTML = buttonsBlock;
    this.buttonsAddChecked();
    const skinwalkerReturnDictionary = document.querySelector('.skinwalker__title__link');
    const skinwalkerHandlerLevelCheck = document.querySelector('.skinwalker__checkbox');
    this.skinWalkerBackToMenu(skinwalkerReturnDictionary);
    this.checkLevelButton(skinwalkerHandlerLevelCheck);
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
      let difficult = 0;
      skinwalkerHandlerLevelCheck.querySelectorAll('.skinwalker__checkbox_description').forEach(button => {
        button.classList.remove('skinwalker__checkbox_active');
        if (target.classList.contains('skinwalker__checkbox_description')) {
          target.classList.add('skinwalker__checkbox_active');
        }
      });
      const choise = skinwalkerHandlerLevelCheck.querySelectorAll('.skinwalker__checkbox_description')
        .find(item => item.classList.contains('skinwalker__checkbox_active'));
      console.log(choise);

      const nextChoice = document.querySelector('.skinwalker__choise-difficult');
      nextChoice.classList.add('skinwalker-opacity');
      this.getNextChoice(nextChoice, skinwalkerHandlerLevelCheck, difficult);
    });
  }

  /* getNextChoice(nextChoice, skinwalkerHandlerLevelCheck, difficult) {
    nextChoice.addEventListener(('click'), () => {
      const blockTitle = document.querySelector('.skinwalker__title');
    });
  } */

  buttonsAddChecked() {
    const buttonsBlockGame = `
    <div class="skinwalker__buttons__block">
      <div class="skinwalker__buttons__block_checked">
        Выбрать произвольные слова для изучения.
      </div>
      <div class="skinwalker__buttons__block_checked">
        Выбрать произвольные слова из добавленных в словарь для изучения.
      </div>
      <div class="skinwalker__buttons__block_checked">
        Выбрать произвольные слова из словаря и случайные для изучения.
      </div>
      <button class="skinwalker__game__start-button">Начать игру</button>
    </div>
    `;
    document.querySelector('.tab-wrapper').innerHTML += buttonsBlockGame;
    const skinwalkerBlockChoise = document.querySelector('.skinwalker__buttons__block');
    this.getChoiseToStartGame(skinwalkerBlockChoise);
  }

  getChoiseToStartGame(skinwalkerBlockChoise) {
    skinwalkerBlockChoise.addEventListener(('click'), (event) => {
      const target = event.target;
      skinwalkerBlockChoise.querySelectorAll('.skinwalker__buttons__block_checked').forEach(button => {
        button.classList.remove('skinwalker__checkbox_active');
        if (target.classList.contains('skinwalker__buttons__block_checked')) {
          target.classList.add('skinwalker__checkbox_active');
        }
      });
    });
  }

  skinWalkerHandler() {
    let countClick = 0;
    let targetIdFirst = '';
    const gameZone = document.querySelector('.skinwalker__word__list');
    gameZone.addEventListener(('click'), (event) => {
      let target = event.target;
      if (target.tagName === 'LI' && !target.classList.contains('skinwalker_rotate')) {
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
              }, 300);
            });
          } else {
            document.querySelectorAll('.skinwalker_rotate').forEach((li) => {
              if (!li.classList.contains('skinwalker_green')) {
                setTimeout(() => {
                  li.classList.remove('skinwalker_rotate');
                }, 1000);
              }
            });
          }
          countClick = 0;
        }
      }
    });
    gameZone.innerHTML = this.getRandomDictionary();
  }

  getButtons() {
    this.getButtonsListTemplate();
    this.getWordListDictionary();
    this.getRandomDictionary();
    this.skinWalkerHandler();
  }
}
