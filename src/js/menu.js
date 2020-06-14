import * as utils from './utils';
import Auth from './auth';

let auth = new Auth();

export default class Menu {
  constructor(controlPanel, account, auth) {
    this.controlPanel = controlPanel;
    this.account = account;
    this.auth = auth;
    this.body = document.querySelector('body');
    this.menuTemplate = this.getTemplate();
    this.menuNav = null;
  }

  show() {
    let menuTemplate = this.menuTemplate.cloneNode(true);
    this.menuNav = menuTemplate.querySelector('.nav-menu');
    this.logoBtn = menuTemplate.querySelector('#rs_lang');
    this.body.prepend(menuTemplate);
    window.addEventListener('click', this.menuHandler.bind(this));
  }

  menuHandler(e) {
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
      this.menuNav.classList.toggle('open');
      // close the menu if a click behind the menu area
    } else if (!this.menuNav.contains(e.target)) {
      this.menuNav.classList.remove('open');
    } else if (btnAccount) {
      utils.destroy();
      this.account.show();
      console.log(this);
    } else if (btnControlPanel) {
      utils.destroy();
      this.controlPanel.show();
    } else if (logoutBtn) {
      this.auth.logout();
    }
  }

  getTemplate() {
    let template = document.createElement('template');
    template.innerHTML = `
    <nav class="nav">
      <i class="fas fa-rocket menu-icon" id="rs_lang" style="position: absolute" title="RS Lang"></i>
      <ul class="nav-menu">
          <li class="nav-header nav-sm">
              <i class="fas fa-rocket menu-icon" title="RS Lang"></i>
              <span style="margin-left: 35px; font-weight: bold">RS Lang</span>
              <hr style="width: 80%; margin: 0 auto">
          </li>
          <li class="nav-control-panel">
              <i class="fab fa-elementor menu-icon" title="Панель управления"></i>
              <span>Панель управления</span>
          </li>
          <li>
              <i class="fab fa-leanpub menu-icon"></i>
              <span>Учи слова</span>
          </li>
          <li>
              <i class="fas fa-book menu-icon"></i>
              <span>Грамматика</span>
          </li>
          <li class="nav-account">
              <i class="fas fa-user-circle menu-icon" title="Аккаунт"></i>
              <span>Аккаунт</span>
          </li>
          <li class="nav-logout">
              <i class="fas fa-sign-out-alt menu-icon" title="Выход"></i>
              <span>Выход</span>
          </li>
      </ul>
    </nav>
    `;
    return template.content;
  }
}
