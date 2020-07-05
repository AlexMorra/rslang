import { menu, usersAppState } from '../app';
import * as utils from '../js/utils';

export default class Auth {
  constructor() {
    this.body = document.querySelector('body');
    this.loginPageTemplate = this.getLoginTemplate();
    this.createPageTemplate = this.getCreateTemplate();
  }

  showLoginPage() {
    window.currentPage = 'auth';
    this.body.classList.remove('night-mode');
    this.body.prepend(this.loginPageTemplate.cloneNode(true));
    let passwordVisibilityBtn = document.querySelector('.show-password');
    passwordVisibilityBtn.addEventListener('click', this.passwordVisibility);
    let loginUserBtn = document.getElementById('login-user');
    loginUserBtn.addEventListener('click', this.loginHandler.bind(this));
    let routeToCreate = document.querySelector('.route-to-user-create');
    routeToCreate.addEventListener('click', () => this.showCreatePage());
  }

  showCreatePage() {
    window.currentPage = 'auth';
    let loginPage = document.querySelector('.user-login-page');
    loginPage.remove();
    this.body.prepend(this.createPageTemplate.cloneNode(true));
    let passwordVisibilityBtn = document.querySelector('.show-password');
    let createUserBtn = document.getElementById('create-user');
    passwordVisibilityBtn.addEventListener('click', this.passwordVisibility);
    createUserBtn.addEventListener('click', this.createHandler.bind(this));
  }

