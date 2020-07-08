import { usersAppState } from '../app';
import wordCards from './wordCards';
import * as utils from './utils';

export default class Dictionary {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.dictionary = null;
    this.dictionaryNav = null;
    this.checkedWordsId = null;
    this.chekedWords = null;
    this.wordListWrapper = null;
    this.header = null;
    this.chooseToggleBtn = null;
    this.inputWordSearch = null;
    this.deleteWordsBtn = null;
    this.returnToDictionaryBtn = null;
    this.learnAgainBnt = null;
    this.audio = null;
    this.currentWords = [];
    this.currentTab = 'learning';
  }

  show() {
    setTimeout(() => {
      this.mainArea.append(this.createWordList());
      this.dictionary.addEventListener('click', this.wordListHandler.bind(this));
      this.inputWordSearch.addEventListener('input', this.wordSearchHandler.bind(this));
      this.chooseToggleBtn.addEventListener('change', this.chooseToggle.bind(this));
      this.deleteWordsBtn.addEventListener('click', this.deleteWords.bind(this));
      this.dictionaryNav.addEventListener('click', this.navHandler.bind(this));
      this.returnToDictionaryBtn.addEventListener('click', this.returnWords.bind(this));
      this.learnAgainBnt.addEventListener('click', this.learnAgainWords.bind(this));
    }, 400);
  }

  navHandler(e) {
    const navId = e.target.id;
    const navsId = ['nav-learning-words', 'nav-difficult-words', 'nav-deleted-words', 'nav-learned-words'];
    const activeToggle = () => {
      [...this.dictionaryNav.children].forEach(nav => nav.classList.remove('active-dict'));
      this.dictionaryNav.querySelector(`#${navId}`).classList.add('active-dict');
      this.chooseToggleBtn.checked = false;
    };

    // reset nav state
    if (navId.includes(navId)) {
      this.deleteWordsBtn.style.display = 'none';
      this.returnToDictionaryBtn.style.display = 'none';
      this.learnAgainBnt.style.display = 'none';
      this.inputWordSearch.removeAttribute('style');
      activeToggle();
    }
    switch (navId) {
      case 'nav-learning-words':
        if (this.currentTab !== 'learning') {
          this.currentTab = 'learning';
          this.getWordsList(usersAppState.learningWords);
        }
        break;
      case 'nav-difficult-words':
        if (this.currentTab !== 'difficult') {
          this.currentTab = 'difficult';
          this.getWordsList(usersAppState.difficultWords);
        }
        break;
      case 'nav-deleted-words':
        if (this.currentTab !== 'deleted') {
          this.currentTab = 'deleted';
          this.getWordsList(usersAppState.deletedWords);
        }
        break;
      case 'nav-learned-words':
        if (this.currentTab !== 'learned') {
          this.currentTab = 'learned';
          this.getWordsList(usersAppState.learnedWords);
        }
        break;
    }
  }

  wordListHandler(e) {
    if (e.target.getAttribute('type') === 'checkbox') {
      if (e.target === this.chooseToggleBtn) this.chooseToggle(e);
      this.checkedWordsId = [...this.wordListWrapper.querySelectorAll('.word-checkbox-delete')]
        .filter(checkbox => checkbox.checked)
        .map(checkbox=> checkbox.getAttribute('id'));
      console.log(this.checkedWordsId, 'CHECKED WORDS');
      if (this.checkedWordsId.length) {
        this.btnVisible();
      } else {
        this.btnHidden();
      }
    } else if (e.target.dataset.audio) {
      this.audio.src = `./assets/${e.target.dataset.src}`;
      this.audio.play();
    }
  }

  chooseToggle(e) {
    console.log('choose toggle');
    this.chekedWords = [...document.querySelectorAll('.word-checkbox-delete')];
    if (e.target.checked) {
      this.chekedWords.forEach(checkbox => checkbox.checked = true);
      this.btnVisible();
    } else {
      this.chekedWords.forEach(checkbox => checkbox.checked = false);
      this.btnHidden();
    }
  }

  learnAgainWords(e) {
    console.log(this.checkedWordsId);
    this.checkedWordsId.forEach(wordId => {
      let wordRow = document.querySelector(`[data-word-id="${wordId}"]`);
      usersAppState.updateLearnedWord(wordId, false).then(() => {
        wordRow.nextElementSibling.remove();
        wordRow.remove();
      });
    });
    this.inputWordSearch.removeAttribute('style');
    this.learnAgainBnt.style.display = 'none';
    this.chooseToggleBtn.checked = false;
  }

  deleteWords(e) {
    console.log(this.checkedWordsId);
    this.checkedWordsId.forEach(wordId => {
      let wordRow = document.querySelector(`[data-word-id="${wordId}"]`);
      usersAppState.updateDeletedWord(wordId, true).then(() => {
        wordRow.nextElementSibling.remove();
        wordRow.remove();
      });
    });
    this.inputWordSearch.removeAttribute('style');
    this.deleteWordsBtn.style.display = 'none';
    this.chooseToggleBtn.checked = false;
  }

  returnWords(e) {
    console.log(this.checkedWordsId);
    this.checkedWordsId.forEach(wordId => {
      let wordRow = document.querySelector(`[data-word-id="${wordId}"]`);
      usersAppState.updateDeletedWord(wordId, false).then(() => {
        wordRow.nextElementSibling.remove();
        wordRow.remove();
      });
    });
    this.inputWordSearch.removeAttribute('style');
    this.returnToDictionaryBtn.style.display = 'none';
    this.chooseToggleBtn.checked = false;
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
    let template = document.createElement('template');
    template.innerHTML = `
      <div class="tab-wrapper dictionary">
        <div class="word-list-wrapper">
        </div>
        <audio id="audio"></audio>
      </div>
    `;
    this.dictionary = template.content.querySelector('.dictionary');
    this.wordListWrapper = template.content.querySelector('.word-list-wrapper');
    this.audio = template.content.querySelector('#audio');
    this.getWordsList(usersAppState.learningWords);
    this.dictionary.prepend(this.createWordListHeader());
    this.dictionary.prepend(this.creteDictionaryNav());
    return template.content;
  }

  getWordsList(wordCategory) {
    this.currentWords = [];
    this.wordListWrapper.innerHTML = '';
    wordCategory.forEach(obj => {
      const word = wordCards[obj.difficulty].find(word => word.id === obj.wordId);
      this.currentWords.push(word);
      this.wordListWrapper.append(this.createWordElement(word));
    });
  }

  creteDictionaryNav() {
    let template = document.createElement('template');
    template.innerHTML = `
      <ul class="dictionary-nav">
        <li id="nav-learning-words" class="dictionary-learning-words active-dict">Изучаемые слова</li>
        <li id="nav-difficult-words" class="dictionary-difficult-words">Сложные слова</li>
        <li id="nav-deleted-words" class="dictionary-deleted-words">Удаленные слова</li>
        <li id="nav-learned-words" class="dictionary-learned-words">Выученные слова</li>
      </ul>
    `;
    this.dictionaryNav = template.content.querySelector('.dictionary-nav');
    return template.content;
  }

  createWordListHeader() {
    this.header = document.createElement('template');
    this.header.innerHTML = `
      <div class="word-list-header">
        <input type="checkbox" class="chooseToggle">
        <input type="text" class="word-search" placeholder="Найти">
        <input type="submit" class="delete-words" value="Удалить из словаря" style="display: none">
        <input type="submit" class="return-words" value="Вернуть на изучение" style="display: none">
        <input type="submit" class="learn-again-words" value="Изучать снова" style="display: none">
      </div>
    `;
    this.header = this.header.content.querySelector('.word-list-header');
    this.chooseToggleBtn = this.header.querySelector('.chooseToggle');
    this.inputWordSearch = this.header.querySelector('.word-search');
    this.deleteWordsBtn = this.header.querySelector('.delete-words');
    this.learnAgainBnt = this.header.querySelector('.learn-again-words');
    this.returnToDictionaryBtn = this.header.querySelector('.return-words');
    return this.header;
  }

  createWordElement(word) {
    let wordTemplate = document.createElement('template');
    wordTemplate.innerHTML = `
      <div class="word-list-row" data-word-id="${word.id}">
        <input class="word-checkbox-delete" type="checkbox" name="word" id="${word.id}">  
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

  btnVisible() {
    this.inputWordSearch.style.display = 'none';
    if (this.currentTab === 'learning' || this.currentTab === 'difficult') {
      this.deleteWordsBtn.removeAttribute('style');
    } else if (this.currentTab === 'deleted') {
      this.returnToDictionaryBtn.removeAttribute('style');
    } else if (this.currentTab === 'learned') {
      this.learnAgainBnt.removeAttribute('style');
    }
  }

  btnHidden() {
    this.inputWordSearch.removeAttribute('style');
    if (this.currentTab === 'learning' || this.currentTab === 'difficult') {
      this.deleteWordsBtn.style.display = 'none';
    } else if (this.currentTab === 'deleted') {
      this.returnToDictionaryBtn.style.display = 'none';
    } else if (this.currentTab === 'learned') {
      this.learnAgainBnt.style.display = 'none';
    }
  }
}
