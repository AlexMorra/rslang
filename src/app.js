import './css/style.css';
import './js/usersAppState';
import './js/menu';
import './js/account';
import Auth from './js/auth';
import State from './js/usersAppState';
import Menu from './js/menu';
import ControlPanel from './js/controlPanel/controlPanel';
import Account from './js/account';
import GamesPage from './js/gamesPage';

// INIT
window.currentPage = null;
let auth = new Auth();

export let menu = new Menu(new ControlPanel(), new Account(), new Auth(), new GamesPage());
export let usersAppState = new State();

// check if user has session and load settings if has
auth.authorized().then(authorized => {
  if (!authorized && window.currentPage !== 'auth') {
    auth.showLoginPage();
  } else {
    auth.loginSuccess();
  }
}).finally(() => {
  // set the session check every 10 seconds
  setInterval(() => {
    if (window.currentPage !== 'auth') {
      auth.authorized().then(authorized => {
        if (!authorized) {
          auth.showLoginPage();
        }
      });
    }
  }, 10000);
});
