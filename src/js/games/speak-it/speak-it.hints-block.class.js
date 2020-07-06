import { usersAppState } from '../../../app';

export default class SpeakItHintsBlock {
  getHintsBlock() {
    this.createHintsBlock();
    this.defineHintsState();
  }

  createHintsBlock() {
    const targetNode = document.querySelector('.speak-it__main');
    const hintsBlock = document.createElement('template');
    hintsBlock.innerHTML = `
    <div class="speak-it__main__hints-block">
      <button class="speak-it__main__hints-block__audio"></button>
      <button class="speak-it__main__hints-block__transcription">transcription</button>
    </div>
    `;
    targetNode.append(hintsBlock.content);
  }

  defineHintsState() {
    const audioBtn = document.querySelector('.speak-it__main__hints-block__audio');
    const transcriptionBtn = document.querySelector('.speak-it__main__hints-block__transcription');
    if (!usersAppState.playAudio) {
      audioBtn.style.backgroundImage = 'url(../../../assets/images/sound-off.svg)';
    }
    if (!usersAppState.transcription) {
      transcriptionBtn.classList.add('blocked');
    }
  }
}
