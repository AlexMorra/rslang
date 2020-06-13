import words from './words';

export class ControlPanel {
  constructor() {
    this.mainArea = document.querySelector('.main-area');
    this.controlPanelTemplate = document.getElementById('control-panel');
  }

  show() {
    setTimeout(() => {
      let controlPanelTab = this.beforeCreate(this.controlPanelTemplate);
      this.mainArea.prepend(controlPanelTab);
    }, 400);
  }

  beforeCreate(template) {
    let controlPanelTab = template.content.cloneNode(true);
    return controlPanelTab;
  }
}
