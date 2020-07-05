import wordCards from './wordCards';
import moment from 'moment';

export default class State {
  constructor() {
    // user options
    this.trainingGoal = 2;
    this.wordsPerDay = 1;
    this.username = 'User';
    this.examplesUsing = true;
    this.explanationExamples = true;
    this.nightMode = false;
    this.picturesWords = true;
    this.transcription = true;
    this.translateWord = true;
    this.playAudio = true;
    this.userLevel = 1;
    this.userExp = 0;
    // game options
    this.learningWords = [];
    this.difficultWords = [];
    this.deletedWords = [];
    this.learnedWords = [];
    // statistics
    this.userStatistics = {};
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

  getUserSettingsData() {
    return {
      wordsPerDay: this.wordsPerDay,
      optional: {
        trainingGoal: this.trainingGoal,
        username: this.username,
        examplesUsing: this.examplesUsing,
        explanationExamples: this.explanationExamples,
        nightMode: this.nightMode,
        picturesWords: this.picturesWords,
        transcription: this.transcription,
        translateWord: this.translateWord,
        playAudio: this.playAudio,
        userLevel: this.userLevel,
        userExp: this.userExp
      }
    };
  }

  saveSettings(settings) {
    console.log(settings, 'SAVE');
    let options = settings.optional;
    this.wordsPerDay = settings.wordsPerDay;
    if (options) {
      this.trainingGoal = options.trainingGoal === undefined ? 2 : options.trainingGoal;
      this.username = options.username === undefined ? 'User' : options.username;
      this.nightMode = options.nightMode === undefined ? false : options.nightMode;
      this.translateWord = options.translateWord === undefined ? true : options.translateWord;
      this.explanationExamples = options.explanationExamples === undefined ? true : options.explanationExamples;
      this.examplesUsing = options.examplesUsing === undefined ? true : options.examplesUsing;
      this.transcription = options.transcription === undefined ? true : options.transcription;
      this.picturesWords = options.picturesWords === undefined ? true : options.picturesWords;
      this.playAudio = options.playAudio === undefined ? true : options.playAudio;
      this.userLevel = options.userLevel === undefined ? 1 : options.userLevel;
      this.userExp = options.userExp === undefined ? 0 : options.userExp;
    }
  }

  setUserStatistics(data) {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('user_id');
    return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJson => {
        this.userStatistics = responseJson;
        console.log(responseJson, 'SET USER STATISTICS');
        return responseJson;
      });
  }

