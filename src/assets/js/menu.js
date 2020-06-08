import * as cp from './control_panel'
import * as acc from './account'
import * as utils from './utils'

let btn_rs_lang = document.querySelector('#rs_lang');
let nav_menu = document.querySelector('.nav-menu');

let tab_account = new acc.Account;
let tab_control_panel = new cp.ControlPanel;

nav_menu.addEventListener('click', menu_handler);
btn_rs_lang.addEventListener('click', () => {
    nav_menu.classList.toggle('open');
});

function menu_handler(e) {
    let btn_nav_header = [...e.target.classList].includes('nav-header') ||
        [...e.target.parentElement.classList].includes('nav-header');
    let btn_nav_account = [...e.target.classList].includes('nav-account') ||
        [...e.target.parentElement.classList].includes('nav-account');
    let btn_nav_control_panel = [...e.target.classList].includes('nav-control-panel') ||
        [...e.target.parentElement.classList].includes('nav-control-panel');
    if (btn_nav_header) {
        nav_menu.classList.toggle('open');
    } else if (btn_nav_account) {
        utils.destroy();
        tab_account.show();
    } else if (btn_nav_control_panel) {
        utils.destroy();
        tab_control_panel.show();
    }
}