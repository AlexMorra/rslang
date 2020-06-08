export class ControlPanel {
    constructor() {
        this.main_area = document.querySelector('.main-area');
        this.control_panel = document.getElementById('control-panel')
    }

    show() {
        setTimeout(() => {
            this.main_area.prepend(this.control_panel.content.cloneNode(true));
        }, 400)
    }
}