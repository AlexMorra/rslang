import {usersAppState} from '../../../app'

export default class SpeakItMainBlock {

  constructor() {
    this.userWords = [];
    this.statistic = [];
    this.currentStage = 1;
  }

  getMainBlock() {
    this.createMainBlock();
    this.getUserWords();
    this.getCards();
  }

  createMainBlock() {
    const targetNode = document.querySelector('.speak-it__main')
    const mainBlock = document.createElement('template');
    mainBlock.innerHTML = `
    <div class="speak-it__main__main-block">
      <div class="speak-it__main__main-block__image-block">image</div>
      <div class="speak-it__main__main-block__translate-block">translate</div>
      <div class="speak-it__main__main-block__cards-block"></div>
      <div class="speak-it__main__main-block__buttons-block">
        <button class="speak-it__main__main-block__buttons-block__start-recognition">recognition</button>
      </div>
    </div>
    `
    targetNode.append(mainBlock.content);
  }

  getUserWords() {
    this.userWords = usersAppState.getTrainingWords();
    this.userWords.forEach(el => {
      el.textExample = el.textExample.replace(/<b>/gm, '').replace(/<\/b>/gm, '');
      el.textExampleArray = el.textExample.split(' ');
    });
    console.log(this.userWords);
    this.statistic = this.userWords.map(el => {
      return {
        id: el.id,
        word: el.word,
        translate: el.wordTranslate,
        isLearned: false,
        audioSrc: el.audio,
        transcription: el.transcription
      };
    }); 
    console.log(this.statistic)
  }

  getCards() {
    this.userWords.forEach(el => {
      const targetNode = document.querySelector('.speak-it__main__main-block__cards-block')
      const card = document.createElement('template');
      card.innerHTML = `
      <div class="speak-it__main__main-block__cards-block__card">
        <span class="speak-it__main__main-block__cards-block__card__audio">audio</span>
        <div class="speak-it__main__main-block__cards-block__card__title">${el.word}</div>
        <div class="speak-it__main__main-block__cards-block__card__transcription">${el.transcription}</div>
      </div>
      `
      targetNode.append(card.content);
    })
  }

}