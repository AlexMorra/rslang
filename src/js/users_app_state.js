export class State {
    constructor() {
        this.words_per_day = null;
        this.cards_per_day = null;
        this.username = null;
        this.examples_using = null;
        this.explanation_examples = null;
        this.night_mode = null;
        this.pictures_words = null;
        this.transcription = null;
        this.translate_word = null;
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
            })
            .then(response_json => {
                console.log(response_json.optional, 'GET USER SETTINGS');
                this.save_settings(response_json);
                return this.night_mode
            })
            .catch(error => console.log(error))
    }

    set_user_settings(settings) {
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
                // if (!response.ok) {
                //     throw Error(response.statusText)
                // }
                return response.json()
            })
            .then(response_json => {
                console.log(response_json, 'SET USER SETTINGS');
                this.save_settings(response_json);
                return response_json
            })
            .catch(error => console.log(error))
    }

    save_settings(settings) {
        console.log(settings, 'SAVE');
        let options = settings.optional;
        this.words_per_day = settings['wordsPerDay'];
        this.cards_per_day = options['cards_per_day'];
        this.username = options['username'];
        this.night_mode = options['night_mode'];
        this.translate_word = options['translate_word'];
        this.explanation_examples = options['explanation_examples'];
        this.examples_using = options['examples_using'];
        this.transcription = options['transcription'];
        this.pictures_words = options['pictures_words'];
    }
}