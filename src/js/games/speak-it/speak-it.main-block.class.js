import {usersAppState} from '../../../app'

export default class SpeakItMainBlock {

  constructor() {
    this.userWords = [];
    this.statistic = [];
    this.currentStage = 0;
  }

  getMainBlock() {
    this.createMainBlock();
    this.getUserWords();
    this.getCards();
    this.getNextStage();
    this.addBtnHandler();
  }

  createMainBlock() {
    const targetNode = document.querySelector('.speak-it__main')
    const mainBlock = document.createElement('template');
    mainBlock.innerHTML = `
    <div class="speak-it__main__main-block">
      <div class="speak-it__main__main-block__image-block"></div>
      <div class="speak-it__main__main-block__translate-block"></div>
      <div class="speak-it__main__main-block__input__wrapper">
        <input class="speak-it__main__main-block__input">
      </div>
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
    this.userWords.forEach((el, index) => {
      const targetNode = document.querySelector('.speak-it__main__main-block__cards-block')
      const card = document.createElement('template');
      card.innerHTML = `
      <div class="speak-it__main__main-block__cards-block__card" index="${index}">
        <span class="speak-it__main__main-block__cards-block__card__audio">audio</span>
        <div class="speak-it__main__main-block__cards-block__card__title">${el.word}</div>
        <div class="speak-it__main__main-block__cards-block__card__transcription">${el.transcription}</div>
      </div>
      `
      targetNode.append(card.content);
      const words = document.querySelectorAll('.speak-it__main__main-block__cards-block__card');
      const randomSequenceWords = [...words].sort(() => Math.random() - 0.5);
      targetNode.innerHTML = '';
      targetNode.append(...randomSequenceWords);
    })
  }

  getImage() {
    const imageNode = document.querySelector('.speak-it__main__main-block__image-block');
    imageNode.style.backgroundImage = `url(https://raw.githubusercontent.com/yarkin13/rslang-data/master/${this.userWords[this.currentStage - 1].image})`
  }

  getTranslate() {
    const translateNode = document.querySelector('.speak-it__main__main-block__translate-block');
    translateNode.textContent = `${this.userWords[this.currentStage - 1].wordTranslate}`;
  }

  getNextStage() {
    this.currentStage += 1;
    console.log(this.currentStage)
    const word = document.querySelector(`[index="${this.currentStage - 1}"]`);
    word.classList.add('active');
    this.getImage();
    this.getTranslate();
    this.addAudioHandler();
  }

  addBtnHandler() {
    const btn = document.querySelector('.speak-it__main__main-block__buttons-block__start-recognition');
    function startHandler() {
      console.log('asd')
      const input = document.querySelector('.speak-it__main__main-block__input');
      const recognition = new webkitSpeechRecognition();
      recognition.lang = 'en';
      recognition.start();
      recognition.onresult = (event) => {
        let result = event.results[0][0].transcript.toLowerCase();
        input.value = result;
        this.checkResult();
    };
    }
    btn.addEventListener('click', startHandler.bind(this));
  }

  addAudioHandler() {
    const word = document.querySelector(`[index="${this.currentStage - 1}"]`);
    const audioBtn = word.querySelector('.speak-it__main__main-block__cards-block__card__audio');
    const audioSrc = this.userWords[this.currentStage - 1].audio;
    function audioHandler() {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = `https://raw.githubusercontent.com/yarkin13/rslang-data/master/${audioSrc}`;
      audio.play();
    }
    audioBtn.addEventListener('click', audioHandler.bind(this))
  }

  checkResult(word) {
    const input = document.querySelector('.speak-it__main__main-block__input');
    if (input.value === this.userWords[this.currentStage - 1].word) {
      this.getNextStage();
    }
  }

}