let mainArea = document.querySelector('.main-area');

export function destroy() {
  let tabWrapper = document.querySelector('.tab-wrapper');
  tabWrapper.classList.add('destroy');
  setTimeout(() => mainArea.innerHTML = '', 400);
}
