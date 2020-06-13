import * as cp from './controlPanel';
import * as acc from './account';
import * as utils from './utils';
import { Auth } from './auth';

let auth = new Auth();

let btnRsLang = document.querySelector('#rs_lang');
let navMenu = document.querySelector('.nav-menu');

let tabAccount = new acc.Account();
let tabControlPanel = new cp.ControlPanel();

window.addEventListener('click', menuHandler);
btnRsLang.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

function menuHandler(e) {
  let nav = document.querySelector('nav');
  // open/close menu
  let btnHeader = [...e.target.classList].includes('nav-header')
        || [...e.target.parentElement.classList].includes('nav-header');
    // account tab
  let btnAccount = [...e.target.classList].includes('nav-account')
        || [...e.target.parentElement.classList].includes('nav-account');
    // control panel tab
  let btnControlPanel = [...e.target.classList].includes('nav-control-panel')
        || [...e.target.parentElement.classList].includes('nav-control-panel');
    // logout
  let logoutBtn = [...e.target.classList].includes('nav-logout')
        || [...e.target.parentElement.classList].includes('nav-logout');
  if (btnHeader) {
    navMenu.classList.toggle('open');
    // close the menu if a click behind the menu area
  } else if (!nav.contains(e.target)) {
    navMenu.classList.remove('open');
  } else if (btnAccount) {
    utils.destroy();
    tabAccount.show();
  } else if (btnControlPanel) {
    utils.destroy();
    tabControlPanel.show();
  } else if (logoutBtn) {
    auth.logout();
  }
}
