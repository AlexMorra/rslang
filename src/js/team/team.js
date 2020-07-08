import TEAM from './teamConstants';

export default class GamesPage {
  constructor() {
    this.element = null;
    this.mainArea = document.querySelector('.main-area');
    this.team = null;
    this.cardButtons = null;
    this.cardsDesc = null;
    this.cardFeatures = null;
    this.cardPhotos = null;
    this.cards = null;
    this.id = null;
  }

  show() {
    setTimeout(() => {
      this.mainArea.append(this.getElement());
      this.initElements();
      this.cardButtonClickHandler();
    }, 400);
  }

  initElements() {
    this.cardButtons = [...this.element.querySelectorAll('.person__button')];
    this.cardsDesc = [...this.element.querySelectorAll('.person__desc')];
    this.cardFeatures = [...this.element.querySelectorAll('.features')];
    this.cardPhotos = [...this.element.querySelectorAll('.person__photo')];
    this.cards = [...this.element.querySelectorAll('.person')];
  }

  cardButtonClickHandler() {
    this.cardButtons.forEach((card) => {
      card.addEventListener('click', (event) => {
        const { target } = event;
        const { id } = target;
        this.id = id;

        this.toggleOpen(this.cardFeatures[id]);
        this.toggleCardOpen(this.cardsDesc[id]);
        this.toggleCardPhotoOpen(this.cardPhotos[id]);
        this.toggleButtonRotate(target);
      });
    });

    this.cards.forEach((card) => {
      card.addEventListener('mouseleave', (event) => {
        const { target } = event;
        this.resetCardOpen(this.id);
      });
    });
  }

  toggleCardHeight(elem) {
    elem.classList.toggle('person__button--rotate');
  }

  toggleButtonRotate(elem) {
    elem.classList.toggle('person__button--rotate');
  }

  toggleOpen(elem) {
    elem.classList.toggle('features--open');
  }

  toggleCardOpen(elem) {
    elem.classList.toggle('person__desc--open');
  }

  toggleCardPhotoOpen(elem) {
    elem.classList.toggle('person__photo--open');
  }

  resetCardOpen(id) {
    if (this.cardFeatures[id].classList.contains('features--open')) {
      this.toggleOpen(this.cardFeatures[id]);
      this.toggleCardOpen(this.cardsDesc[id]);
      this.toggleCardPhotoOpen(this.cardPhotos[id]);
      this.cardButtons[id].classList.remove('person__button--rotate');
    }
  }

  getCardListTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="tab-wrapper team">
        <h1 class="team__title">Команда 68</h1>
        <ul class="team-list"></ul>
      </div>`.trim();
    return template.content.children[0];
  }

  getFeaturesItemTemplate(value) {
    const template = document.createElement('template');
    template.innerHTML = `
      <p class="features__item">${value}</p>`.trim();
    return template.content.children[0];
  }

  getPersonTemplate(person, index) {
    const template = document.createElement('template');
    template.innerHTML = `
      <li class="team-list__person person">
        <div class="person__photo person__photo--${index}">
          <img class="person__image" src="../assets/images/team/${person.image}">
        </div>
        <div class="person__desc">              
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

          <button id="${index}" type="button" class="button person__button"></button>
          <div class="features">
            <h5 class="features__title">Реализовано:</h5>
          </div>
        </div>
      </li>`.trim();
    return template.content;
  }

  getElement() {
    this.element = this.getCardListTemplate();
    this.team = this.element.querySelector('.team-list');

    const fragment = document.createDocumentFragment();

    TEAM.forEach((person, index) => {
      const personItem = this.getPersonTemplate(person, index);
      const features = personItem.querySelector('.features');
      const featuresFragment = document.createDocumentFragment();

      TEAM[index].features.forEach((item) => {
        const itemEl = this.getFeaturesItemTemplate(item);
        featuresFragment.append(itemEl);
      });

      features.append(featuresFragment);
      fragment.append(personItem);
    });

    this.team.append(fragment);

    return this.element;
  }
}
