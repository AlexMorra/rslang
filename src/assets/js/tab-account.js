let body = document.querySelector('body');


export class TabAccount {
    constructor() {
        this.main_area = document.querySelector('.main-area');
        this.tab_account = document.getElementById('tab-account')
    }
    night_mode_handler() {
        let btn_night_mode = document.querySelector('#night-mode');
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
            this.main_area.prepend(this.tab_account.content.cloneNode(true));
            this.night_mode_handler();
        }, 400)
    }
}