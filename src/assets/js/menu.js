let nav_menu = document.querySelector('.nav-menu');
let btn_rs_lang = document.querySelector('#rs_lang');

nav_menu.addEventListener('click', menu_handler);
btn_rs_lang.addEventListener('click', () => {
    nav_menu.classList.toggle('open');
});

function menu_handler(e) {
    let nav_header = [...e.target.classList].includes('nav-header') ||
        [...e.target.parentElement.classList].includes('nav-header');
    if (nav_header) {
        nav_menu.classList.toggle('open');
    }
}