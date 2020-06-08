let create_password_input = document.querySelector('.user-password');
let show_password_btn = document.querySelector('.show-password');

export class Auth {
    constructor() {
        this.body = document.querySelector('body');
        this.login_page = document.getElementById('login-template');
        this.create_page = document.getElementById('create-template')
    }
    show_login_page() {
        this.body.prepend(this.login_page.content.cloneNode(true))
    }

    show_create_page() {
        this.body.prepend(this.create_page.content.cloneNode(true))
    }

    get_user() {
        let token = localStorage.getItem('token');
        let user_id = localStorage.getItem('user_id');
        if (!token && !user_id) return false;
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
                return response
                // if (response.ok) return response.json();
                // if (response.status === 401) {
                //     console.log('Access token is missing or invalid')
                // } else if (response.status === 404) {
                //     console.log('Settings not found.')
                // } else {
                //     console.log('User not found')
                // }
                // return false
            })
            .then(response_json => {
                return console.log(response_json)
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
                if (response.ok) return response.json();
                if (response.status === 403) {
                    console.log('Incorrect e-mail or password.')
                } else {
                    console.log('Something went wrong.')
                }
                return false
            })
            .then(response_json => {
                localStorage.setItem('token', response_json.token);
                localStorage.setItem('user_id', response_json.userId);
                return true
            })
            .catch(error => console.log(error))
    }
}


// password visibility
// show_password_btn.addEventListener('click', (e) => {
//     let input_type = create_password_input.getAttribute('type');
//     if (input_type === 'password') {
//         create_password_input.setAttribute('type', 'text');
//         show_password_btn.classList.remove('fa-eye-slash');
//         show_password_btn.classList.add('fa-eye')
//     } else if (input_type === 'text') {
//         create_password_input.setAttribute('type', 'password');
//         show_password_btn.classList.add('fa-eye-slash');
//         show_password_btn.classList.remove('fa-eye')
//     }
// });