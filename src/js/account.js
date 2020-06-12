import {users_app_state} from '../app'

let body = document.querySelector('body');

export class Account {
    constructor() {
        this.main_area = document.querySelector('.main-area');
        this.account_template = document.getElementById('account');
        this.id_checkbox_options = [
            'night_mode', 'translate_word', 'explanation_examples',
            'examples_using', 'transcription', 'pictures_words',
        ];
    }

    show() {
        setTimeout(() => {
            let account_tab = this.before_created(this.account_template);
            this.main_area.prepend(account_tab);
            let settings_form = document.getElementById('account_settings');
            settings_form.addEventListener('change', this.options_handler.bind(this));
            settings_form.addEventListener('click', this.count_handler.bind(this))
        }, 400)
    }

    options_handler(e) {
        console.log('OPTIONS CHANGE');
        // init the night mode before saving
        this.night_mode_handler(e);

        let username = document.getElementById('username').value;
        let words_per_day = document.getElementById('words_per_day').value;
        let cards_per_day = document.getElementById('cards_per_day').value;
        let options = {
            'wordsPerDay': words_per_day,
            'optional': {
                'username': username ? username : ' ',
                'words_per_day': words_per_day,
                'cards_per_day': cards_per_day,
            }
        };
        this.id_checkbox_options.forEach(el => {
            options.optional[el] = document.getElementById(el).checked;
        });
        console.log(options)
        users_app_state.set_user_settings(options);
    }

    night_mode_handler(e) {
        if (e.target.getAttribute('id') === 'night_mode') {
            if (e.target.checked) {
                body.classList.add('night-mode');
            } else {
                body.classList.remove('night-mode');
            }
        }
    }

    count_handler(e) {
        let btn = e.target.dataset['type'];
        if (btn) {
            let option_input = e.target.parentElement.querySelector('input');
            console.log(option_input)
            if (btn === 'minus') {
                option_input.value--
            } else if (btn === 'plus') {
                option_input.value++
            }
            if (option_input.value > 999) option_input.value = 999;
            if (option_input.value < 1) option_input.value = 1;
            this.options_handler(e)
        }
    }

    before_created(account_template) {
        // update options before append the template
        let account_tab = account_template.content.cloneNode(true);
        let words_per_day = account_tab.getElementById('words_per_day');
        let cards_per_day = account_tab.getElementById('cards_per_day');
        let username = account_tab.getElementById('username');
        let night_mode = account_tab.getElementById('night_mode');
        let translate_word = account_tab.getElementById('translate_word');
        let explanation_examples = account_tab.getElementById('explanation_examples');
        let examples_using = account_tab.getElementById('examples_using');
        let transcription = account_tab.getElementById('transcription');
        let pictures_words = account_tab.getElementById('pictures_words');
        username.value = users_app_state.username;
        night_mode.checked = users_app_state.night_mode;
        translate_word.checked = users_app_state.translate_word;
        explanation_examples.checked = users_app_state.explanation_examples;
        examples_using.checked = users_app_state.examples_using;
        transcription.checked = users_app_state.transcription;
        pictures_words.checked = users_app_state.pictures_words;
        words_per_day.value = users_app_state.words_per_day;
        cards_per_day.value = users_app_state.cards_per_day;
        return account_tab
    }
}