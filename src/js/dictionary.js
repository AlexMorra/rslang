import { usersAppState } from '../app';
import wordCards from './wordCards';

export default class Dictionary {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.wordListWrapper = null;
    this.header = null;
    this.chooseToggleBtn = null;
    this.inputWordSearch = null;
    this.addToDictionaryBtn = null;
    this.audio = null;
    this.currentWords = [];
  }

  show() {
    setTimeout(() => {
      let wordList = this.createWordList();
      this.mainArea.append(wordList);
      this.inputWordSearch.addEventListener('input', this.wordSearchHandler.bind(this));
    }, 400);
  }

  wordSearchHandler() {
    let searchValue = this.inputWordSearch.value.toLowerCase();
    let englishSearch = /^[a-z]+$/i.test(searchValue);
    let filteredWords = null;
    if (englishSearch) {
      filteredWords = this.currentWords.filter(word => word.word.includes(searchValue));
    } else {
      filteredWords = this.currentWords.filter(word => word.wordTranslate.includes(searchValue));
    }
    this.wordListWrapper.innerHTML = '';
    filteredWords.forEach(word => {
      this.wordListWrapper.append(this.createWordElement(word));
    });
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
    let dictionaryTemplate = tabWrapperTemplate.content.querySelector('.dictionary');
    this.wordListWrapper = tabWrapperTemplate.content.querySelector('.word-list-wrapper');
    this.audio = tabWrapperTemplate.content.querySelector('#audio');
    usersAppState.userWords.forEach(obj => {
      const word = wordCards[obj.difficulty].find(word => word.id === obj.wordId);
      this.currentWords.push(word);
      this.wordListWrapper.append(this.createWordElement(word));
    });
    dictionaryTemplate.prepend(this.createWordListHeader());
    return dictionaryTemplate;
  }

  createWordListHeader() {
    this.header = document.createElement('template');
    this.header.innerHTML = `
      <div class="word-list-header">
        <input type="checkbox" class="chooseToggle">
        <input type="text" class="word-search" placeholder="Найти">
        <input type="submit" class="add-to-dictionary" value="Добавить в словарь" style="display: none">
      </div>
    `;
    this.header = this.header.content.querySelector('.word-list-header');
    this.chooseToggleBtn = this.header.querySelector('.chooseToggle');
    this.inputWordSearch = this.header.querySelector('.word-search');
    this.addToDictionaryBtn = this.header.querySelector('.add-to-dictionary');
    return this.header;
  }

  createWordElement(word) {
    // TODO: fix in the future !!!!!!!!
    // let saved = usersAppState.userWords.some(obj => obj.wordId === word.id);

    let wordTemplate = document.createElement('template');
    wordTemplate.innerHTML = `
      <div class="word-list-row">
<!--        <input class="word-checkbox" type="checkbox" name="word" id="word.id">  -->
        <i class="fas fa-volume-up" data-audio="play" data-src="${word.audio}"></i>
        <div class="word">
            ${word.word}
        </div>
        <span class="dash">—</span>
        ${usersAppState.transcription ? `
        <div class="word-transcription">
            ${word.transcription}
        </div>
        <span class="dash">—</span>
        ` : ''}
        <div class="word-translate">
            ${word.wordTranslate}
        </div>
      </div>
      <hr>
      `;
    return wordTemplate.content;
  }
}
