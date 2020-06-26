import wordCards from '../../wordCards';

export default class SkinWalkerStartGame {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.usWords = [];
    this.wordListDictionary = [];
    this.element = null;
    this.wordList = null;
  }

  show() {
    setTimeout(() => {
      this.mainArea.append(this.getButtons());
    }, 400);
  }

  getUserWord() {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('user_id');
    return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.length);
        this.usWords = responseJson;
      });
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
            <p>Сейчас в Вашем словаре ${this.usWords.length} слов, <a href="#">добавить слова из словаря</a></p>
          </div>
          <p class="skinwalker__buttons__description">Выберите условия для начала игры</p>
          <div class="skinwalker__buttons__block">
            <button class="skinwalker__start__random">Случайные слова</button>
            <button class="skinwalker__start__vocabulary">Слова из словаря</button>
            <button class="skinwalker__start__mix">50 на 50</button>
          </div>
        </div>
        <div class="skinwalker__game__zone">
          <ul class="skinwalker__word__list"></ul>
        </div>
      </div>
    `;
    this.mainArea.innerHTML = buttonsBlock;
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
  }

  async getButtons() {
    await this.getUserWord();
    this.getButtonsListTemplate();
    this.getWordListDictionary();
    this.getRandomDictionary();
    this.skinWalkerHandler();
  }
}
