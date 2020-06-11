import './css/style.css'
import './js/users_app_state'
import './js/menu'
import './js/account'
import {Auth} from "./js/auth";
import {State} from "./js/users_app_state";

// INIT
window.current_page = null;
let auth = new Auth();
export let users_app_state = new State();

// check if user has session and load settings if has
auth.authorized().then(authorized => {
    if (!authorized && window.current_page !== 'auth') {
        auth.show_login_page();
    } else {
        users_app_state.get_user_settings().then(night_mode => {
            if (night_mode) {
                let body = document.querySelector('body');
                body.classList.add('night-mode');
            }
        });
    }
}).finally(() => {
    // set the session check every 10 seconds
    setInterval(() => {
        if (window.current_page !== 'auth') auth.authorized().then(authorized => {
            if (!authorized) {
                auth.show_login_page();
            }
        })}, 10000);
});
