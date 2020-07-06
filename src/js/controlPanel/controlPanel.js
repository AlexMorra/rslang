import moment from 'moment';
import Chart from 'chart.js';
import wordCards from '../wordCards';
import * as utils from '../utils';
import wordsCardList from './wordsCardList';
import { usersAppState } from '../../app';

export default class ControlPanel extends wordsCardList {
  constructor() {
    super();
  }

  show() {
    setTimeout(() => {
      let controlPanelTab = this.beforeCreate(this.getTemplate());
      let controlPanel = controlPanelTab.querySelector('.control-panel');
      this.mainArea.append(controlPanelTab);
      this.getDayProgress();
      controlPanel.addEventListener('click', this.controlPanelHandler.bind(this));
    }, 400);
  }

  controlPanelHandler(e) {
    let targetId = e.target.id;
    let cardKey = [...e.target.classList].includes('cp-card') ? e.target.dataset.card
      : [...e.target.parentElement.classList].includes('cp-card') ? e.target.parentElement.dataset.card
        : false;
    if (cardKey) {
      utils.destroy();
      this.createWordList(wordCards[cardKey], cardKey);
    } else if (targetId === 'start-learning-btn') {
      document.getElementById('nav-training').click();
    }
  }

  beforeCreate(template) {
    let cardsWrapper = template.querySelector('.cp-cards');
    let cardTemplate = document.createElement('template');
    Object.keys(wordCards).forEach(card => {
      let userWordsInCard = usersAppState.getAllWords()
        .filter(obj => obj.difficulty === card).length;
      cardTemplate.innerHTML = `
             <div class="cp-card" data-card="${card}">
                <div class="card-title">Карточка ${card}</div>
                <div class="card-progress"> ${userWordsInCard} из ${wordCards[card].length} </div>
                <div class="card-control">1</div>
            </div>`;
      cardsWrapper.append(cardTemplate.content);
    });
    return template;
  }

  getDayProgress() {
    let dayProgressPercent = document.querySelector('.day-progress-percent');
    let percent = usersAppState.getTodayProgress() * 100 / usersAppState.getExperienceGoal();
    dayProgressPercent.textContent = `${percent >= 100 ? 100 : percent.toFixed(1)}%`;
    let ctx = document.getElementById('day-progress-chart');
    let myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Текущий опыт', 'Осталось'],
        datasets: [{
          data: [usersAppState.getTodayProgress(), usersAppState.getTodayProgress() >= usersAppState.getExperienceGoal() ? 0
            : usersAppState.getExperienceGoal() - usersAppState.getTodayProgress()],
          backgroundColor: [
            'rgba(54,162,235,0.6)',
            'rgba(54,162,235,0.11)'
          ],
          borderColor: [
            'rgba(54,162,235,0.6)',
            'rgba(54,162,235,0.6)'
            // 'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        }
      }
    });
  }

