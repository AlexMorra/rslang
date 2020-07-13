import TEAM from '../team/teamConstants';
import { auth } from "../../app";
import * as utils from '../utils'

const BG = ['phone-1.png', 'phone-2.png', 'phone-3.png', 'phone-4.png'];

export default class Landing {
  constructor() {
    this.element = null;
    this.mainArea = document.querySelector('.main-area');
    this.slider = null;
    this.activeSlideIndex = 0;
    this.appSlider = null;
    this.aboutAppBlock = null;
    this.aboutAppButtons = null;
    this.navTop = null;
    this.navButton = null;
    this.team = null;
    this.enterButtons = null;
    this.slider = null;
  }

  show() {
    setTimeout(() => {
      window.currentPage = 'landing';
      this.element = this.getElement();
      this.mainArea.append(this.element);
      this.start();
    }, 400);
  }

  getElement() {
    const template = document.createElement('template');
    template.innerHTML = `
        <div class="tab-wrapper landing">
            <header id="top" class="header">
              <div class="header__wrapper">
                <div id="menuToggle">
                    <input type="checkbox" />      
                    <span class="one"></span>
                    <span class="two"></span>
                    <span class="three"></span>
                </div>
            
                <h1 class="header__title">RSLang</h1>
                <nav class="header__navigation">
                    <ul class="navigation">
                    <li class="navigation__item navigation__item--reg"><a href="#top" class="navigation__item-link navigation__item-link--active">Регистрация</a></li>
                    <li class="navigation__item"><a href="#about-app" class="navigation__item-link">О приложении</a></li>
                    <li class="navigation__item"><a href="#games" class="navigation__item-link">Игры</a></li>
                    <li class="navigation__item"><a href="#team" class="navigation__item-link">Команда</a></li>
                    </ul>
                </nav>
              </div>    
            </header>
            
            <section id="registration" class="registration">
              <div class="registration__wrapper container">   
                <h2 class="registration__lead">Увеличьте свой словарный запас с RSLang.</h2>
              
                <div class="registration__button-wrapper">
                  <a class="button registration__button registration__button--new" type="button">Зарегистрироваться</a>
                  <a class="button registration__button registration__button--enter" type="button">Войти</a>
                </div>
              </div>    
            </section>
            
            <section id="about-app" class="about-app about-app">
              <h2 class="about-app__title container">О приложении</h2>
              <div class="about-app__wrapper container">
                <input type="radio" id="about-app__btn-1" class="about-app__btn about-app__btn-1" name="toggle" checked>
                <input type="radio" id="about-app__btn-2" class="about-app__btn about-app__btn-2" name="toggle">
                <input type="radio" id="about-app__btn-3" class="about-app__btn about-app__btn-3" name="toggle">
                <input type="radio" id="about-app__btn-4" class="about-app__btn about-app__btn-4" name="toggle">
            
                <section class="about-app__item about-app__item-01" data-index="0">
                    <h4 class="about-app__item-title">Методика интервального повторения</h4>
                    <p class="about-app__desc">В RSLang используется методика интервального повторения.
                     Данная методика основана на действиях и выборе пользователя.
                     При выборе слов и промежуточных тренировках (в играх, либо изучении) слова «созревают» и вновь попадают на изучение.
                      С нашим приложением, Вы не забудете ничего.</p>
                </section>
            
                <section class="about-app__item about-app__item-02" data-index="1">
                    <h4 class="about-app__item-title">Словарь</h4>
                    <p class="about-app__desc">Словарь RSLang – позволяет пользователю самому выбирать слова для изучения.
                      Процесс изучения полностью регулируется пользователем. Возможность добавлять, удалять или повторять слова также,
                        при желании, доступно пользователю, либо доверьтесь нашему приложению, оно это делает самостоятельно на очень высоком уровне.</p>
                </section>
            
                <section class="about-app__item about-app__item-03" data-index="2">
                    <h4 class="about-app__item-title">Игры</h4>
                    <p class="about-app__desc">Игры в RSLang – имеют очень важное значение. Это не просто приятное времяпрепровождение,
                     но и эффективный инструмент изучения новых слов, а также на подсознательном уровне закрепляет знания уже изученных слов.
                     Играйте с удовольствием, ведь это полезно и приятно.</p>
                </section>
            
                <section class="about-app__item about-app__item-04" data-index="3">
                    <h4 class="about-app__item-title">Статистика</h4>
                    <p class="about-app__desc">Сложный алгоритм статистики RSLang регулирует методику интервального повторения слов пользователя.
                     Помогает определить слова необходимые для повторного изучения, либо определяет способность пользователя перейти к изучению новых.
                      Благодаря статистике и нашему алгоритму RSLang, пользователь сможет в сжатые сроки развить свой словарный запах,
                     а также без особого дискомфорта начать общаться на английском языке.</p>
                </section>
            
                <div class="about-app__pagination">
                    <label class="about-app__label" for="about-app__btn-1" data-index="0"></label>
                    <label class="about-app__label" for="about-app__btn-2" data-index="1"></label>
                    <label class="about-app__label" for="about-app__btn-3" data-index="2"></label>
                    <label class="about-app__label" for="about-app__btn-4" data-index="3"></label>
                </div>
              </div>
            </section>
            
            <section id="games" class="games">
              <div class="games__wrapper container">
                <h2 class="games__title">Игры</h2>
            
                <input type="radio" id="games__btn-1" class="games__btn games__btn-1" name="toggle-game" checked>
                <input type="radio" id="games__btn-2" class="games__btn games__btn-2" name="toggle-game">
                <input type="radio" id="games__btn-3" class="games__btn games__btn-3" name="toggle-game">
                <input type="radio" id="games__btn-4" class="games__btn games__btn-4" name="toggle-game">
                <input type="radio" id="games__btn-5" class="games__btn games__btn-5" name="toggle-game">
                <input type="radio" id="games__btn-6" class="games__btn games__btn-6" name="toggle-game">
            
                <section class="games__item games__item-01">
                  <div class="game">
                    <div class="game__desc">
                      <h3 class="game__title">Саванна</h3>
                      <p class="game__text">Тренировка Саванна развивает словарный запас.</br>
                        Чем больше слов ты знаешь, тем больше очков опыта получишь.</p>
                    </div>          
                    <div class="game__view">
                      <div class="game__card game__card-01"></div>
                    </div>  
                  </div>
                </section>
            
                <section class="games__item games__item-02">
                  <div class="game">
                    <div class="game__desc">
                      <h3 class="game__title">Говори правильно</h3>
                      <p class="game__text">Нажмите на слово, чтобы услышать его произношение.<br>
                        Нажмите на кнопку и произнесите слова в микрофон.</p>
                    </div>          
                    <div class="game__view">
                      <div class="game__card game__card-02"></div>
                    </div>  
                  </div>
                </section>
            
                <section class="games__item games__item-03">
                  <div class="game">
                    <div class="game__desc">
                      <h3 class="game__title">Конструктор фраз</h3>
                      <p class="game__text">Нажимайте на слова, собирайте фразы. <br> Слова можно перетаскивать.</p>
                    </div>          
                    <div class="game__view">
                      <div class="game__card game__card-03"></div>
                    </div>  
                  </div>
                </section>
            
                <section class="games__item games__item-04">
                  <div class="game">
                    <div class="game__desc">
                      <h3 class="game__title">Найди пару</h3>
                      <p class="game__text">Игра "Найди пару" развивает словарный запас и тренирует память.</br>
                        Чем больше слов ты знаешь, тем больше очков опыта получишь.</p>
                    </div>          
                    <div class="game__view">
                      <div class="game__card game__card-04"></div>
                    </div>  
                  </div>
                </section>
            
                <section class="games__item games__item-05">
                  <div class="game">
                    <div class="game__desc">
                      <h3 class="game__title">Спринт</h3>
                      <p class="game__text"> Тренировка Спринт - это игра на время.</br>
                        Чем больше верных ответов ты дашь за 60 секунд, </br>
                        тем больше очков опыта получишь.</p>
                    </div>          
                    <div class="game__view">
                      <div class="game__card game__card-05"></div>
                    </div>  
                  </div>
                </section>
            
                <section class="games__item games__item-06">
                  <div class="game">
                    <div class="game__desc">
                      <h3 class="game__title">Аудиовызов</h3>
                      <p class="game__text"> Тренировка Аудиовызов развивает словарный запас.</br>
                        В процессе игры будут звучать английские слова, которые нужно угадать среди предлагаемых.</p>
                    </div>          
                    <div class="game__view">
                      <div class="game__card game__card-06"></div>
                    </div>  
                  </div>
                </section>
            
                <div class="games__pagination">
                  <label class="games__label" for="games__btn-1"></label>
                  <label class="games__label" for="games__btn-2"></label>
                  <label class="games__label" for="games__btn-3"></label>
                  <label class="games__label" for="games__btn-4"></label>
                  <label class="games__label" for="games__btn-5"></label>
                  <label class="games__label" for="games__btn-6"></label>
                </div>
              </div>   
            </section>
            
            <section id="team" class="team">
              <h2 class="team__title">Команда 68</h2>
              <div class="team__wrapper">
                <ul class="team-list my-slider"></ul>   
              </div>  
            </section>
            
            <footer class="footer">
              <div class="footer__wrapper container">
                <a href="https://rs.school/" class="footer__link footer__link--rss" target="_blank">
                    RS School 
                </a> 
                <span class="footer__link"><span class="copy">&copy;</span> 68Team 2020q1</span>
              </div>
            </footer>
        </div>`.trim();
    return template.content.children[0];
  }

