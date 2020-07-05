/* eslint-disable default-case */
import GAMES from './gamesConstants';
import EnglishPuzzle from './english-puzzle/english-puzzle';
import SKIN from './skinWalkers/startWindow';
import SAVANNA from './savanna/savanna';
import Sprint from './sprint/sprint';
import Audiocall from './Audiocall/audiocall';
import SpeakIt from './speak-it/speak-it';
import * as utils from '../utils';
export default class GamesPage {
  constructor() {
    this.element = null;
    this.mainArea = document.querySelector('.main-area');
    this.cardList = null;
  }

  show() {
    setTimeout(() => {
      this.mainArea.append(this.getElement());
    }, 400);
  }

  cardClickHandler(e) {
    const game = e.target.id;
    console.log(game);
    window.currentPage = e.target.id;
    switch (game) {
      case 'English Puzzle':
        new EnglishPuzzle().showStartPage();
        break;
      case 'Sprint':
        utils.destroy();
        new Sprint().show();
        break;
      case 'Skin Walker':
        const skin = new SKIN();
        skin.show();
        break;
      case 'Audio Challenge':
        new Audiocall().show();
      case 'Speak It':
        new SpeakIt().showStartPage();
        break;
      case 'Savanna':
        utils.destroy();
        new SAVANNA().show();
        break;
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
      <li id="${game.id}" class="card">
          <div class="card__top-part">
              <div class="card__image-wrapper">
                  <img class="card__image" src="../assets/icons/${game.icon}">
              </div>
          </div>
          <h3 class="card__title">${game.title}</h3>
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
