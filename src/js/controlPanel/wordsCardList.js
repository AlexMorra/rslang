import { usersAppState } from '../../app';

export default class WordsCardList {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.wordListWrapper = null;
    this.header = null;
    this.inputWordSearch = null;
    this.chooseToggleBtn = null;
    this.addToDictionaryBtn = null;
    this.currentCard = null;
    this.audio = null;
  }

  showWordList(wordListTab) {
    setTimeout(() => {
      this.mainArea.append(wordListTab);
      this.mainArea.addEventListener('click', this.wordListHandler.bind(this));
      this.inputWordSearch.addEventListener('input', this.wordSearchHandler.bind(this));
    }, 400);
  }

  wordListHandler(e) {
    if (e.target.getAttribute('type') === 'checkbox') {
      if (e.target === this.chooseToggleBtn) this.chooseToggle(e);
      let checkedCheckboxes = [...this.wordListWrapper.querySelectorAll('.word-checkbox')]
        .filter(checkbox => checkbox.checked)
        .map(checkbox=> checkbox.getAttribute('id'));
      if (checkedCheckboxes.length) {
        this.inputWordSearch.style.display = 'none';
        this.addToDictionaryBtn.removeAttribute('style');
      } else {
        this.inputWordSearch.removeAttribute('style');
        this.addToDictionaryBtn.style.display = 'none';
      }
    } else if (e.target.dataset.audio) {
      this.audio.src = `./assets/${e.target.dataset.src}`;
      this.audio.play().then(play => {
        return play;
      }).catch(e => console.log(e));
    }
  }

  chooseToggle(e) {
    let wordCheckboxes = [...document.querySelectorAll('.word-checkbox')];
    if (e.target.checked) {
      wordCheckboxes.forEach(checkbox => checkbox.checked = true);
    } else {
      wordCheckboxes.forEach(checkbox => checkbox.checked = false);
    }
  }

  wordSearchHandler() {
    let searchValue = this.inputWordSearch.value.toLowerCase();
    let englishSearch = /^[a-z]+$/i.test(searchValue);
    let filteredWords = null;
    if (englishSearch) {
      filteredWords = this.currentCard.filter(word => word.word.includes(searchValue));
    } else {
      filteredWords = this.currentCard.filter(word => word.wordTranslate.includes(searchValue));
    }
    this.wordListWrapper.innerHTML = '';
    filteredWords.forEach(word => {
      this.wordListWrapper.append(this.createWordElement(word));
    });
  }

  createWordList(card) {
    this.currentCard = card;

    let tabWrapperTemplate = document.createElement('template');
    tabWrapperTemplate.innerHTML = `
      <div class="tab-wrapper word-list">
        <div class="word-list-wrapper">
        </div>
        <audio id="audio"></audio>
      </div>
    `;
    let tabWrapper = tabWrapperTemplate.content.querySelector('.tab-wrapper');
    this.wordListWrapper = tabWrapperTemplate.content.querySelector('.word-list-wrapper');
    this.audio = tabWrapperTemplate.content.querySelector('#audio');
    card.forEach(word => {
      this.wordListWrapper.append(this.createWordElement(word));
    });
    tabWrapper.prepend(this.createWordListHeader());
    this.showWordList(tabWrapperTemplate.content);
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
    let wordTemplate = document.createElement('template');
    wordTemplate.innerHTML = `
      <div class="word-list-row">
        <input class="word-checkbox" type="checkbox" name="word" id="${word.id}">
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
