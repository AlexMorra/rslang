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
