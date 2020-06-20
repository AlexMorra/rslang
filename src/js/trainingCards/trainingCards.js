import { usersAppState } from '../../app';
import wordCards from '../wordCards';

export default class TrainingCards {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.trainingArea = null;
    this.answerInput = null;
    this.trainingWords = [];
    this.init = true;
  }

  show() {
    this.getTrainingWords();
    setTimeout(() => {
      this.mainArea.append(this.getTemplate());
      this.answerInput.addEventListener('keypress', this.answerHandler.bind(this));

      let width = document.querySelector('.word-container').offsetWidth;
      this.answerInput.style.width = `${width - 20}px`;
    }, 400);
  }

  answerHandler(e) {
    if (e.keyCode === 13 && this.answerInput.value.length) {
      console.log('CHECK ANSWER');
    }
  }

  getTrainingWords() {
    // get 10 random user words from the dictionary
    this.trainingWords = usersAppState.userWords.slice().sort((prev, next) => 0.5 - Math.random()).slice(0, 10)
      .map(obj => {
        return wordCards[obj.difficulty].find(word => word.id === obj.wordId);
      });
    console.log(this.trainingWords, 'training words');
  }

  getTrainingArea(word) {
    console.log(word);
    const template = document.createElement('template');
    template.innerHTML = `
      <span class="input-container">
        <input type="text" class="answer-input" maxlength="50" autocomplete="off" autofocus>
      </span>
      <hr>
      <p class="translation">${word.wordTranslate}</p>
      `;
    this.answerInput = template.content.querySelector('.answer-input');
    return template.content;
  }

  createWordContainer(word) {
    const container = document.createElement('span');
    container.classList.add('word-container');
    container.setAttribute('data-word', word.word);
    word.word.split('').forEach(letter => {
      const letterContainer = document.createElement('span');
      letterContainer.textContent = letter;
      container.append(letterContainer);
    });
    return container;
  }

  getTemplate() {
    const currentWord = this.trainingWords.pop();
    let template = document.createElement('template');
    template.innerHTML = `
      <div class="tab-wrapper training-card">
        <div class="card-header"></div>
        <div class="card-body"></div>
        <div class="card-footer">
            <i class="fas fa-volume-up" data-audio="play" data-src="${currentWord.audio}"></i>        
        </div>
      </div>
    `;
    this.trainingArea = template.content.querySelector('.card-body');
    this.trainingArea.append(this.getTrainingArea(currentWord));
    this.trainingArea.querySelector('.input-container').append(this.createWordContainer(currentWord));
    return template.content;
  }
}
