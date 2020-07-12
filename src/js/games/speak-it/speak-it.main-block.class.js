import { usersAppState } from '../../../app';
import * as utils from '../../utils';

export default class SpeakItMainBlock {
  constructor() {
    this.userWords = [];
    this.statistic = [];
    this.currentStage = 0;
    this.recognition = new webkitSpeechRecognition();
  }

  getMainBlock() {
    this.createMainBlock();
    this.getUserWords();
    this.getCards();
    this.getNextStage();
    this.addBtnHandler();
    this.checkCurrentPosition();
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
        <button class="speak-it__main__main-block__buttons-block__start-recognition">Начать
          <span class="mic pulse" style="display:none">
            <svg fill="#103482" width="16" height="30" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
             <path d="M7.86774 11.003C7.00412 11.003 6.26271 10.7403 5.64351 10.2149C5.02431 9.68954 4.71472 9.06737 4.71472 8.34841V3.03921C4.71472 2.29261 5.02431 1.66352 5.64351 1.15196C6.26271 0.640395 7.00412 0.384613 7.86774 0.384613C8.73135 0.384613 9.46462 0.640395 10.0675 1.15196C10.6704 1.66352 10.9719 2.29261 10.9719 3.03921V8.34841C10.9719 9.06737 10.6704 9.68954 10.0675 10.2149C9.46462 10.7403 8.73135 11.003 7.86774 11.003ZM13.3672 8.34841H15.1759C15.1759 9.84163 14.5649 11.1482 13.3428 12.2681C12.1207 13.388 10.646 14.0586 8.91874 14.2798V17.1833H6.81673V14.2798C5.08949 14.0586 3.61482 13.3811 2.39272 12.2474C1.17062 11.1136 0.55957 9.81398 0.55957 8.34841H2.3194C2.3194 9.62041 2.87342 10.685 3.98145 11.5422C5.08949 12.3994 6.38492 12.8281 7.86774 12.8281C9.35055 12.8281 10.6378 12.3994 11.7296 11.5422C12.8213 10.685 13.3672 9.62041 13.3672 8.34841Z"/>
            </svg>
          </span>
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
      utils.getStatistic(this.statistic);
      this.recognition.stop();
    } else {
      this.currentStage += 1;
      const currentWord = document.querySelector(`[index="${this.currentStage - 1}"]`);
      this.addAudioHandler();
      if (this.currentStage !== 1) {
        const prevWord = document.querySelector(`[index="${this.currentStage - 2}"]`);
        currentWord.classList.add('active');
        prevWord.classList.remove('active');
        prevWord.style.pointerEvents = 'none';
      }
      this.getImage();
      this.getTranslate();
    }
  }

  addBtnHandler() {
    const nextStageBtn = document.querySelector('.speak-it__main__main-block__buttons-block__next');
    const speakIdentifier = document.querySelector('.mic');
    let attempts = 0;
    this.recognition.lang = 'en';
    this.recognition.continuous = true;
    const startRecognitionBtn = document.querySelector('.speak-it__main__main-block__buttons-block__start-recognition');
    function startRecognitionHandler() {
      startRecognitionBtn.style.pointerEvents = 'none';
      speakIdentifier.style.display = 'block';
      nextStageBtn.style.display = 'block';
      const currentCard = document.querySelector(`[index="${this.currentStage - 1}"]`);
      currentCard.classList.add('active');
      const input = document.querySelector('.speak-it__main__main-block__input');
      this.recognition.start();
      this.recognition.onresult = (event) => {
        let result = event.results[attempts][0].transcript.toLowerCase();
        input.value = result;
        this.checkResult();
        attempts += 1;
      };
      this.recognition.onaudioend = function () {
        speakIdentifier.style.display = 'none';
        startRecognitionBtn.style.pointerEvents = 'auto';
        currentCard.classList.remove('active');
      };
    }
    function nextStageBtnHandler() {
      if (this.currentStage === 11) return;
      usersAppState.updateProgressWord(this.userWords[this.currentStage - 1].id, false);
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
      }
      audioBtn.addEventListener('click', audioHandler.bind(this));
    }
  }

  checkResult() {
    const input = document.querySelector('.speak-it__main__main-block__input');
    if (input.value.trim() === this.userWords[this.currentStage - 1].word) {
      this.statistic[this.currentStage - 1].isLearned = true;
      usersAppState.updateProgressWord(this.userWords[this.currentStage - 1].id, true);
      this.changeCardStyle(true);
      this.getAudioSuccess();
      this.getNextStage();
    } else {
      this.changeCardStyle(false);
      usersAppState.updateProgressWord(this.userWords[this.currentStage - 1].id, false);
      this.getAudioError();
      this.getNextStage();
    }
  }

  getAudioSuccess() {
    if (usersAppState.appSound) {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = './assets/sounds/success.mp3';
      audio.play();
    }
  }

  getAudioError() {
    if (usersAppState.appSound) {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = './assets/sounds/error.mp3';
      audio.play();
    }
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

  checkCurrentPosition() {
    const checkInterval = setInterval(() => {
      if (window.currentPage !== 'Speak It') {
        this.recognition.stop();
        clearInterval(checkInterval);
      }
    }, 2000);
  }
}
