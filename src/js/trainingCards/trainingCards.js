import { usersAppState } from '../../app';
import wordCards from '../wordCards';

export default class TrainingCards {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.trainingArea = null;
    this.userInput = null;
    this.trainingWords = [];
    this.init = true;
  }

  show() {
    setTimeout(() => {
      let wordFromDictionary = usersAppState.userWords.slice().sort((prev, next) => 0.5 - Math.random()).slice(0, 10);
      wordFromDictionary.forEach(word => {
        usersAppState.getWordById(word.wordId).then(word => {
          if (this.init) {
            this.init = false;
            this.mainArea.append(this.getTemplate(word));
          } else {
            this.trainingWords.push(word);
          }
        });
      });
      this.init = true;
    }, 400);
  }

  // async getTrainingWords() {
  //   let randomWords = usersAppState.userWords.slice().sort((prev, next) => 0.5 - Math.random()).slice(0, 10);
  //   for await (let obj of randomWords) {
  //     await usersAppState.getUserWord(obj.wordId).then(word_data => {
  //       wordCards[word_data.difficulty].find(word => word.id === word_data.wordId);
  //     });
  //   }
  // }

  getTrainingArea(word) {
    const template = document.createElement('template');
    template.innerHTML = `
    ${this.createInputContainer(word.word)}
    <input type="text" class="expected-word" maxlength="50" autocomplete="off" style="width: ${word.word.length * 10}px">
    <hr>
    <p class="russian-word">${word.wordTranslate}</p>
    `;
    this.userInput = template.content.querySelector('.expected-word');
    return template.content;
  }

  createInputContainer(word) {
    const container = document.createElement('span');
    container.classList.add('input-container');
    container.setAttribute('data-word', word);
    console.log(word.word);
    word.split('').forEach(letter => {
      console.log(letter);
      const letterContainer = document.createElement('span');
      letterContainer.textContent = letter;
      container.append(letterContainer);
    });
    console.log(container);
    return container;
  }

  getTemplate(word) {
    let template = document.createElement('template');
    template.innerHTML = `
      <div class="tab-wrapper training">
      </div>
    `;
    this.trainingArea = template.content.querySelector('.training');
    this.trainingArea.append(this.getTrainingArea(word));
    return template.content;
  }
}
