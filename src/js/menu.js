import * as utils from './utils';
import moment from 'moment';
import { usersAppState } from '../app';
import statistics from './statistics';

export default class Menu extends statistics {
  constructor(controlPanel, account, auth, dictionary, games, training) {
    super();
    this.controlPanel = controlPanel;
    this.dictionary = dictionary;
    this.account = account;
    this.auth = auth;
    this.games = games;
    this.training = training;
    this.body = document.querySelector('body');
    this.menuTemplate = this.getTemplate();
    this.menuNav = null;
  }

  show() {
    let menuTemplate = this.menuTemplate.cloneNode(true);
    this.menuNav = menuTemplate.querySelector('.nav-menu');
    this.userStats = menuTemplate.querySelector('.user-stats');
    this.statsWidth = menuTemplate.querySelector('.stats-width');
    this.body.prepend(menuTemplate);
    window.addEventListener('click', this.menuHandler.bind(this));
    this.statsWidth.addEventListener('click', this.statsWidthHandler.bind(this));
  }

  menuHandler(e) {
    const navId = e.target.id;
    const touchedMenu = this.menuNav.contains(e.target);
    const touchedStats = this.userStats.contains(e.target) || navId === 'main-stats';
    if (!touchedMenu) this.menuNav.classList.remove('open');
    if (!touchedStats) this.userStats.classList.remove('open-stats');

    switch (navId) {
      case 'main-stats':
        console.log('USER STATS OPEN');
        this.getUserStats();
        document.querySelector('.stats-username').textContent = usersAppState.username;
        this.userStats.classList.toggle('open-stats');
        break;
      case 'header-nav-icon':
        this.menuNav.classList.add('open');
        break;
      case 'nav-header':
        this.menuNav.classList.toggle('open');
        break;
      case 'nav-control-panel':
        utils.destroy();
        this.controlPanel.show();
        break;
      case 'nav-games':
        utils.destroy();
        this.games.show();
        break;
      case 'nav-dictionary':
        utils.destroy();
        this.dictionary.show();
        break;
      case 'nav-account':
        utils.destroy();
        this.account.show();
        break;
      case 'nav-logout':
        this.auth.logout();
        break;
      case 'nav-training':
        utils.destroy();
        this.training.show();
        break;
      default:
    }
  }

  statsWidthHandler() {
    let root = document.querySelector(':root');
    if (this.statsWidth.classList.contains('stats-closed')) {
      this.statsWidth.classList.remove('stats-closed');
      this.statsWidth.classList.add('stats-opened');
      root.style.setProperty('--stats_width', '600px');
    } else {
      this.statsWidth.classList.add('stats-closed');
      this.statsWidth.classList.remove('stats-opened');
      root.style.setProperty('--stats_width', '300px');
    }
  }

  getTemplate() {
    let template = document.createElement('template');
    template.innerHTML = `
    <nav class="nav">
      <i class="fas fa-rocket menu-logo" id="header-nav-icon" style="position: absolute" title="RS Lang"></i>
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
          <li id="nav-training" class="nav-training" title="УЧИ БЛЭТ">
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
    <i class="fas fa-project-diagram main-stats-btn" id="main-stats" style="position: absolute; right: 0"></i>
    <div class="user-stats" id="user-stats">
        <h2 class="stats-username"></h2>
        <i class="fas fa-chevron-right stats-width stats-closed"></i>
        <div class="stats-month">${moment().locale('ru').format('MMMM')}</div>
        <canvas id="stats-chart" width="1000" height="1000"></canvas>
    </div>
    `;
    return template.content;
  }
}