  getTemplate() {
    let template = document.createElement('template');
    template.innerHTML = `
        <div class="tab-wrapper control-panel">
          <div class="cp-header">
              <div class="cp-course">
                  <div class="course-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40"><defs><circle id="icon-gb_svg__a" cx="20" cy="20" r="20"></circle><circle id="icon-gb_svg__b" cx="20" cy="20" r="18"></circle></defs><g fill="none" fill-rule="evenodd" class="icon-gb_svg__icon-gb_svg__icon-gb_svg__language-gb-40"><use fill="#1A3B71" fill-opacity=".16" xlink:href="#icon-gb_svg__a" class="icon-gb_svg__icon-gb_svg__icon-gb_svg__language-gb-40__mask"></use><mask id="icon-gb_svg__c" fill="#fff"><use xlink:href="#icon-gb_svg__b"></use></mask><use fill="#D8D8D8" xlink:href="#icon-gb_svg__b" class="icon-gb_svg__icon-gb_svg__icon-gb_svg__language-gb-40__mask"></use><g mask="url(#icon-gb_svg__c)" class="icon-gb_svg__icon-gb_svg__icon-gb_svg__language-gb-40__english--british-"><path fill="#1A3B71" d="M.165 0h39.611v40.24H.165z" class="icon-gb_svg__icon-gb_svg__icon-gb_svg__language-gb-40__english--british-__rectangle-30-copy-2"></path><path fill="#FFF" d="M23.812 14.252V0h-7.495v14.528L.165 4.683v6.753l6.988 4.217H.165v8.894h6.988L.165 28.989v6.983L16.088 25.84v14.4h7.724v-14.4l15.964 9.936V28.99l-7.035-4.442h7.035v-8.894h-7.328l7.328-4.935v-6.31l-15.964 9.844z" class="icon-gb_svg__icon-gb_svg__icon-gb_svg__language-gb-40__english--british-__fill-7"></path><path fill="#FF4442" d="M17.517 0v17.086H.165c-.133.924-.121 5.295 0 6.173h17.352v16.98s4.25.08 4.96 0l-.17-16.98h17.469c.12-.878.133-5.25 0-6.173h-17.3V0h-4.959z" class="icon-gb_svg__icon-gb_svg__icon-gb_svg__language-gb-40__english--british-__fill-9"></path><path fill="#FF4442" d="M39.776 32.718c.329-.546 0-2.69 0-2.69l-8.67-5.287h-3.638l12.308 7.977z" class="icon-gb_svg__icon-gb_svg__icon-gb_svg__language-gb-40__english--british-__fill-11"></path><path fill="#FF4442" d="M23.857 15.358h3.626l12.293-7.254v-2.4z" class="icon-gb_svg__icon-gb_svg__icon-gb_svg__language-gb-40__english--british-__fill-13"></path><path fill="#FF4442" d="M.165 34.638l15.8-9.897h-3.621L.165 32.092" class="icon-gb_svg__icon-gb_svg__icon-gb_svg__language-gb-40__english--british-__fill-15"></path><path fill="#FF4442" d="M.165 7.441v2.475l8.554 5.442h3.653L.165 7.44z" class="icon-gb_svg__icon-gb_svg__icon-gb_svg__language-gb-40__english--british-__fill-17"></path></g></g></svg></div>
                  <div class="cp-language">английский</div>
              </div>
              <button type="button" class="cp-start-btn" id="start-learning-btn">
                  Начать обучениe
                  <span class="icon"><svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h20v20H0z"></path><path d="M12.709 10H.833A9.167 9.167 0 102 5.524" stroke="#F8F2EE" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.14 13.15a.617.617 0 00.1.88.65.65 0 00.9-.099l2.887-3.54a.615.615 0 000-.781L11.14 6.069a.65.65 0 00-.9-.099.617.617 0 00-.1.88L12.709 10l-2.57 3.15z" fill="#F8F2EE" fill-rule="nonzero"></path></g></svg></span>
              </button>
          </div>
          <div class="cp-stats">
              <div class="cp-stats-today">
                  <h2 class="stats-title">Статистика</h2>
                  <div class="stats-part1">
                      <div class="word-for-practice">
                          <div>Слова для практики</div>
                          <span>${usersAppState.learningWords.length}</span>
                      </div>
                      <div class="best-series">
                          <div>Лучшая серия</div>
                          <span>${usersAppState.bestSeries}</span>
                      </div>
                  </div>
                  <hr>
                  <div class="stats-part2">
                      <div class="total-word-practice">
                          <div>Пройдено слов</div>
                          <span>${usersAppState.learnedWords.length}</span>
                      </div>
                      <div class="correct-repetitions">
                          <div>Правильные ответы</div>
                          <span>${usersAppState.getCorrectPercent()}%</span>
                      </div>
                      <div class="new-words">
                          <div>Новые слова</div>
                          <span>${usersAppState.getNewWords()}</span>
                      </div>
                  </div>
              </div>
              <div class="cp-stats-progress">
                  <h2 class="stats-title">Ежедневная цель</h2>
                  <div class="day-progress-wrapper">
                    <span class="day-progress-percent"></span>
                    <canvas id="day-progress-chart" width="200" height="200"></canvas>
                  </div>
              </div>
          </div>
          <div class="cp-cards">
              <h2>Карточки слов</h2>
          </div>
        </div>
    `;
    return template.content;
  }
}
