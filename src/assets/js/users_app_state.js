export class State {
    constructor() {
    }

    get_user_settings() {
        let token = localStorage.getItem('token');
        let user_id = localStorage.getItem('user_id');
        return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user_id}/settings`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                return response.json()
                // if (response.ok) return response.json();
                // if (response.status === 401) {
                //     console.log('Access token is missing or invalid')
                // } else if (response.status === 404) {
                //     console.log('Settings not found.')
                // } else {
                //     console.log('Something went wrong.')
                // }
                // return false
            })
            .then(response_json => {
                return response_json
            })
            .catch(error => console.log(error))
    }

    set_user_settings(settings) {
        let set = JSON.stringify(settings);
        let token = localStorage.getItem('token');
        let user_id = localStorage.getItem('user_id');
        return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${user_id}/settings`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                // if (response.ok) return response.json();
                // if (response.status === 401) {
                //     console.log('Access token is missing or invalid')
                // } else if (response.status === 400) {
                //     console.log('Bad request')
                // } else {
                //     console.log('Something went wrong.')
                // }
                // return false
                return response.json()
            })
            .then(response_json => {
                return response_json
            })
            .catch(error => console.log(error))
    }
}