import { usersAppState } from '../app';

export class Auth {
  constructor() {
    this.body = document.querySelector('body');
    this.loginPage = document.getElementById('login-template');
    this.createPage = document.getElementById('create-template');
  }

  showLoginPage() {
    window.currentPage = 'auth';
    this.body.classList.remove('night-mode');
    this.body.prepend(this.loginPage.content.cloneNode(true));
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
    this.body.prepend(this.createPage.content.cloneNode(true));
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
    console.log('CREATE');
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
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.createSuccess();
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.showLoginPage();
  }

  loginSuccess() {
    window.currentPage = null;
    let userLoginPage = document.querySelector('.user-login-page');
    if (userLoginPage) userLoginPage.remove();
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
    if (!password.match(/a-z/g) && !password.match(/A-Z/g) && !password.match(/[0-9]/g)) {
      let message = document.createElement('li');
      message.textContent = 'Используйте строчные и прописные латинские буквы (a-z, A-Z) и цифры.';
      errorMessages.push(message);
    }
    if (errorMessages.length) {
      let passwordIcon = document.querySelector('.auth svg');
      passwordIcon.classList.add('shake');
      setTimeout(() => passwordIcon.classList.remove('shake'), 500);
      errorMessages.forEach(message => messageContainer.append(message));
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
}
