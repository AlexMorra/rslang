import State from '../../usersAppState';

export default class EnglishPuzzleHintsBlock {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.state = new State();
  }

  getHintsBlock() {
    const hintsBlock = document.createElement('template');
    const targetNode = document.querySelector('.english-puzzle-main');
    hintsBlock.innerHTML = `
    <div class="english-puzzle-main__control-block">
        <div class="english-puzzle-main__control-block__hints">
          <button class="english-puzzle-main__control-block__hints__translate blocked"></button>
          <button class="english-puzzle-main__control-block__hints__audio-repeat blocked"></button>
        </div>
    `.trim();
    targetNode.append(hintsBlock.content);
    return hintsBlock.content;
  }

  async getAudioHint(audioSrc) {
    await this.state.getUserSettings();
    const audioBtn = document.querySelector('.english-puzzle-main__control-block__hints__audio-repeat');
    if (this.state.playAudio) {
      audioBtn.classList.remove('blocked');
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = `https://raw.githubusercontent.com/yarkin13/rslang-data/master/${audioSrc}`;
      audio.play();
    }
  }
}
