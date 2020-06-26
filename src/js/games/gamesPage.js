import GAMES from './gamesConstants';
import SKIN from './skinWalkers/startWindow';
import SAVANNA from './savanna/savanna';
import * as utils from '../utils';
export default class GamesPage {
  constructor() {
    this.element = null;
    this.mainArea = document.querySelector('.main-area');
    this.cardList = null;
    this.skin = new SKIN();
    this.savanna = new SAVANNA();
  }

  show() {
    setTimeout(() => {
      this.mainArea.append(this.getElement());
    }, 400);
  }

  cardClickHandler(e) {
    console.log(e.target.id);

    switch (e.target.id) {
      case 'Savanna':
        utils.destroy();
        this.savanna.show();
        document.querySelector('.nav').classList.toggle('none');
        break;
      case 'Skin Walker':
        this.skin.show();
        break;
      default:
    }
  }

  getCardListTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="tab-wrapper games-page">
        <ul class="card-list"></ul>
      </div>`.trim();
    return template.content.children[0];
  }

  getCardTemplate(game) {
    const template = document.createElement('template');
    template.innerHTML = `
      <li id="${game.name}" class="card">
          <div class="card__top-part">
              <div class="card__image-wrapper">
                  <img class="card__image" src="../assets/icons/${game.icon}">
              </div>
          </div>
          <h3 class="card__title">${game.name}</h3>
      </li>`.trim();
    return template.content;
  }

  createElement(template) {
    const newElement = document.createElement('template');
    newElement.innerHTML = template;
    return newElement.content.children[0];
  }

  getElement() {
    this.element = this.getCardListTemplate();
    this.cardsWrapper = this.element.querySelector('.card-list');

    const fragment = document.createDocumentFragment();

    GAMES.forEach((game) => {
      fragment.append(this.getCardTemplate(game));
    });

    this.cardsWrapper.append(fragment);
    this.cardList = this.element.querySelector('.card-list');

    this.cardList.addEventListener('click', this.cardClickHandler.bind(this));
    return this.element;
  }
}