  getUserStatistics() {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('user_id');
    return fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 404) {
          this.userStatistics = {
            learnedWords: this.learnedWords.length,
            optional: {
              [moment().format('MM D YYYY')]: {
                correctAnswers: 0,
                incorrectAnswers: 0,
                words: []
              }
            }
          };
        } else {
          return response.json();
        }
      })
      .then(responseJson => {
        console.log(responseJson, 'GET USER STATISTICS');
        if (responseJson) this.userStatistics = responseJson;
        return responseJson;
      });
  }

  getStatisticsData(wordId, value) {
    let date = moment().format('MM D YYYY');
    if (!this.userStatistics.optional[date]) {
      this.userStatistics.optional[date] = {
        correctAnswers: 0,
        incorrectAnswers: 0,
        words: []
      };
    }
    if (value) {
      this.userStatistics.optional[date].correctAnswers += 1;
    } else {
      this.userStatistics.optional[date].incorrectAnswers += 1;
    }
    if (!this.userStatistics.optional[date].words.includes(wordId)) {
      this.userStatistics.optional[date].words.push(wordId);
    }
    let data = {
      learnedWords: this.userStatistics.learnedWords,
      optional: this.userStatistics.optional
    };
    return data;
  }

  getTodayProgress() {
    return this.userStatistics.optional[moment().format('MM D YYYY')].correctAnswers;
  }

  getExperienceGoal() {
    return this.trainingGoal * 10;
  }

  getNewWords() {
    // new word is the word when progress 0
    return this.learningWords.filter(word => word.optional.progress === 0).length;
  }

  isNewWord(wordId) {
    // new word is the word when progress 0
    const word = this.getAllWords().find(word => word.wordId === wordId);
    return word ? word.optional.progress === 0 : true;
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
            this.createUserWord(word.id, index + 1)
              .then(response => this.learningWords.push(response));
          }
        });
      });
    }
    return words;
  }

  increaseExperience() {
    this.userExp += 1;
    if (this.userExp >= 50) {
      this.userLevel += 1;
      this.userExp = 0;
    }
    this.setUserSettings(this.getUserSettingsData());
  }

  // UPDATE SINGLE USER OPTIONS

  // update optional.deletedWord
  updateDeletedWord(wordId, value) {
    if (value) {
      const index = this.learningWords.findIndex(word => word.wordId === wordId);
      this.userWord = this.learningWords.splice(index, 1)[0];
      this.deletedWords.push(this.userWord);
    } else {
      const index = this.deletedWords.findIndex(word => word.wordId === wordId);
      this.userWord = this.deletedWords.splice(index, 1)[0];
      this.learningWords.push(this.userWord);
    }
    this.userWord.optional.deletedWord = value;
    const wordData = {
      difficulty: this.userWord.difficulty,
      optional: this.userWord.optional
    };
    return this.updateUserWord(wordId, wordData).then(response => {
      console.log(response, 'updated delete word');
      return response;
    });
  }

  // update optional.difficultWord
  updateDifficultWord(wordId, value) {
    if (value) {
      const index = this.learningWords.findIndex(word => word.wordId === wordId);
      this.userWord = this.learningWords.splice(index, 1)[0];
      this.difficultWords.push(this.userWord);
    } else {
      const index = this.difficultWords.findIndex(word => word.wordId === wordId);
      this.userWord = this.difficultWords.splice(index, 1)[0];
      this.learningWords.push(this.userWord);
    }
    this.userWord.optional.difficultWord = value;
    let wordData = {
      difficulty: this.userWord.difficulty,
      optional: this.userWord.optional
    };
    return this.updateUserWord(wordId, wordData).then(response => {
      console.log(response, 'update difficult word');
      return response;
    });
  }

  // update optional.learnedWord
  updateLearnedWord(wordId, value) {
    if (value) {
      const index = this.learningWords.findIndex(word => word.wordId === wordId);
      this.userWord = this.learningWords.splice(index, 1)[0];
      this.learnedWords.push(this.userWord);
    } else {
      const index = this.learnedWords.findIndex(word => word.wordId === wordId);
      this.userWord = this.learnedWords.splice(index, 1)[0];
      this.learningWords.push(this.userWord);
    }
    this.userWord.optional.learnedWord = value;
    const wordData = {
      difficulty: this.userWord.difficulty,
      optional: this.userWord.optional
    };
    return this.updateUserWord(wordId, wordData).then(response => {
      console.log(response, 'updated learned word');
      return response;
    });
  }

  // update optional.progress
  updateProgressWord(wordId, value) {
    this.userLearningWord = this.learningWords.find(word => word.wordId === wordId);
    this.userDifficultWord = this.difficultWords.find(word => word.wordId === wordId);
    this.userWord = this.userDifficultWord || this.userLearningWord;
    if (value) {
      this.userWord.optional.progress = this.userWord.optional.progress >= 5
        ? this.userWord.optional.progress
        : this.userWord.optional.progress + 1;
      this.wordData = {
        difficulty: this.userWord.difficulty,
        optional: this.userWord.optional
      };
      this.increaseExperience();
    } else {
      this.userWord.optional.progress = this.userWord.optional.progress <= -5
        ? this.userWord.optional.progress
        : this.userWord.optional.progress - 1;
      this.wordData = {
        difficulty: this.userWord.difficulty,
        optional: this.userWord.optional
      };
    }
    // update difficulty if progress -5
    if (this.userWord.optional.progress <= -5) {
      this.updateDifficultWord(wordId, true);
    }
    // update learned if progress 5
    if (this.userWord.optional.progress >= 5) {
      this.updateLearnedWord(wordId, true);
    }
    // take stats here
    this.setUserStatistics(this.getStatisticsData(wordId, value));
    return this.updateUserWord(wordId, this.wordData).then(response => {
      console.log(response, 'update progress');
      return response;
    });
  }
}
