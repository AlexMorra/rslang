import moment from 'moment';
import './css/style.css';
import './js/usersAppState';
import './js/menu';
import './js/account';
import Auth from './js/auth';
import State from './js/usersAppState';
import Menu from './js/menu';
import ControlPanel from './js/controlPanel/controlPanel';
import Dictionary from './js/dictionary';
import Account from './js/account';
import GamesPage from './js/games/gamesPage';
import TrainingCards from './js/trainingCards/trainingCards';
import Team from './js/team/team';
import Landing from './js/landing/landing';
import * as utils from './js/utils'

// INIT
window.currentPage = null;
export const auth = new Auth();
const landing = new Landing();


export let usersAppState = new State();

export let menu = new Menu(
  new ControlPanel(),
  new Account(),
  new Auth(),
  new Dictionary(),
  new GamesPage(),
  new TrainingCards(),
  new Team()
);

// check if user has session and load settings if has
auth.authorized().then(authorized => {
  if (!authorized && window.currentPage !== 'auth') {
    // auth.showLoginPage();
    utils.destroy();
    landing.show();
  } else {
    auth.loginSuccess();
    setTimeout(() => {
      // uncomment if you want to delete all words. And refresh page :D
      // usersAppState.getAllWords().forEach(word => {
      //   usersAppState.deleteUserWord(word.wordId).then(() => console.log('------------------'));
      // });
    }, 2000);
  }
}).finally(() => {
  // set the session check every 10 seconds
  setInterval(() => {
    if (window.currentPage !== 'auth' && window.currentPage !== 'landing') {
      auth.authorized().then(authorized => {
        if (!authorized) {
          window.logout = true;
          auth.showLoginPage();
        }
      });
    }
  }, 10000);
});


