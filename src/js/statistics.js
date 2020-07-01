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
          label: 'Correct answers',
          data: this.getData('correctAnswers'),
          backgroundColor: 'rgba(0,255,0,0)',
          borderColor: [
            'rgba(24,255,0,0.8)'
          ],
          borderWidth: 2
        },
        {
          label: 'Incorrect answers',
          data: this.getData('incorrectAnswers'),
          backgroundColor: 'rgba(0,255,0,0)',
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 2
        },
        {
          label: 'Trained words',
          data: this.getData('words'),
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
    return Array.from({ length: moment().daysInMonth() }, ((v, k) => {
      return k + 1 < 10 ? `0${k + 1}` : (k + 1).toString();
    }));
  }

  getData(value) {
    return this.getDaysInMonth().slice().map(day => {
      let date = this.getDate();
      date = date.split(' ');
      date.splice(1, 1, day);
      date = date.join(' ');
      let data = usersAppState.userStatistics.optional[date];
      if (data) {
        if (value === 'words') {
          return data[value].length;
        }
        return data[value];
      }
      return 0;
    });
  }
}