  initElements() {
    this.appSlider = document.querySelector('.about-app__pagination');
    this.aboutAppButtons = [...document.querySelectorAll('.about-app__btn')];
    this.aboutAppBlock = document.querySelector('.about-app');
    this.aboutAppPagination = document.querySelector('.about-app__pagination');
    this.navTop = document.querySelector('.navigation__item--reg');
    this.navButton = document.getElementById('menuToggle');
    this.nav = document.querySelector('.header__navigation');
    this.team = document.querySelector('.team-list');
    this.enterButtons = document.querySelector('.registration__button-wrapper');
  }

  aboutAppClickHandler() {
    this.aboutAppBlock.addEventListener('click', (event) => {
      if (event.target.classList.contains('about-app__item')) {
        const index = Number(event.target.dataset.index);
        this.aboutAppButtons[index].checked = true;
        this.aboutAppBlock.style.backgroundImage = `url('./assets/images/${BG[index]}')`;
      }
    });

    this.aboutAppPagination.addEventListener('click', (event) => {
      if (event.target.classList.contains('about-app__label')) {
        const index = Number(event.target.dataset.index);
        this.aboutAppBlock.style.backgroundImage = `url('./assets/images/${BG[index]}')`;
      }
    });
  }

  navClickHandler() {
    this.navTop.addEventListener('click', (event) => {
      window.scrollTo(0, 0);
    });
  }

