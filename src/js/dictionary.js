import { usersAppState } from '../app';

export default class Dictionary {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.wordListWrapper = null;
    this.audio = null;
  }

  show() {
    setTimeout(() => {
      let wordList = this.createWordList();
      this.mainArea.append(this.dictionaryTemplate.cloneNode(true));
    }, 400);
  }

  createWordList() {
    let tabWrapperTemplate = document.createElement('template');
    tabWrapperTemplate.innerHTML = `
      <div class="tab-wrapper dictionary">
        <div class="word-list-wrapper">
        </div>
        <audio id="audio"></audio>
      </div>
    `;
    let tabWrapper = tabWrapperTemplate.content.querySelector('.tab-wrapper');
    this.wordListWrapper = tabWrapperTemplate.content.querySelector('.word-list-wrapper');
    this.audio = tabWrapperTemplate.content.querySelector('#audio');
    usersappState.userWords.forEach(word => {
      this.wordListWrapper.append(this.createWordElement(word));
    });
    tabWrapper.prepend(this.createWordListHeader());
    this.showWordList(tabWrapperTemplate.content);
  }
}
