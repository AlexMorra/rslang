export function wordClick() {
  const wordList = document.querySelectorAll('.english-puzzle-main__active-phrase__wrapper__element');
  const resultBlock = document.querySelector('.english-puzzle-main__result-block');
  const checkBtn = document.querySelector('.english-puzzle-main__btn-block__check');
  function wordClickHandler() {
    const cell = resultBlock.querySelector('[isfree="true"]');
    if (cell == null) return;
    cell.append(this);
    cell.setAttribute('isFree', 'false');
    this.removeEventListener('click', wordClickHandler);
    if (resultBlock.querySelectorAll('.english-puzzle-main__active-phrase__wrapper__element').length === wordList.length) {
      checkBtn.classList.remove('blocked');
    }
  }
  wordList.forEach(word => {
    word.addEventListener('click', wordClickHandler);
  });
}

export function checkBtnHandler() {
  let count = 0;
  const resultCells = document.querySelectorAll('.english-puzzle-main__active-phrase__wrapper__element');
  const continuedBtn = document.querySelector('.english-puzzle-main__btn-block__continued');
  resultCells.forEach((el, index) => {
    if (Number(el.getAttribute('index')) === index) {
      el.style.backgroundColor = 'green';
      count += 1;
    } else {
      el.style.backgroundColor = 'red';
    }
  });
  if (count === resultCells.length) {
    continuedBtn.classList.remove('blocked');
  }
}

/* export function continuedBtnHandler() {

} */

export function dntKnowBtnHandler() {
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