  navButtonClickHandler() {
    this.navButton.addEventListener('click', (event) => {
      this.nav.classList.toggle('header__navigation--open');
    });
  }

  navigationClickHandler() {
    this.nav.addEventListener('click', (event) => {
      if (event.target.classList.contains('navigation__item-link')) {
        this.nav.classList.toggle('header__navigation--open');
      }
    });
  }

  genearateTeam() {
    const fragment = document.createDocumentFragment();

    TEAM.forEach((person, index) => {
      fragment.append(this.getPersonTemplate(person, index));
    });

    this.team.append(fragment);
  }

  getPersonTemplate(person, index) {
    const template = document.createElement('template');
    template.innerHTML = `
      <li class="team-list__person person">
        <div class="person__photo person__photo--${index}">
          <img class="person__image" src="./assets/images/team/${person.image}">
        </div>
        <div class="person__desc person__desc--${index}">              
          <span class="person__fullname">${person.fullname}</span>
          <span class="person__role">${person.title}</span>  
          <div class="person__link-wrapper">
            <a href="https://github.com/${person.github}" class="person__link" target="_blank">
              <svg width="30" height="30" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#1B1F23"/>
              </svg>
            </a>
            <a href="tg://resolve?domain=${person.telegram}" "width="30" height="30" class="person__link" target="_blank">
              <svg width="30" height="30" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" fill="#039be5" r="12"/><path d="m5.491 11.74 11.57-4.461c.537-.194 1.006.131.832.943l.001-.001-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953z" fill="#fff"/></svg>
            </a>
          </div>
        </div>
      </li>`.trim();
    return template.content;
  }

  enterButtonClickHandler() {
    this.enterButtons.addEventListener('click', (event) => {

      if (event.target.classList.contains('registration__button--enter')) {

        utils.destroyTabWrapper();
        auth.showLoginPage();
      }

      if (event.target.classList.contains('registration__button--new')) {

        utils.destroyTabWrapper();
        auth.showCreatePage();
      }
    });
  }

  sliderInit() {
    this.slider = tns({
      container: '.my-slider',
      controls: false,
      items: 1,
      slideBy: 'page',
      mode: 'carousel',
      center: true,
      loop: true,
      speed: 600,
      mouseDrag: true,
      controlsPosition: 'bottom',
      nav: true,
      fixedWidth: false,
      swipeAngle: false,
      responsive: {
        375: {
          items: 1,
          fixedWidth: 320
        },
        500: {
          items: 1,
          fixedWidth: 320
        },
        640: {
          items: 2
        },
        956: {
          items: 3
          // fixedWidth: 230
        },
        1400: {
          items: 4
        }
      },
      preventScrollOnTouch: 'force',
      startIndex: 0
    });

    this.slider.play();
  }

  start() {
    this.initElements();
    this.aboutAppClickHandler();
    this.navClickHandler();
    this.navButtonClickHandler();
    this.navigationClickHandler();
    this.genearateTeam();
    this.enterButtonClickHandler();
  }
}


  // <div class="registration__desc">
                //   <p class="registration__desc-text">
                //     <span class="cat-text">Котик</span> 
                //     <span class="cat icon"></span> говорит "Мяу!" <br>
                //     <span class="duck-text">Уточка</span>
                //     <span class="duck icon"></span> говорит "Кря!" <br>
                //     <span class="duck-text">Собачка</span>
                //     <span class="dog icon"></span> говорит "Do you speak english?"
                //   </p>
                // </div> 