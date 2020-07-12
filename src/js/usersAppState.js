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
    this.bestSeries = 0;
    this.appSound = true;
    // game options
    this.learningWords = [];
    this.difficultWords = [];
    this.deletedWords = [];
    this.learnedWords = [];
    // statistics
    this.userStatistics = {};
  }

  // repeatWord(id) {
  //   const word = this.getAllWords().find(word => word.wordId === id);
  //   console.log(word);
  //   console.log(word.optional.lastAction);
  //   let date1 = word.optional.lastAction;
  //   let date2 = moment().format('MM D YYYY HH:mm');
  //   let total = (new Date(date2) - new Date(date1)) / 60000;
  //   console.log(total);
  // }

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
        progress: 0,
        lastAction: moment().format('MM D YYYY HH:mm'),
        forceRepeat: false
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
        userExp: this.userExp,
        bestSeries: this.bestSeries,
        appSound: this.appSound
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
      this.bestSeries = options.bestSeries === undefined ? 0 : options.bestSeries;
      this.appSound = options.appSound === undefined ? true : options.appSound;
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
        let date = moment().format('MM D YYYY');
        if (response.status === 404) {
          this.userStatistics = {
            learnedWords: this.learnedWords.length,
            optional: {
              [date]: {
                correctAnswers: 0,
                incorrectAnswers: 0,
                trainingTimes: 0
              }
            }
          };
        } else {
          return response.json();
        }
      })
      .then(responseJson => {
        console.log(responseJson, 'GET USER STATISTICS');
        if (responseJson) {
          this.userStatistics = responseJson;
          this.getStatisticsData();
        }
        return responseJson;
      });
  }

  getStatisticsData(value) {
    let date = moment().format('MM D YYYY');
    if (!this.userStatistics.optional[date]) {
      console.log(this.userStatistics);
      this.userStatistics.optional[date] = {
        correctAnswers: 0,
        incorrectAnswers: 0,
        trainingTimes: 0
      };
    }
    if (value) {
      this.userStatistics.optional[date].correctAnswers += 1;
    } else {
      this.userStatistics.optional[date].incorrectAnswers += 1;
    }
    this.userStatistics.optional[date].trainingTimes += 1;
    return {
      learnedWords: this.userStatistics.learnedWords,
      optional: this.userStatistics.optional
    };
  }

  getTodayProgress() {
    return this.userStatistics.optional[moment().format('MM D YYYY')].correctAnswers;
  }

  getIncorrectAnswers() {
    return this.userStatistics.optional[moment().format('MM D YYYY')].incorrectAnswers;
  }

  getExperienceGoal() {
    return this.trainingGoal * 10;
  }

  getCorrectPercent() {
    return (100 / (this.getIncorrectAnswers() + this.getTodayProgress()) * this.getTodayProgress()).toFixed(1);
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
    this.words = [];

    // return words and add from cards to the user dictionary if words not enough
    let heightPriorityWords = [...this.learningWords, ...this.difficultWords].filter(word => word.optional.forceRepeat);
    let test = (count - heightPriorityWords.length) < 0 ? 0 : count - heightPriorityWords.length;
    if (test) {
      this.words = [...this.learningWords, ...this.difficultWords].slice()
        .filter(word => !word.optional.forceRepeat)
        .sort(() => 0.5 - Math.random()).slice(0, test)
        .map(obj => {
          return wordCards[obj.difficulty].find(word => word.id === obj.wordId);
        });
    } else {
      heightPriorityWords = heightPriorityWords.sort(() => 0.5 - Math.random()).slice(0, count);
    }

    heightPriorityWords = heightPriorityWords.map(obj => {
      return wordCards[obj.difficulty].find(word => word.id === obj.wordId);
    });
    // console.log(heightPriorityWords.length, 'PRIORITY');
    // console.log(heightPriorityWords);
    // console.log(words.length, 'WORDS');
    // console.log(words);
    this.words = this.words.concat(heightPriorityWords);
    // console.log(words.length);
    // console.log(words);
    if (this.words.length < count) {
      Object.values(wordCards).forEach((card, index) => {
        card.forEach(word => {
          if (!this.words.includes(word) && this.words.length < count) {
            this.words.push(word);
            console.log(word.id);
            this.createUserWord(word.id, index + 1)
              .then(response => this.learningWords.push(response));
          }
        });
      });
    }
    return this.words;
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
    const indexLearned = this.learningWords.findIndex(word => word.wordId === wordId);
    const indexDifficult = this.difficultWords.findIndex(word => word.wordId === wordId);

    if (value) {
      if (indexLearned !== -1) {
        this.userWord = this.learningWords.splice(indexLearned, 1)[0];
        this.difficultWords.push(this.userWord);
      }
    } else if (indexDifficult !== -1) {
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
    const wordData = {
      difficulty: this.userWord.difficulty,
      optional: this.userWord.optional
    };
    if (!value) wordData.optional.progress = 0;
    this.userWord.optional.learnedWord = value;
    return this.updateUserWord(wordId, wordData).then(response => {
      console.log(response, 'updated learned word');
      return response;
    });
  }

  // update optional.forceRepeat
  updateForceRepeatWord(wordId, value) {
    this.userWord = [...this.learningWords, ...this.difficultWords]
      .find(word => word.wordId === wordId);
    this.wordData = {
      difficulty: this.userWord.difficulty,
      optional: this.userWord.optional
    };
    this.wordData.optional.forceRepeat = value;
    return this.updateUserWord(wordId, this.wordData).then(response => {
      console.log(response, 'lol kek cheburek');
      return response;
    });
  }

  // update optional.progress
  updateProgressWord(wordId, value) {
    this.userLearningWord = this.learningWords.find(word => word.wordId === wordId);
    this.userDifficultWord = this.difficultWords.find(word => word.wordId === wordId);
    this.userWord = this.userDifficultWord || this.userLearningWord;
    if (value) {
      this.bestSeries += 1;
      this.userWord.optional.progress = this.userWord.optional.progress >= 5
        ? this.userWord.optional.progress
        : this.userWord.optional.progress + 1;
      this.wordData = {
        difficulty: this.userWord.difficulty,
        optional: this.userWord.optional
      };
      this.increaseExperience();
    } else {
      this.bestSeries = 0;
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
    // update bestseries here
    this.setUserSettings(this.getUserSettingsData());
    // take stats here
    this.setUserStatistics(this.getStatisticsData(value));
    this.wordData.optional.lastAction = moment().format('MM D YYYY HH:mm');
    return this.updateUserWord(wordId, this.wordData).then(response => {
      console.log(response, 'update progress');
      return response;
    });
  }
}
