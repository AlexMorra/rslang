export default function wordClick() {
  const wordList = document.querySelectorAll('.english-puzzle-main__active-phrase__wrapper__element');
  const resultBlock = document.querySelector('.english-puzzle-main__result-block');
  function wordClickHandler() {
    const cell = resultBlock.querySelector('[isfree="true"]');
    if (cell == null) return;
    cell.append(this);
    cell.setAttribute('isFree', 'false');
    this.removeEventListener('click', wordClickHandler);
  }
  wordList.forEach(word => {
    word.addEventListener('click', wordClickHandler);
  });
}
