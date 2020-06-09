export class Auth {
    constructor() {
        this.body = document.querySelector('body');
        this.login_page = document.getElementById('login-template');
        this.create_page = document.getElementById('create-template');
    }
    show_login_page() {
        window.current_page = 'auth';
        this.body.prepend(this.login_page.content.cloneNode(true));
        let password_visibility_btn = document.querySelector('.show-password');
        let login_user_btn = document.getElementById('login-user');
        password_visibility_btn.addEventListener('click', this.password_visibility);
        login_user_btn.addEventListener('click', this.login_handler.bind(this));
    }

    show_create_page() {
        this.body.prepend(this.create_page.content.cloneNode(true))
    }

    login_handler(e) {
        console.log('IN');
        e.preventDefault();
        let input_login = document.getElementById('login-email');
        let input_password = document.getElementById('login-password');
        let email = input_login.value;
        let password = input_password.value;
        if (this.email_validator(email) && this.password_validator(password)) {
            console.log('validate true');
            this.login_user(email, password).then(response => {
                console.log(response);
                localStorage.setItem('token', response.token);
                localStorage.setItem('user_id', response.userId);
                this.login_success();
            })
        }
    }

    login_user(email, password) {
        let user = JSON.stringify({'email': email, 'password': password});
        return fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: user
        })
            .then(response => {
                if (!response.ok) { throw Error(response.statusText) }
                return response.json()
            })
            .then(response_json => response_json)
            .catch(error => console.log(error))
    }

    login_success() {
        window.current_page = null;
        let user_login_page = document.querySelector('.user-login-page');
        user_login_page.remove();
    }

    authorized() {
        let token = localStorage.getItem('token');
        let user_id = localStorage.getItem('user_id');
        if (!token || !user_id) return false;
        return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) { throw Error(response.statusText) }
                return response.json()
            })
            .then(response_json => {
                return response_json
            })
            .catch(error => console.log(error))
    }

    create_user(email, password) {
        let user = JSON.stringify({'email': email, 'password': password});
        return fetch('https://afternoon-falls-25894.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : user
        })
            .then(response => response.json())
            .then(response_json => response_json);
    }

    password_visibility() {
        console.log('PASSWORD VISIBILITY');
        let password_visibility_btn = document.querySelector('.show-password');
        let login_password_input = document.getElementById('login-password');

        let input_type = login_password_input.getAttribute('type');
        if (input_type === 'password') {
            login_password_input.setAttribute('type', 'text');
            password_visibility_btn.classList.remove('fa-eye-slash');
            password_visibility_btn.classList.add('fa-eye')
        } else if (input_type === 'text') {
            login_password_input.setAttribute('type', 'password');
            password_visibility_btn.classList.add('fa-eye-slash');
            password_visibility_btn.classList.remove('fa-eye')
        }
    }

    password_validator(password) {
        let error_messages = [];
        let message_container = document.querySelector('.error-message');
        message_container.innerHTML = '';
        if (password.length < 8) {
            let message = document.createElement('li');
            message.textContent = 'Используйте не менее 8 символов.';
            error_messages.push(message)
        }
        if (!password.match(/a-z/g) && !password.match(/A-Z/g) && !password.match(/[0-9]/g)) {
            let message = document.createElement('li');
            message.textContent = 'Используйте строчные и прописные латинские буквы (a-z, A-Z) и цифры.';
            error_messages.push(message);
        }
        if (error_messages.length) {
            let password_icon = document.querySelector('.auth svg');
            password_icon.classList.add('shake');
            setTimeout(() => password_icon.classList.remove('shake'), 500);
            error_messages.forEach(message => message_container.append(message));
            return false
        }
        return true
    }

    email_validator(email) {
        let email_icon = document.querySelector('.auth .fa-envelope');
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            email_icon.classList.add('shake');
            setTimeout(() => email_icon.classList.remove('shake'), 500);
        }
        return re.test(String(email).toLowerCase())
    }
}