import { usersAppState } from '../app';
import EnglishPuzzle from '../js/games/english-puzzle/english-puzzle';
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
          <button id="${el.id}" class="statistic__el__delete" title="Удалить из словаря"></button>
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
          <button id="${el.id}" class="statistic__el__delete" title="Удалить из словаря"></button>
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
      usersAppState.deleteUserWord(el.id, true);
      el.style.pointerEvents = 'none';
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
    new EnglishPuzzle().showMainPage();
  });
}
