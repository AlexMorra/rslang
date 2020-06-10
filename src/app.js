import './assets/css/style.css'
import './assets/js/auth'
import './assets/js/menu'
import './assets/js/account'
import {Auth} from "./assets/js/auth";

// INIT
window.current_page = null;
let auth = new Auth();

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
