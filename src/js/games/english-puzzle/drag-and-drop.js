export default function dragAndDrop() {
  const words = document.querySelectorAll('.english-puzzle-main__active-phrase__wrapper__element');
  const cells = document.querySelectorAll('.english-puzzle-main__result-block__element');
  let draggingItem;
  const dragStart = function (event) {
    draggingItem = event.target;
    setTimeout(() => {
      this.classList.add('hide');
    }, 0);
    this.style.left = '0';
  };

  const dragEnd = function () {
    this.classList.remove('hide');
  };

  const dragOver = function (event) {
    event.preventDefault();
    if (this.children.length !== 0) {
      this.children[0].style.marginTop = '80px';
    }
  };

  const dragEnter = function (event) {
    event.preventDefault();
    if (this.children.length === 0) {
      this.classList.add('hovered');
    }
  };

  const dragLeave = function () {
    if (this.children.length === 0) {
      this.classList.remove('hovered');
    } else {
      this.children[0].style.marginTop = '10px';
    }
  };

  const dragDrop = function (event) {
    if (this.children.length !== 0) {
      if (event.target === draggingItem) return;
      this.children[0].style.marginTop = '10px';
      draggingItem.parentNode.append(this.children[0]);
      this.append(draggingItem);
    } else {
      this.append(draggingItem);
      this.classList.remove('hovered');
    }
  };

  words.forEach((word) => {
    word.addEventListener('dragstart', dragStart);
    word.addEventListener('dragend', dragEnd);
  });

  cells.forEach((cell) => {
    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('dragleave', dragLeave);
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('drop', dragDrop);
  });
}
