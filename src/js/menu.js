import * as cp from './control_panel'
import * as acc from './account'
import * as utils from './utils'
import {Auth} from './auth'

let auth = new Auth();

let btn_rs_lang = document.querySelector('#rs_lang');
let nav_menu = document.querySelector('.nav-menu');

let tab_account = new acc.Account;
let tab_control_panel = new cp.ControlPanel;

window.addEventListener('click', menu_handler);
btn_rs_lang.addEventListener('click', () => {
    nav_menu.classList.toggle('open');
});

function menu_handler(e) {
    let nav = document.querySelector('nav');
    // open/close menu
    let btn_header = [...e.target.classList].includes('nav-header') ||
        [...e.target.parentElement.classList].includes('nav-header');
    // account tab
    let btn_account = [...e.target.classList].includes('nav-account') ||
        [...e.target.parentElement.classList].includes('nav-account');
    // control panel tab
    let btn_control_panel = [...e.target.classList].includes('nav-control-panel') ||
        [...e.target.parentElement.classList].includes('nav-control-panel');
    // logout
    let logout_btn = [...e.target.classList].includes('nav-logout') ||
        [...e.target.parentElement.classList].includes('nav-logout');
    if (btn_header) {
        nav_menu.classList.toggle('open');
        // close the menu if a click behind the menu area
    } else if (!nav.contains(e.target)) {
        nav_menu.classList.remove('open');
    } else if (btn_account) {
        utils.destroy();
        tab_account.show();
    } else if (btn_control_panel) {
        utils.destroy();
        tab_control_panel.show();
    } else if (logout_btn) {
        auth.logout();
    }
}