  loginHandler(e) {
    console.log('IN');
    e.preventDefault();
    let inputEmail = document.getElementById('login-email');
    let inputPassword = document.getElementById('login-password');
    let email = inputEmail.value;
    let password = inputPassword.value;
    if (this.emailValidator(email) && this.passwordValidator(password)) {
      console.log('validate true');
      this.loginUser(email, password).then(response => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.userId);
        this.loginSuccess();
      });
    }
  }

  createHandler(e) {
    e.preventDefault();
    let inputUsername = document.getElementById('create-username');
    let inputEmail = document.getElementById('create-email');
    let inputPassword = document.getElementById('create-password');
    let username = inputUsername.value;
    let email = inputEmail.value;
    let password = inputPassword.value;
    if (this.emailValidator(email) && this.passwordValidator(password)) {
      console.log('validate true');
      this.createUser(email, password);
    }
  }

  loginUser(email, password) {
    let user = JSON.stringify({ email: email, password: password });
    return fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: user
    })
      .then(response => {
        if (!response.ok) { throw Error(response.statusText); }
        return response.json();
      })
      .then(responseJson => responseJson)
      .catch(error => console.log(error));
  }

  createUser(email, password) {
    let user = JSON.stringify({ email: email, password: password });
    return fetch('https://afternoon-falls-25894.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: user
    })
      .then(response => {
        if (response.ok) {
          utils.systemMessage('Пользователь успешно создан', 'success');
          this.createSuccess();
        } else {
          utils.systemMessage('Пользователь уже существует', 'error');
        }
        return response.json();
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.showLoginPage();
  }

  loginSuccess() {
    menu.show();
    window.currentPage = null;
    let userLoginPage = document.querySelector('.user-login-page');
    if (userLoginPage) userLoginPage.remove();
    usersAppState.getUserWords().finally(() => {
      usersAppState.getUserStatistics();
    });
    usersAppState.getUserSettings().then(nightMode => {
      if (nightMode) {
        console.log('AUTH - GET USER SETTINGS');
        let body = document.querySelector('body');
        body.classList.add('night-mode');
      }
    });
  }

  createSuccess() {
    let userCreatePage = document.querySelector('.user-create-page');
    userCreatePage.remove();
    this.showLoginPage();
  }

  authorized() {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('user_id');
    // if (!token || !user_id) return false;
    return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) return response.json();
        return false;
      })
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log(error);
      });
  }

  passwordVisibility() {
    console.log('PASSWORD VISIBILITY');
    let passwordVisibilityBtn = document.querySelector('.show-password');
    let passwordInput = document.getElementById('login-password')
      || document.getElementById('create-password');

    let inputType = passwordInput.getAttribute('type');
    if (inputType === 'password') {
      passwordInput.setAttribute('type', 'text');
      passwordVisibilityBtn.classList.remove('fa-eye-slash');
      passwordVisibilityBtn.classList.add('fa-eye');
    } else if (inputType === 'text') {
      passwordInput.setAttribute('type', 'password');
      passwordVisibilityBtn.classList.add('fa-eye-slash');
      passwordVisibilityBtn.classList.remove('fa-eye');
    }
  }

  passwordValidator(password) {
    let errorMessages = [];
    let messageContainer = document.querySelector('.error-message');
    messageContainer.innerHTML = '';
    if (password.length < 8) {
      let message = document.createElement('li');
      message.textContent = 'Используйте не менее 8 символов.';
      errorMessages.push(message);
    }
    if (!/[a-z]/gi.test(password) || !/\d/g.test(password) || /а-яё/gi.test(password)) {
      let message = document.createElement('li');
      message.textContent = 'Используйте строчные и прописные латинские буквы (a-z, A-Z) и цифры.';
      errorMessages.push(message);
    }
    if (!/[+\-_@$!%*?&#.,:[\]{}]/g.test(password)) {
      let message = document.createElement('li');
      message.textContent = 'Пароль должен содержать один спец символ из +-_@$!%*?&#.,;:[]{}';
      errorMessages.push(message);
    }
    if (errorMessages.length) {
      let passwordIcon = document.querySelector('.auth svg');
      passwordIcon.classList.add('shake');
      setTimeout(() => passwordIcon.classList.remove('shake'), 500);
      errorMessages.forEach(message => messageContainer.append(message));
      errorMessages = [];
      return false;
    }
    return true;
  }

  emailValidator(email) {
    let emailIcon = document.querySelector('.auth .fa-envelope');
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      emailIcon.classList.add('shake');
      setTimeout(() => emailIcon.classList.remove('shake'), 500);
    }
    return re.test(String(email).toLowerCase());
  }

  getLoginTemplate() {
    let template = document.createElement('template');
    template.innerHTML = `
        <div class="user-login-page auth">
          <form action="">
              <div class="auth-wrapper">
                  <h1 class="auth-logo">RS Lang</h1>
                  <h3 class="auth-title" style="margin-bottom: 25px">Добро пожаловать!</h3>
                  <div class="input-container">
                      <i class="far fa-envelope"></i>
                      <input type="email" id="login-email" placeholder="Адрес электронной почты" autocomplete="on">
                  </div>
                  <div class="input-container">
                      <svg width="17" height="21" viewBox="0 0 17 21" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="#1A3B71"><path d="M8.006 0C5.032 0 2.62 2.35 2.62 5.25v3.577c0 .55.456.993 1.02.993.562 0 1.018-.444 1.018-.993V5.25c0-1.802 1.5-3.264 3.348-3.264 1.85 0 3.348 1.462 3.348 3.264 0 .55.457.993 1.02.993.562 0 1.018-.444 1.018-.993 0-2.9-2.41-5.25-5.386-5.25z"></path><path d="M2.038 10.93v8.078c0 .01-.004.006-.01.006h11.957c-.01 0-.01 0-.01-.006V10.93c0-.008.003-.004.01-.004H2.028c.008 0 .01-.002.01.005zM0 10.93c0-1.1.907-1.99 2.028-1.99h11.957c1.12 0 2.028.886 2.028 1.99v8.078c0 1.1-.907 1.992-2.028 1.992H2.028C.908 21 0 20.113 0 19.008V10.93z"></path></g></svg>
                      <input type="password" class="user-password" id="login-password" placeholder="Пароль" autocomplete="on">
                      <i class="far fa-eye-slash show-password"></i>
                  </div>
                  <ul class="error-message"></ul>
                  <input type="submit" value="Войти" class="btn user-login-btn" id="login-user">
                  <p class="route-to-user-create">зарегистрироваться</p>
              </div>
          </form>
        </div>
    `;
    return template.content;
  }

  getCreateTemplate() {
    let template = document.createElement('template');
    template.innerHTML = `
        <div class="user-create-page auth">
          <form action="">
              <div class="auth-wrapper" style="height: 280px">
                  <h1 class="auth-logo">RS Lang</h1>
                  <h3 class="auth-title">Добро пожаловать!</h3>
                  <div class="input-container">
                      <i class="far fa-user"></i>
                      <input type="text" id="create-username" placeholder="Ваше имя">
                  </div>
                  <div class="input-container">
                      <i class="far fa-envelope"></i>
                      <input type="email" id="create-email" placeholder="Адрес электронной почты" autocomplete="on">
                  </div>
                  <div class="input-container">
                      <svg width="17" height="21" viewBox="0 0 17 21" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="#1A3B71"><path d="M8.006 0C5.032 0 2.62 2.35 2.62 5.25v3.577c0 .55.456.993 1.02.993.562 0 1.018-.444 1.018-.993V5.25c0-1.802 1.5-3.264 3.348-3.264 1.85 0 3.348 1.462 3.348 3.264 0 .55.457.993 1.02.993.562 0 1.018-.444 1.018-.993 0-2.9-2.41-5.25-5.386-5.25z"></path><path d="M2.038 10.93v8.078c0 .01-.004.006-.01.006h11.957c-.01 0-.01 0-.01-.006V10.93c0-.008.003-.004.01-.004H2.028c.008 0 .01-.002.01.005zM0 10.93c0-1.1.907-1.99 2.028-1.99h11.957c1.12 0 2.028.886 2.028 1.99v8.078c0 1.1-.907 1.992-2.028 1.992H2.028C.908 21 0 20.113 0 19.008V10.93z"></path></g></svg>
                      <input type="password" class="user-password" id="create-password" placeholder="Пароль" autocomplete="on">
                      <i class="far fa-eye-slash show-password"></i>
                  </div>
                  <ul class="error-message"></ul>
                  <input type="submit" value="Создать" class="btn user-create-btn" id="create-user">
              </div>
          </form>
        </div>
    `;
    return template.content;
  }
}
