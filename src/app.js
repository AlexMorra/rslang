import './assets/css/style.css'
import './assets/js/auth'
import './assets/js/menu'
import './assets/js/tab-account'
import {Auth} from "./assets/js/auth";

// INIT
window.current_page = '';
let auth = new Auth();
// auth.login_user('k77.wolf@gmail.com', '1234_Wolf').then(response=> console.log(response))
// auth.get_user()
// if (!auth.get_user()) {
// }


// fetch('http://127.0.0.1:8000/api/v1/movie/1/',{
//     method: 'GET'
// })
// .then(response => response.json())
// .then(response_json => console.log(response_json))

get_user('k77.wolf@gmail.com', '1234_Wolf');

    function get_user() {
        let token = localStorage.getItem('token');
        let user_id = localStorage.getItem('user_id');
        return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) return response.json();
                if (response.status === 401) {
                    console.log('Access token is missing or invalid')
                } else if (response.status === 404) {
                    console.log('Settings not found.')
                } else {
                    console.log('User not found')
                }
                return false
            })
            .then(response_json => {
                console.log(response_json);
                return true
            })
            .catch(error => console.log(error))
    }