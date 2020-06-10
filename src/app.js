import './assets/css/style.css'
import './assets/js/auth'
import './assets/js/users_app_state'
import './assets/js/menu'
import './assets/js/account'
import {Auth} from "./assets/js/auth";
import {State} from "./assets/js/users_app_state";

// INIT
window.current_page = null;
let auth = new Auth();
let users_app_state = new State();

users_app_state.get_user_settings().then(response => console.log(response))

auth.authorized().then(authorized => {
    if (!authorized && window.current_page !== 'auth') {
        auth.show_login_page();
    }
}).finally(() => {
    setInterval(() => {
        if (window.current_page !== 'auth') auth.authorized().then(authorized => {
            if (!authorized) {
                auth.show_login_page();
            }
        })}, 10000);
});
