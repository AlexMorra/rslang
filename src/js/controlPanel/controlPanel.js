import wordCards from '../wordCards';
import * as utils from '../utils';
// import { usersAppState } from '../../app';
import wordsCardList from './wordsCardList';

export default class ControlPanel extends wordsCardList {
  constructor() {
    super();
    this.controlPanelTemplate = document.getElementById('control-panel');
  }

  show() {
    setTimeout(() => {
      let controlPanelTab = this.beforeCreate(this.controlPanelTemplate);
      this.mainArea.prepend(controlPanelTab);
      this.mainArea.addEventListener('click', this.controlPanelHandler.bind(this));
    }, 400);
  }

  beforeCreate(template) {
    let controlPanelTab = template.content.cloneNode(true);
    let cardsWrapper = controlPanelTab.querySelector('.cp-cards');
    let cardTemplate = document.createElement('template');

    for (let card in wordCards) {
      cardTemplate.innerHTML = `
             <div class="cp-card" data-card="${card}">
                <div class="card-title">Карточка ${card}</div>
                <div class="card-progress"> 0 из ${wordCards[card].length} </div>
                <div class="card-control">1</div>
            </div>`;
      cardsWrapper.append(cardTemplate.content);
    }

    return controlPanelTab;
  }

  controlPanelHandler(e) {
    let cardKey = [...e.target.classList].includes('cp-card') ? e.target.dataset.card
      : [...e.target.parentElement.classList].includes('cp-card') ? e.target.parentElement.dataset.card
        : false;
    if (cardKey) {
      utils.destroy();
      this.createWordList(wordCards[cardKey]);
    }
  }
}
