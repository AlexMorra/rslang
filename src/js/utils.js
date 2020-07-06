import { usersAppState } from '../app';
import EnglishPuzzle from '../js/games/english-puzzle/english-puzzle';
import Savanna from './games/savanna/savanna';
import Sprint from './games/sprint/sprint';
import SpeakIt from './games/speak-it/speak-it';
import SkinWalker from './games/skinWalkers/startWindow';
import AudioCall from './games/Audiocall/audiocall'
let mainArea = document.querySelector('.main-area');

export function destroy() {
  let tabWrapper = document.querySelector('.tab-wrapper');
  tabWrapper.classList.add('destroy');
  setTimeout(() => mainArea.innerHTML = '', 400);
}

export function systemMessage(text, type) {
  let messageWrapper = document.createElement('div');
  messageWrapper.classList.add('message-wrapper');
  let message = document.createElement('span');
  message.classList.add('system-message');
  message.textContent = text;
  messageWrapper.append(message);
  if (type === 'success') {
    message.style.color = 'green';
  } else if (type === 'error') {
    message.style.color = 'crimson';
  }
  document.body.prepend(messageWrapper);
  setTimeout(() => messageWrapper.remove(), 3000);
}

export function getStatistic(statisticArray) {
  destroy();
  setTimeout(() =>{
    createStatistic(statisticArray);
    addEventHandlerInStatistic();
  }, 400);
}

function createStatistic(statisticArray) {
  const errors = statisticArray.reduce((acc, currentValue) => {
    if (!currentValue.isLearned) {
      acc += 1;
    }
    return acc;
  }, 0);
  const right = statisticArray.reduce((acc, currentValue) => {
    if (currentValue.isLearned) {
      acc += 1;
    }
    return acc;
  }, 0);
  const statisticNode = document.createElement('template');
  statisticNode.innerHTML = `
  <div class="tab-wrapper">
    <div class="statistic">
      <div class="statistic-wrapper">
        <div class="statistic__learned">
          <div class="statistic__learned__title__wrapper">
            <p class="statistic__learned__title">Знаю</p>
            <span class="statistic__learned__quantity">${right}</span>
          </div>
        </div>
        <div class="statistic__not-learned">
          <div class="statistic__not-learned__title__wrapper">
            <p class="statistic__not-learned__title">Ошибок</p>
            <span class="statistic__not-learned__quantity">${errors}</span>
          </div>
        </div>
      </div>
      <div class="statistic__btn-container">
        <button class="statistic__btn-container__repeat">Попробовать еще раз</button>
        <button class="statistic__btn-container__return">Вернуться к играм</button>
      </div>
    </div>
    </div>
  `.trim();
  const learnedNode = statisticNode.content.querySelector('.statistic__learned');
  const notLearnedNode = statisticNode.content.querySelector('.statistic__not-learned');
  statisticArray.forEach(el => {
    if (el.isLearned) {
      const statisticEl = document.createElement('template');
      statisticEl.innerHTML = `
        <div class="statistic__el__wrapper">
          <button id="${el.audioSrc}" class="statistic__el__audio"></button>
          <p class="statistic__el__word">${el.word}</p>
          <p class="statistic__el__transcription">${el.transcription}</p>
          <p class="statistic__el__translate">${el.translate}</p>
          <svg class="statistic__el__delete" id="${el.id}" title="Удалить из словаря" fill="#66666660" width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 384 384" style="enable-background:new 0 0 384 384;" xml:space="preserve">
			<path d="M64,341.333C64,364.907,83.093,384,106.667,384h170.667C300.907,384,320,364.907,320,341.333v-256H64V341.333z title="Удалить из словаря""/>
			<polygon points="266.667,21.333 245.333,0 138.667,0 117.333,21.333 42.667,21.333 42.667,64 341.333,64 341.333,21.333 			"/>
</svg>
        </div>
      `;
      learnedNode.append(statisticEl.content);
    } else {
      const statisticEl = document.createElement('template');
      statisticEl.innerHTML = `
        <div class="statistic__el__wrapper">
          <button id="${el.audioSrc}" class="statistic__el__audio"></button>
          <p class="statistic__el__word">${el.word}</p>
          <p class="statistic__el__transcription">${el.transcription}</p>
          <p class="statistic__el__translate">${el.translate}</p>
          <svg class="statistic__el__delete" id="${el.id}" title="Удалить из словаря" fill="#66666660" width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 384 384" style="enable-background:new 0 0 384 384;" xml:space="preserve">
			<path d="M64,341.333C64,364.907,83.093,384,106.667,384h170.667C300.907,384,320,364.907,320,341.333v-256H64V341.333z"/>
			<polygon points="266.667,21.333 245.333,0 138.667,0 117.333,21.333 42.667,21.333 42.667,64 341.333,64 341.333,21.333 			"/>
</svg>
      
        </div>
      `;
      notLearnedNode.append(statisticEl.content);
    }
    mainArea.append(statisticNode.content);
  });
}

function addEventHandlerInStatistic() {
  const audioBtns = document.querySelectorAll('.statistic__el__audio');
  audioBtns.forEach(el => {
    el.addEventListener('click', () => {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = `https://raw.githubusercontent.com/yarkin13/rslang-data/master/${el.id}`;
      audio.play();
    });
  });
  const deleteBtns = document.querySelectorAll('.statistic__el__delete');
  deleteBtns.forEach(el => {
    el.addEventListener('click', () => {
      usersAppState.updateDeletedWord(el.id, true);
      systemMessage('Слово удалено из словоря', 'success');
      el.style.pointerEvents = 'none';
      el.style.opacity = '0.2';
    });
  });
  const returnBtn = document.querySelector('.statistic__btn-container__return');
  returnBtn.addEventListener('click', () => {
    destroy();
    document.querySelector('#nav-games').click();
  });
  const repeatBtn = document.querySelector('.statistic__btn-container__repeat');
  repeatBtn.addEventListener('click', () => {
    destroy();
    console.log(window.currentPage);
    switch (window.currentPage) {
      case 'English Puzzle':
        new EnglishPuzzle().showMainPage();
        break;
      case 'Sprint':
        new Sprint().getGameElements();
        break;
      case 'Speak It':
        new SpeakIt().getMainPage();
        break;
      case 'Savanna':
        new Savanna().startAgain();
        break;
      case 'Skin Walker':
        new SkinWalker().getButtonsListTemplate();
        break;
      case 'Audio Challenge':
        new AudioCall().handleStart();
        break;
    }
  });
}
