import wordCards from './wordCards';
import { usersAppState } from '../app';

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

  getAllWords() {
    return [
      ...this.learningWords,
      ...this.difficultWords,
      ...this.deletedWords,
      ...this.learnedWords
    ];
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

  createUserWord(wordId, difficulty) {
    let defaultWordData = {
      difficulty: `${difficulty}`,
      optional: {
        difficultWord: false,
        deletedWord: false,
        learnedWord: false,
        progress: 0
      }
    };
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
      body: JSON.stringify(defaultWordData)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, 'CREATE USER WORD');
        return responseJson;
      });
  }

  updateUserWord(wordId, wordData) {
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
      body: JSON.stringify(wordData)
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
          } else if (word.optional.learnedWord) {
            this.learnedWords.push(word);
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
        console.log(response, 'DELETED ------');
        return response;
      });
  }

  getWordById(wordId) {
    let token = localStorage.getItem('token');
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
      this.playAudio = options.playAudio;
    }
  }

  getTrainingWords(count = 10) {
    // return words and add from cards to the user dictionary if words not enough
    let words = this.learningWords.slice()
      .sort(() => 0.5 - Math.random()).slice(0, count)
      .map(obj => {
        return wordCards[obj.difficulty].find(word => word.id === obj.wordId);
      });
    if (words.length < count) {
      Object.values(wordCards).forEach((card, index) => {
        card.forEach(word => {
          if (!words.includes(word) && words.length < count) {
            words.push(word);
            this.createUserWord(word.id, index + 1);
          }
        });
      });
    }
    return words;
  }

  // UPDATE SINGLE USER OPTIONS

  // update this.deletedWord
  async updateDeletedWord(wordId, value) {
    let userWord = null;
    if (value) {
      userWord = await this.learningWords.find(word => word.wordId === wordId);
      let word = this.learningWords.pop(userWord);
      this.deletedWords.push(word);
    } else {
      userWord = await this.deletedWords.find(word => word.wordId === wordId);
      let word = this.deletedWords.pop(userWord);
      this.learningWords.push(word);
    }
    userWord.optional.deletedWord = value;
    let wordData = {
      difficulty: userWord.difficulty,
      optional: userWord.optional
    };
    return this.updateUserWord(wordId, wordData).then(response => {
      console.log(response);
      return response;
    });
  }
}
