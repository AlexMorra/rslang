let body = document.querySelector('body');


export class Account {
    constructor() {
        this.main_area = document.querySelector('.main-area');
        this.account = document.getElementById('account')
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
            this.main_area.prepend(this.account.content.cloneNode(true));
            this.night_mode_handler();
            this.options_handler();
        }, 400)
    }

    options_handler() {
        let settings_form = document.forms.settings
        let username = settings_form.username;
        let night_mode = settings_form.night_mode;
        console.log(username, night_mode)
        settings_form.addEventListener('change', () => {
            console.log('OPTIONS CHANGE')
        })
    }
}