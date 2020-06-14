import { usersAppState } from '../app';

let body = document.querySelector('body');

export default class Account {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.accountTemplate = document.getElementById('account');
    this.idCheckboxOptions = [
      'nightMode', 'translateWord', 'explanationExamples',
      'examplesUsing', 'transcription', 'picturesWords'
    ];
  }

  show() {
    setTimeout(() => {
      let accountTab = this.beforeCreated(this.accountTemplate);
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
    let accountTab = template.content.cloneNode(true);
    let wordsPerDay = accountTab.getElementById('wordsPerDay');
    let cardsPerDay = accountTab.getElementById('cardsPerDay');
    let username = accountTab.getElementById('username');
    let nightMode = accountTab.getElementById('nightMode');
    let translateWord = accountTab.getElementById('translateWord');
    let explanationExamples = accountTab.getElementById('explanationExamples');
    let examplesUsing = accountTab.getElementById('examplesUsing');
    let transcription = accountTab.getElementById('transcription');
    let picturesWords = accountTab.getElementById('picturesWords');
    username.value = usersAppState.username || ' ';
    nightMode.checked = usersAppState.nightMode;
    translateWord.checked = usersAppState.translateWord;
    explanationExamples.checked = usersAppState.explanationExamples;
    examplesUsing.checked = usersAppState.examplesUsing;
    transcription.checked = usersAppState.transcription;
    picturesWords.checked = usersAppState.picturesWords;
    wordsPerDay.value = usersAppState.wordsPerDay || 1;
    cardsPerDay.value = usersAppState.cardsPerDay || 1;
    return accountTab;
  }
}
