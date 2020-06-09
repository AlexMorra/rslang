import './assets/css/style.css'
import './assets/js/auth'
import './assets/js/menu'
import './assets/js/account'
import {Auth} from "./assets/js/auth";

// INIT
window.current_page = null;
let auth = new Auth();
// auth.login_user('k77.wolf@gmail.com', '1234_Wolf').then(response=> console.log(response))

console.log(auth.authorized())
console.log(typeof auth.authorized())


if (typeof auth.authorized() !== 'object' && window.current_page !== 'auth') {
    auth.show_login_page();
}

setInterval(() => {
    if (typeof auth.authorized() !== 'object' && window.current_page !== 'auth') {
        auth.show_login_page();
        console.log('REDIRECT TO LOGIN PAGE');
    }
}, 10000);
