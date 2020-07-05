import { usersAppState } from '../../../app';

export default class EnglishPuzzleHintsBlock {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.usersAppState = usersAppState;
  }

  getHintsBlock() {
    const targetNode = document.querySelector('.english-puzzle-main');
    const hintsBlock = `
    <div class="english-puzzle-main__control-block">
        <div class="english-puzzle-main__control-block__hints">
          <button class="english-puzzle-main__control-block__hints__translate blocked"></button>
          <button class="english-puzzle-main__control-block__hints__audio-repeat"></button>
        </div>
    `.trim();
    targetNode.insertAdjacentHTML('beforeend', hintsBlock);
    return hintsBlock.content;
  }

  async getAudioHint(audioSrc) {
    await this.usersAppState.getUserSettings();
    const audioBtn = document.querySelector('.english-puzzle-main__control-block__hints__audio-repeat');
    if (this.usersAppState.playAudio) {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = `https://raw.githubusercontent.com/yarkin13/rslang-data/master/${audioSrc}`;
      audio.play();
    } else {
      audioBtn.style.backgroundImage = 'url(../../../assets/images/sound-off.svg)';
    }
  }
}
