import { usersAppState } from '../app';

let body = document.querySelector('body');

export default class Account {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.accountTemplate = this.getTemplate();
    this.idCheckboxOptions = [
      'nightMode', 'translateWord', 'explanationExamples',
      'examplesUsing', 'transcription', 'picturesWords', 'playAudio'
    ];
  }

  show() {
    setTimeout(() => {
      let accountTab = this.beforeCreated(this.accountTemplate.cloneNode(true));
      this.mainArea.append(accountTab);
      let settings = document.getElementById('account_settings');
      settings.addEventListener('change', this.optionsHandler.bind(this));
      settings.addEventListener('click', this.countHandler.bind(this));
    }, 400);
  }

  optionsHandler(e) {
    console.log('OPTIONS CHANGE');
    // init the night mode before saving
    this.nightModeHandler(e);

    let username = document.getElementById('username').value;
    let wordsPerDay = document.getElementById('wordsPerDay').value;
    let cardsPerDay = document.getElementById('cardsPerDay').value;
    let options = {
      wordsPerDay: wordsPerDay,
      optional: {
        username: username,
        wordsPerDay: wordsPerDay,
        cardsPerDay: cardsPerDay
      }
    };
    this.idCheckboxOptions.forEach(el => {
      options.optional[el] = document.getElementById(el).checked;
    });
    usersAppState.setUserSettings(options);
  }

  nightModeHandler(e) {
    if (e.target.getAttribute('id') === 'nightMode') {
      if (e.target.checked) {
        body.classList.add('night-mode');
      } else {
        body.classList.remove('night-mode');
      }
    }
  }

  countHandler(e) {
    let btn = e.target.dataset.type;
    if (btn) {
      let optionInput = e.target.parentElement.querySelector('input');
      console.log(optionInput);
      if (btn === 'minus') {
        optionInput.value--;
      } else if (btn === 'plus') {
        optionInput.value++;
      }
      if (optionInput.value > 999) optionInput.value = 999;
      if (optionInput.value < 1) optionInput.value = 1;
      this.optionsHandler(e);
    }
  }

  beforeCreated(template) {
    // update options before append the template
    let wordsPerDay = template.getElementById('wordsPerDay');
    let cardsPerDay = template.getElementById('cardsPerDay');
    let username = template.getElementById('username');
    let nightMode = template.getElementById('nightMode');
    let translateWord = template.getElementById('translateWord');
    let explanationExamples = template.getElementById('explanationExamples');
    let examplesUsing = template.getElementById('examplesUsing');
    let transcription = template.getElementById('transcription');
    let picturesWords = template.getElementById('picturesWords');
    let playAudio = template.getElementById('playAudio');
    username.value = usersAppState.username || ' ';
    nightMode.checked = usersAppState.nightMode;
    translateWord.checked = usersAppState.translateWord;
    explanationExamples.checked = usersAppState.explanationExamples;
    examplesUsing.checked = usersAppState.examplesUsing;
    transcription.checked = usersAppState.transcription;
    picturesWords.checked = usersAppState.picturesWords;
    playAudio.checked = usersAppState.playAudio;
    wordsPerDay.value = usersAppState.wordsPerDay || 1;
    cardsPerDay.value = usersAppState.cardsPerDay || 1;
    return template;
  }

  getTemplate() {
    let template = document.createElement('template');
    template.innerHTML = `
    <div class="tab-wrapper account" id="account_settings">
        <div class="account-section"><span class="account-section-title">Аккаунт</span></div>
        <div class="account-row">
            <i class="far fa-user"></i>
            <input type="input" class="input-name" id="username">
        </div>
        <hr>
        <div class="account-row">
            <i class="far fa-envelope"></i>
            <span>k77.wolf@gmail.com</span>
        </div>
        <hr>
        <div class="account-section"><span class="account-section-title">Настройки</span></div>
        <label class="account-row">
            <i class="far fa-comment-dots"></i>
            <span>Cлов в день</span>
            <span class="input-text-wrapper">
                <i class="fas fa-minus" data-type="minus"></i>
                <input type="text" id="wordsPerDay" value="1" readonly>
                <i class="fas fa-plus" data-type="plus"></i>
            </span>
        </label>
        <hr>
        <label class="account-row">
            <i class="far fa-file-word"></i>
            <span>Карточек в день</span>
            <span class="input-text-wrapper">
                <i class="fas fa-minus" data-type="minus"></i>
                <input type="text" id="cardsPerDay" value="1" readonly>
                <i class="fas fa-plus" data-type="plus"></i>
            </span>
        </label>
        <hr>
        <label class="account-row">
            <i class="far fa-moon"></i>
            <span>Ночной режим</span>
            <span class="checkbox-wrapper">
                <input type="checkbox" id="nightMode" class="checkbox">
                <span class="checkbox-style"></span>
            </span>
        </label>
        <hr>
        <label class="account-row">
            <i class="fas fa-language"></i>
            <span>Перевод слова</span>
            <span class="checkbox-wrapper">
                <input type="checkbox" id="translateWord" class="checkbox">
                <span class="checkbox-style"></span>
            </span>
        </label>
        <hr>
        <label class="account-row">
            <i class="fab fa-rev"></i>
            <span>Примеры с объяснением</span>
            <span class="checkbox-wrapper">
                <input type="checkbox" id="explanationExamples" class="checkbox">
                <span class="checkbox-style"></span>
            </span>
        </label>
        <hr>
        <label class="account-row">
            <i class="far fa-surprise"></i>
            <span>Примеры с использованием</span>
            <span class="checkbox-wrapper">
                <input type="checkbox" id="examplesUsing" class="checkbox">
                <span class="checkbox-style"></span>
            </span>
        </label>
        <hr>
        <label class="account-row">
            <i class="fas fa-dog"></i>
            <span>Транскрипция слова</span>
            <span class="checkbox-wrapper">
                <input type="checkbox" id="transcription" class="checkbox">
                <span class="checkbox-style"></span>
            </span>
        </label>
        <hr>
        <label class="account-row">
            <i class="far fa-image"></i>
            <span>Картинки к словам</span>
            <span class="checkbox-wrapper">
                <input type="checkbox" id="picturesWords" class="checkbox">
                <span class="checkbox-style"></span>
            </span>
        </label>
        <hr>
         <label class="account-row">
            <i class="fas fa-volume-up"></i>
            <span>Аудио слов</span>
            <span class="checkbox-wrapper">
                <input type="checkbox" id="playAudio" class="checkbox">
                <span class="checkbox-style"></span>
            </span>
        </label>
    </div>
    `;
    return template.content;
  }
}
