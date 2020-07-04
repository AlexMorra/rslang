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
    }, 400);
  }

  optionsHandler(e) {
    console.log('OPTIONS CHANGE');
    // init the night mode before saving
    this.nightModeHandler(e);

    let username = document.getElementById('username').value;
    let goal = document.querySelector('input[name="goal"]:checked').value;
    username = username || ' ';
    let options = {
      wordsPerDay: 1,
      optional: {
        username: username,
        trainingGoal: goal,
        userLevel: usersAppState.userLevel,
        userExp: usersAppState.userExp
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

  beforeCreated(template) {
    // update options before append the template
    let trainingGoal = template.getElementById(usersAppState.trainingGoal);
    let username = template.getElementById('username');
    let nightMode = template.getElementById('nightMode');
    let translateWord = template.getElementById('translateWord');
    let explanationExamples = template.getElementById('explanationExamples');
    let examplesUsing = template.getElementById('examplesUsing');
    let transcription = template.getElementById('transcription');
    let picturesWords = template.getElementById('picturesWords');
    let playAudio = template.getElementById('playAudio');
    trainingGoal.checked = true;
    username.value = usersAppState.username || ' ';
    nightMode.checked = usersAppState.nightMode;
    translateWord.checked = usersAppState.translateWord;
    explanationExamples.checked = usersAppState.explanationExamples;
    examplesUsing.checked = usersAppState.examplesUsing;
    transcription.checked = usersAppState.transcription;
    picturesWords.checked = usersAppState.picturesWords;
    playAudio.checked = usersAppState.playAudio;
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
        <div class="account-section"><span class="account-section-title goal">Ежедневная цель</span></div>
        <hr>
        <label class="account-row">
            <i class="fas fa-egg"></i>
            <span>Легкая (10 опыта)</span>
            <span class="checkbox-wrapper">
                <input type="radio" name="goal" value="1" id="1" class="checkbox">
                <span class="checkbox-style"></span>
            </span>
        </label>
        <hr>
        <label class="account-row">
            <i class="fas fa-skiing-nordic"></i>
            <span>Обычная (20 опыта)</span>
            <span class="checkbox-wrapper">
                <input type="radio" name="goal" value="2" id="2" class="checkbox">
                <span class="checkbox-style"></span>
            </span>
        </label>
        <hr>
        <label class="account-row">
            <i class="fas fa-weight-hanging"></i>
            <span>Серьезная (30 опыта)</span>
            <span class="checkbox-wrapper">
                <input type="radio" name="goal" value="3" id="3" class="checkbox">
                <span class="checkbox-style"></span>
            </span>
        </label>
        <hr>
        <label class="account-row">
            <i class="fas fa-dumbbell"></i>
            <span>Интенсивная (50 опыта)</span>
            <span class="checkbox-wrapper">
                <input type="radio" name="goal" value="5" id="5" class="checkbox">
                <span class="checkbox-style"></span>
            </span>
        </label>
        <hr>
        <div class="account-section"><span class="account-section-title">Настройки</span></div>
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
