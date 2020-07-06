import { usersAppState } from '../../../app';
import * as utils from '../../utils';

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
    const targetNode = document.querySelector('.speak-it__main');
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
        <button class="speak-it__main__main-block__buttons-block__start-recognition">
          Начать
          <span id="speak" class="speak" style="display:none"></span>
        </button>
        <button class="speak-it__main__main-block__buttons-block__next" style="display:none">Пропустить</button>
      </div>
    </div>
    `;
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
        transcription: el.transcription,
        correct: 0,
        incorrect: 0
      };
    });
    console.log(this.statistic);
  }

  getCards() {
    this.userWords.forEach((el, index) => {
      const targetNode = document.querySelector('.speak-it__main__main-block__cards-block');
      const card = document.createElement('template');
      card.innerHTML = `
      <div class="speak-it__main__main-block__cards-block__card" index="${index}">
        <div class="speak-it__main__main-block__cards-block__card__wrapper">
          <div class="speak-it__main__main-block__cards-block__card__title">${el.word.toLowerCase()}</div>
        </div>
      </div>
      `;
      if (usersAppState.transcription) {
        const transcriptionNodeHTML = `
        <div class="speak-it__main__main-block__cards-block__card__transcription">${el.transcription}</div>
        `;
        card.content.querySelector('.speak-it__main__main-block__cards-block__card__wrapper').insertAdjacentHTML('beforeend', transcriptionNodeHTML);
        card.content.querySelector('.speak-it__main__main-block__cards-block__card__title').style.height = '50%';
      }
      if (usersAppState.playAudio) {
        const audionNodeHTML = `
        <div class="speak-it__main__main-block__cards-block__card__audio"></div>
        `;
        card.content.querySelector('.speak-it__main__main-block__cards-block__card').insertAdjacentHTML('afterbegin', audionNodeHTML);
        card.content.querySelector('.speak-it__main__main-block__cards-block__card__title').style.marginLeft = '15%';
        if (card.content.querySelector('.speak-it__main__main-block__cards-block__card__transcription') !== null) {
          card.content.querySelector('.speak-it__main__main-block__cards-block__card__transcription').style.marginLeft = '15%';
        }
      }
      targetNode.append(card.content);
      const words = document.querySelectorAll('.speak-it__main__main-block__cards-block__card');
      const randomSequenceWords = [...words].sort(() => Math.random() - 0.5);
      targetNode.innerHTML = '';
      targetNode.append(...randomSequenceWords);
    });
  }

  getImage() {
    const imageNode = document.querySelector('.speak-it__main__main-block__image-block');
    imageNode.style.backgroundImage = `url(https://raw.githubusercontent.com/yarkin13/rslang-data/master/${this.userWords[this.currentStage - 1].image})`;
  }

  getTranslate() {
    const translateNode = document.querySelector('.speak-it__main__main-block__translate-block');
    translateNode.textContent = `${this.userWords[this.currentStage - 1].wordTranslate}`;
  }

  getNextStage() {
    if (this.currentStage === 10) {
      utils.getStatistic(this.handingStatistic());
      this.currentStage += 1;
    } else {
      this.currentStage += 1;
      const currentWord = document.querySelector(`[index="${this.currentStage - 1}"]`);
      this.addAudioHandler();
      if (this.currentStage !== 1) {
        console.log(this.currentStage);
        const prevWord = document.querySelector(`[index="${this.currentStage - 2}"]`);
        currentWord.classList.add('active');
        prevWord.classList.remove('active');
      }
      this.getImage();
      this.getTranslate();
    }
  }

  addBtnHandler() {
    const nextStageBtn = document.querySelector('.speak-it__main__main-block__buttons-block__next');
    const speakIdentifier = document.getElementById('speak');
    let attempts = 0;
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en';
    recognition.continuous = true;
    const startRecognitionBtn = document.querySelector('.speak-it__main__main-block__buttons-block__start-recognition');
    function startRecognitionHandler() {
      startRecognitionBtn.style.pointerEvents = 'none';
      speakIdentifier.style.display = 'block';
      nextStageBtn.style.display = 'block';
      const currentCard = document.querySelector(`[index="${this.currentStage - 1}"]`);
      currentCard.classList.add('active');
      const input = document.querySelector('.speak-it__main__main-block__input');
      recognition.start();
      recognition.onresult = (event) => {
        let result = event.results[attempts][0].transcript.toLowerCase();
        if (this.currentStage === 11) {
          recognition.stop();
          return;
        }
        input.value = result;
        this.checkResult();
        attempts += 1;
      };
    }
    function nextStageBtnHandler() {
      this.changeCardStyle(false);
      this.getAudioError();
      this.getNextStage();
    }
    startRecognitionBtn.addEventListener('click', startRecognitionHandler.bind(this));
    nextStageBtn.addEventListener('click', nextStageBtnHandler.bind(this));
  }

  addAudioHandler() {
    if (usersAppState.playAudio) {
      const word = document.querySelector(`[index="${this.currentStage - 1}"]`);
      const audioBtn = word.querySelector('.speak-it__main__main-block__cards-block__card__audio');
      const audioSrc = this.userWords[this.currentStage - 1].audio;
      function audioHandler() {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = `https://raw.githubusercontent.com/yarkin13/rslang-data/master/${audioSrc}`;
        audio.play();
        console.log('asd');
      }
      audioBtn.addEventListener('click', audioHandler.bind(this));
    }
  }

  checkResult() {
    const input = document.querySelector('.speak-it__main__main-block__input');
    if (input.value.trim() === this.userWords[this.currentStage - 1].word) {
      this.statistic[this.currentStage - 1].isLearned = true;
      this.changeCardStyle(true);
      this.getAudioSuccess();
      this.getNextStage();
    } else {
      this.changeCardStyle(false);
      this.getAudioError();
      this.getNextStage();
    }
  }

  handingStatistic() {
    this.statistic.forEach(el => {
      if (el.isLearned) {
        usersAppState.updateProgressWord(el.id, true);
      } else {
        usersAppState.updateProgressWord(el.id, false);
      }
    });
    return this.statistic;
  }

  getAudioSuccess() {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = '../../../assets/sounds/success.mp3';
    audio.play();
  }

  getAudioError() {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = '../../../assets/sounds/error.mp3';
    audio.play();
  }

  changeCardStyle(value) {
    const card = document.querySelector(`[index="${this.currentStage - 1}"]`);
    if (value) {
      card.style.backgroundColor = '#01AF61';
    } else {
      card.style.backgroundColor = '#da5b4c';
    }
    card.style.opacity = '0.5';
  }
}
