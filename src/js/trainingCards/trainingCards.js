import { usersAppState } from '../../app';
import wordCards from '../wordCards';

export default class TrainingCards {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.trainingCard = null;
    this.cardBody = null;
    this.wordContainer = null;
    this.answerInput = null;
    this.trainingWords = [];
    this.audio = null;
  }

  show() {
    this.getTrainingWords();
    setTimeout(() => {
      this.mainArea.append(this.getTemplate());
      this.answerInput.addEventListener('keypress', this.answerHandler.bind(this));
      this.trainingCard.addEventListener('click', this.cardHandler.bind(this));

      let width = document.querySelector('.word-container').offsetWidth;
      this.answerInput.style.width = `${width - 20}px`;
    }, 400);
  }

  cardHandler(e) {
    if (e.target.dataset.audio) {
      this.audio.src = `./assets/${e.target.dataset.src}`;
      this.audio.play();
    }
  }

  answerHandler(e) {
    if (e.keyCode === 13 && this.answerInput.value.length) {
      // init
      this.wordContainer.classList.remove('show-result');
      [...this.wordContainer.children].forEach(el => el.removeAttribute('style'));

      const word = this.wordContainer.dataset.word.toLowerCase();
      let value = this.answerInput.value.split('').filter(letter => word.includes(letter)).join('').toLowerCase();

      if (word !== value) {
        if (word.includes(value) && value.length > 1) {
          let start_index = word.indexOf(value);
          let end_index = start_index + value.length;
          for (let index in word) {
            let letterElement = this.cardBody.querySelector(`[index="${index}"]`);
            if (index < start_index || index > end_index - 1) {
              letterElement.style.color = 'orange';
            } else {
              // letterElement.style.color = 'green';
            }
          }
        } else {
          word.split('').forEach((letter, index) => {
            let letterElement = this.cardBody.querySelector(`[index="${index}"]`);
            if (value.indexOf(letter) !== -1) {
              // letterElement.style.color = 'green';
              value = value.slice(value.indexOf(letter) + 1, value.length);
            } else {
              letterElement.style.color = 'crimson';
            }
          });
        }
        this.answerInput.value = '';
        this.wordContainer.classList.add('show-result');
      } else if (word === value) {
        console.log('CORRECT');
        this.audio.src = `./assets/${this.wordContainer.dataset.src}`;
        this.audio.play();
      }
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
    container.setAttribute('data-src', word.audio);
    word.word.split('').forEach((letter, index) => {
      const letterContainer = document.createElement('span');
      letterContainer.setAttribute('index', index);
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
            <audio id="audio"></audio>
        </div>
      </div>
    `;
    this.trainingCard = template.content.querySelector('.training-card');
    this.cardBody = template.content.querySelector('.card-body');
    this.audio = template.content.getElementById('audio');
    this.cardBody.append(this.getTrainingArea(currentWord));
    this.cardBody.querySelector('.input-container').append(this.createWordContainer(currentWord));
    this.wordContainer = this.cardBody.querySelector('.word-container');
    return template.content;
  }
}
