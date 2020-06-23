import { usersAppState } from '../app';
import wordCards from './wordCards';

export default class State {
  constructor() {
    this.wordsPerDay = 1;
    this.cardsPerDay = 1;
    this.username = '';
    this.examplesUsing = false;
    this.explanationExamples = false;
    this.nightMode = false;
    this.picturesWords = false;
    this.transcription = false;
    this.translateWord = false;
    this.playAudio = false;
    this.learningWords = [];
    this.difficultWords = [];
    this.deletedWords = [];
    this.learnedWords = [];
  }

  getUserSettings() {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('user_id');
    return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(responseJson => {
        console.log(responseJson, 'GET USER SETTINGS');
        this.saveSettings(responseJson);
        return this.nightMode;
      })
      .catch(error => console.log(error));
  }

  setUserSettings(settings) {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('user_id');
    return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings)
    })
      .then(response => {
        // if (!response.ok) {
        //     throw Error(response.statusText)
        // }
        return response.json();
      })
      .then(responseJson => {
        console.log(responseJson, 'SET USER SETTINGS');
        this.saveSettings(responseJson);
        return responseJson;
      })
      .catch(error => console.log(error));
  }

  createUserWord(wordId, word) {
    // { "difficulty": "weak", "optional": {testFieldString: 'test', testFieldBoolean: true} }
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('user_id');
    return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, 'CREATE USER WORD');
        this.learningWords.push(responseJson);
        return responseJson;
      });
  }

  updateUserWord(wordId, word_data) {
    // { "difficulty": "weak", "optional": {testFieldString: 'test', testFieldBoolean: true} }
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('user_id');
    return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word_data)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, 'UPDATE USER WORD');
        return responseJson;
      });
  }

  getUserWords() {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('user_id');
    return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, 'GET USER WORDS');
        responseJson.forEach(word => {
          if (word.optional.deletedWord) {
            this.deletedWords.push(word);
          } else if (word.optional.difficultWord) {
            this.difficultWords.push(word);
          } else {
            this.learningWords.push(word);
          }
        });
      });
  }

  getUserWord(wordId) {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('user_id');
    return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('WORD');
        // console.log(responseJson, 'GET USER WORDDDD');
        return responseJson;
      });
  }

  getWordById(wordId) {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('user_id');
    return fetch(`https://afternoon-falls-25894.herokuapp.com/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('WORD');
        // console.log(responseJson, 'GET USER WORDDDD');
        return responseJson;
      });
  }

  deleteUserWord(wordId) {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('user_id');
    return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'DELETE',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) console.log('DELETED');
        return response;
      });
  }

  returnWordToDictionary(wordId) {
    let userWord = this.deletedWords.find(word => word.wordId === wordId);
    userWord.optional.deletedWord = false;
    let word_data = {
      difficulty: userWord.difficulty,
      optional: userWord.optional
    };
    return this.updateUserWord(wordId, word_data).then(response => {
      console.log(response);
      let word = this.deletedWords.pop(userWord);
      usersAppState.learningWords.push(word);
      return response;
    });
  }

  saveSettings(settings) {
    console.log(settings, 'SAVE');
    let options = settings.optional;
    this.wordsPerDay = settings.wordsPerDay;
    if (options) {
      this.cardsPerDay = options.cardsPerDay;
      this.username = options.username;
      this.nightMode = options.nightMode;
      this.translateWord = options.translateWord;
      this.explanationExamples = options.explanationExamples;
      this.examplesUsing = options.examplesUsing;
      this.transcription = options.transcription;
      this.picturesWords = options.picturesWords;
    }
  }
}
