let body = document.querySelector('body');


export class TabAccount {
    constructor() {
        this.main_area = document.querySelector('.main-area');
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
        let tab = `
        <div class="tab-wrapper account">
            <div class="account-section"><span class="account-section-title">Аккаунт</span></div>
            <div class="account-row">
                <i class="far fa-user"></i>
                <input type="input" class="input-name" name="name" value="Alexandr Kartynnik">
                <hr>
            </div>
            <div class="account-row">
                <i class="far fa-envelope"></i>
                <span>k77.wolf@gmail.com</span>
                <hr>
            </div>
            <div class="account-section"><span class="account-section-title">Настройки</span></div>
            <div class="account-row">
                <i class="far fa-moon"></i>
                <span>Ночной режим</span>
                <div class="checkbox-wrapper">
                    <input type="checkbox" name="night-mode" id="night-mode" class="checkbox">
                    <label for="night-mode" class="checkbox-label"></label>
                </div>
                <hr>
            </div>
        </div>`;

        setTimeout(() => {
            this.main_area.innerHTML = tab;
            this.night_mode_handler();
        }, 400)
    }
}