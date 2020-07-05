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
        <button class="speak-it__main__main-block__buttons-block__start-recognition">Начать</button>
        <button class="speak-it__main__main-block__buttons-block__next">Пропустить</button>
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
    if (this.currentStage !== 0) {
      const currentCard = document.querySelector(`[index="${this.currentStage - 1}"]`);
      currentCard.style.opacity = '0.5';
      currentCard.style.border = '2px solid #f7cd92';
      currentCard.children[0].classList.add('blocked');
      currentCard.children[0].style.pointerEvents = 'none';
    }
    if (this.currentStage === 9) {
      utils.getStatistic(this.handingStatistic());
    } else {
      const input = document.querySelector('.speak-it__main__main-block__input');
      this.currentStage += 1;
      const word = document.querySelector(`[index="${this.currentStage - 1}"]`);
      word.classList.add('active');
      this.getImage();
      this.getTranslate();
      this.addAudioHandler();
      input.value = '';
    }
  }

  addBtnHandler() {
    const startRecognitionBtn = document.querySelector('.speak-it__main__main-block__buttons-block__start-recognition');
    const nextStageBtn = document.querySelector('.speak-it__main__main-block__buttons-block__next');
    function startRecoginitionHandler() {
      const input = document.querySelector('.speak-it__main__main-block__input');
      const recognition = new webkitSpeechRecognition();
      recognition.lang = 'en';
      recognition.start();
      recognition.onresult = (event) => {
        let result = event.results[0][0].transcript.toLowerCase();
        input.value = result;
        this.checkResult();
        setTimeout(() => input.value = '', 3000);
      };
    }
    function nextStageBtnHadler() {
      this.getNextStage();
    }
    startRecognitionBtn.addEventListener('click', startRecoginitionHandler.bind(this));
    nextStageBtn.addEventListener('click', nextStageBtnHadler.bind(this));
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
    if (input.value === this.userWords[this.currentStage - 1].word) {
      this.statistic[this.currentStage - 1].isLearned = true;
      this.getNextStage();
      this.getAudioSuccess();
    } else {
      this.getAudioError();
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
}
