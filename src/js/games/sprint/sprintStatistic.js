export default class SprintStatistic {
  constructor() {
    this.points = 0;
    this.allWrongAnswers = 0;
    this.allCorrectAnswers = 0;
    this.message = '';
    this.element = this.getStatistic();
  }

  getStatistic() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="sprint__statistic">
        <p class="sprint__statistic-message">${this.message}</p>
        <p class="sprint__statistic-result">Результат: ${this.points} очков</p>
        <p class="sprint__statistic-averageResult">Ошибок: ${this.allWrongAnswers}</p>
        <p class="sprint__statistic-maxResult">Знаю: ${this.allCorrectAnswers}</p>
        <div class="sprint__statistic-btn j-statisticBtn">
            <button class="sprint__statistic-btn-item button j-playAgain">Играть снова</button>
        </div>
      </div>
    `;
    return template.content;
  }
}
