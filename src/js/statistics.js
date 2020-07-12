import moment from 'moment';
import Chart from 'chart.js';
import { usersAppState } from '../app';

export default class Statistics {
  getUserStats() {
    let ctx = document.getElementById('stats-chart');
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.getDaysInMonth(),
        datasets: [{
          label: 'Правильных ответов',
          data: this.getData('correctAnswers'),
          backgroundColor: 'rgba(0,255,0,0)',
          borderColor: [
            'rgba(24,255,0,0.8)'
          ],
          borderWidth: 2
        },
        {
          label: 'Неправильных ответов',
          data: this.getData('incorrectAnswers'),
          backgroundColor: 'rgba(0,255,0,0)',
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 2
        },
        {
          label: 'Слов тренированно',
          data: this.getData('trainingTimes'),
          backgroundColor: 'rgba(0,255,0,0)',
          borderColor: [
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }

  getDate() {
    return moment().format('MM D YYYY');
  }

  getDaysInMonth() {
    return Array.from({ length: moment().daysInMonth() }, ((v, k) => k + 1));
  }

  getData(value) {
    return this.getDaysInMonth().slice().map(day => {
      let date = this.getDate();
      date = date.split(' ');
      date.splice(1, 1, day);
      date = date.join(' ');
      let data = usersAppState.userStatistics.optional[date];
      if (data) {
        return data[value];
      }
      return 0;
    });
  }
}
