import * as acc from './tab-account'
import * as utils from './utils'

let btn_rs_lang = document.querySelector('#rs_lang');
let nav_menu = document.querySelector('.nav-menu');

let tab_account = new acc.TabAccount;

nav_menu.addEventListener('click', menu_handler);
btn_rs_lang.addEventListener('click', () => {
    nav_menu.classList.toggle('open');
});

function menu_handler(e) {
    let btn_nav_header = [...e.target.classList].includes('nav-header') ||
        [...e.target.parentElement.classList].includes('nav-header');
    let btn_nav_account = [...e.target.classList].includes('nav-account') ||
        [...e.target.parentElement.classList].includes('nav-account');
    if (btn_nav_header) {
        nav_menu.classList.toggle('open');
    } else if (btn_nav_account) {
        let test = document.querySelector('.tab-wrapper')
        utils.destroy();
        tab_account.show()
    }
}