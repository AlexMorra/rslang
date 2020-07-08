export default class EnglishPuzzleButtonsBlock {
  getButtonsBlock() {
    const targetNode = document.querySelector('.english-puzzle-main');
    const buttonsBlock = `
      <div class="english-puzzle-main__btn-block">
        <button class="english-puzzle-main__btn-block__check blocked">Проверить</button>
        <button class="english-puzzle-main__btn-block__dnt-know">Не знаю :(</button>
        <button class="english-puzzle-main__btn-block__continued blocked">Продолжить</button>           
      </div>
    `.trim();
    targetNode.insertAdjacentHTML('beforeend', buttonsBlock);
    return buttonsBlock.content;
  }

  checkBtnHandler() {
    let count = 0;
    const resultCells = document.querySelectorAll('.english-puzzle-main__result-block__element');
    const continuedBtn = document.querySelector('.english-puzzle-main__btn-block__continued');
    const dntKnowBtn = document.querySelector('.english-puzzle-main__btn-block__dnt-know');
    let result;
    resultCells.forEach(el => {
      if (el.getAttribute('word') === el.children[0].innerHTML.trim()) {
        el.children[0].style.backgroundColor = '#01AF61';
        count += 1;
      } else {
        el.children[0].style.backgroundColor = '#da5b4c';
      }
    });
    if (count === resultCells.length) {
      continuedBtn.classList.remove('blocked');
      dntKnowBtn.classList.add('blocked');
      this.getSuccessSound();
    } else {
      this.getErrorSound();
    }
  }

  dntKnowBtnHandler() {
    const cellsResultBlock = document.querySelectorAll('.english-puzzle-main__result-block__element');
    const words = document.querySelectorAll('.english-puzzle-main__active-phrase__wrapper__element');
    const checkBtn = document.querySelector('.english-puzzle-main__btn-block__check');
    words.forEach(el => {
      el.parentNode.removeChild(el);
    });
    words.forEach(el => {
      const index = el.getAttribute('index');
      cellsResultBlock[index].append(el);
    });
    checkBtn.classList.remove('blocked');
  }

  getSuccessSound() {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = '../../../assets/sounds/success.mp3';
    audio.play();
  }

  getErrorSound() {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = '../../../assets/sounds/error.mp3';
    audio.play();
  }
}
