import * as utils from './utils';
import Auth from './auth';

let auth = new Auth();

export default class Menu {
  constructor(controlPanel, account, auth, games) {
    this.controlPanel = controlPanel;
    this.account = account;
    this.auth = auth;
    this.games = games;
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
    const navId = e.target.id;

    switch (navId) {
      case 'nav-header':
        this.menuNav.classList.toggle('open');
        break;
      case 'nav-control-panel':
        utils.destroy();
        this.controlPanel.show();
        break;
      case 'nav-games':
        // utils.destroy();
        console.log('games');
        break;
      case 'nav-dictionary':
        // utils.destroy();
        console.log('dictionary');
        break;
      case 'nav-account':
        utils.destroy();
        this.account.show();
        break;
      case 'nav-logout':
        this.auth.logout();
        break;
      default:
    }
  }

  getTemplate() {
    let template = document.createElement('template');
    template.innerHTML = `
    <nav class="nav">
      <i class="fas fa-rocket menu-icon" id="rs_lang" style="position: absolute" title="RS Lang"></i>
      <ul class="nav-menu">
          <li id="nav-header" class="nav-header nav-sm">
              <i class="fas fa-rocket menu-icon" title="RS Lang"></i>
              <span class="nav-name" style="margin-left: 35px; font-weight: bold">RS Lang</span>
              <hr style="width: 80%; margin: 0 auto">
          </li>
          <li id="nav-control-panel" class="nav-control-panel">
              <i class="fab fa-elementor menu-icon" title="Панель управления"></i>
              <span class="nav-name">Панель управления</span>
          </li>
          <li>
              <i class="fab fa-leanpub menu-icon"></i>
              <span class="nav-name">Учи слова</span>
          </li>         
          <li id="nav-dictionary" class="nav-dictionary">
              <i class="fas fa-book menu-icon"></i>
              <span>Словарь</span>
          </li>
          <li id="nav-games" class="nav-games">
            <i class="fas fa-chess-knight menu-icon"></i>
            <span class="nav-name">Коллекция игр</span>
          </li>
          <li id="nav-account" class="nav-account">
              <i class="fas fa-user-circle menu-icon" title="Аккаунт"></i>
              <span class="nav-name">Аккаунт</span>
          </li>
          <li id="nav-logout" class="nav-logout">
              <i class="fas fa-sign-out-alt menu-icon" title="Выход"></i>
              <span class="nav-name">Выход</span>
          </li>
      </ul>
    </nav>
    `;
    return template.content;
  }
}
