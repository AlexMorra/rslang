export default class SpeakIt {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
  }

  show() {
    setTimeout(()=>{
      this.mainArea.innerHTML = this.getTemplate();
      console.log('template');
    }, 400);
  }

  getTemplate() {
    const template = `
        <div class="tab-wrapper speakit">

          <div class="speakit__level-block">
              <p class="speakit__level-block--name">Levels</p>
              <ul class="speakit__levels">
                  <li class="level active-level"></li>
                  <li class="level"></li>
                  <li class="level"></li>
                  <li class="level"></li>
                  <li class="level"></li>
                  <li class="level"></li>
              </ul>
          </div>

          <div class="speakit__image-block">
              <img class="speakit__image" src="./../../../assets/files/01_0001.jpg" alt="image">
              <p class="speakit__image-name">пазл</p>
          </div>

          <div class="speakit__words">

                  <div class="word active-word">
                      <img class="word-speaker" src="./../../../assets/icons/speaker.png" alt="speaker">
                      <p class="word-english">audience</p>
                      <p class="word-transcription">[pu:zl]</p>  
                  </div>  
                  <div class="word">
                      <img class="word-speaker" src="./../../../assets/icons/speaker.png" alt="speaker">
                      <p class="word-english">puzzle</p>
                      <p class="word-transcription">[pu:zl]</p>  
                  </div>  
                  <div class="word">
                      <img class="word-speaker" src="./../../../assets/icons/speaker.png" alt="speaker">
                      <p class="word-english">puzzle</p>
                      <p class="word-transcription">[pu:zl]</p>  
                  </div>  
                  <div class="word">
                      <img class="word-speaker" src="./../../../assets/icons/speaker.png" alt="speaker">
                      <p class="word-english">puzzle</p>
                      <p class="word-transcription">[pu:zl]</p>  
                  </div>  
                  <div class="word">
                      <img class="word-speaker" src="./../../../assets/icons/speaker.png" alt="speaker">
                      <p class="word-english">puzzle</p>
                      <p class="word-transcription">[pu:zl]</p>  
                  </div>  
                  <div class="word">
                      <img class="word-speaker" src="./../../../assets/icons/speaker.png" alt="speaker">
                      <p class="word-english">puzzle</p>
                      <p class="word-transcription">[pu:zl]</p>  
                  </div>  
                  <div class="word">
                      <img class="word-speaker" src="./../../../assets/icons/speaker.png" alt="speaker">
                      <p class="word-english">puzzle</p>
                      <p class="word-transcription">[pu:zl]</p>  
                  </div>  
                  <div class="word">
                      <img class="word-speaker" src="./../../../assets/icons/speaker.png" alt="speaker">
                      <p class="word-english">puzzle</p>
                      <p class="word-transcription">[pu:zl]</p>  
                  </div>  
                  <div class="word">
                      <img class="word-speaker" src="./../../../assets/icons/speaker.png" alt="speaker">
                      <p class="word-english">puzzle</p>
                      <p class="word-transcription">[pu:zl]</p>  
                  </div>  
                  <div class="word">
                      <img class="word-speaker" src="./../../../assets/icons/speaker.png" alt="speaker">
                      <p class="word-english">puzzle</p>
                      <p class="word-transcription">[pu:zl]</p>  
                  </div>  

          </div>

          <div class="speakit__nav">
              <button class="button-submit button-short" type="submit">Restart</button>
              <button class="button-submit button-long" type="submit">Speak please</button>
              <button class="button-submit button-short" type="submit">Results</button>
          </div>

        </div>
    `;
    return template;
  }
}
