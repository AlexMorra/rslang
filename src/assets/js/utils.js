let main_area = document.querySelector('.main-area');
let tab_wrapper = document.querySelector('.tab-wrapper');

export function destroy() {
    let tab_wrapper = document.querySelector('.tab-wrapper');
    tab_wrapper.classList.add('destroy');
    setTimeout(() => main_area.innerHTML = '', 400);
}

export function create() {

}