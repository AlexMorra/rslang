import {users_app_state} from '../app'

let body = document.querySelector('body');

export class Account {
    constructor() {
        this.main_area = document.querySelector('.main-area');
        this.account_template = document.getElementById('account');
        this.id_checkbox_options = [
            'night_mode', 'translate_word', 'explanation_examples',
            'examples_using', 'transcription', 'pictures_words'
        ]
    }
    night_mode_handler() {
        let btn_night_mode = document.querySelector('#night_mode');
        btn_night_mode.addEventListener('change', (e) => {
            if (e.target.checked) {
                body.classList.add('night-mode');
            } else {
                body.classList.remove('night-mode');
            }
        });
    }

    show() {
        setTimeout(() => {
            let account_tab = this.before_created(this.account_template);
            this.main_area.prepend(account_tab);
            this.night_mode_handler();
            let settings_form = document.getElementById('account_settings');
            settings_form.addEventListener('change', this.options_handler.bind(this))
        }, 400)
    }

    options_handler() {
        console.log('OPTIONS CHANGE');
        let username = document.getElementById('username').value;
        let options = {
            'wordsPerDay': 1,
            'optional': {}
        };
        this.id_checkbox_options.forEach(el => {
            options.optional[el] = document.getElementById(el).checked;
        });
        if (username) {
            options.optional['username'] = username;
        } else {
            delete options.optional['username'];
        }
        users_app_state.set_user_settings(options);
    }

    before_created(account_template) {
        // set checkboxes before append
        let account_tab = account_template.content.cloneNode(true);
        let username = account_tab.getElementById('username');
        let night_mode = account_tab.getElementById('night_mode');
        let translate_word = account_tab.getElementById('translate_word');
        let explanation_examples = account_tab.getElementById('explanation_examples');
        let examples_using = account_tab.getElementById('examples_using');
        let transcription = account_tab.getElementById('transcription');
        let pictures_words = account_tab.getElementById('pictures_words');
        username.value = users_app_state.username || ' ';
        night_mode.checked = users_app_state.night_mode;
        translate_word.checked = users_app_state.translate_word;
        explanation_examples.checked = users_app_state.explanation_examples;
        examples_using.checked = users_app_state.examples_using;
        transcription.checked = users_app_state.transcription;
        pictures_words.checked = users_app_state.pictures_words;
        return account_tab
    }
}