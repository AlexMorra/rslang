let create_password_input = document.querySelector('.user-password');
let show_password_btn = document.querySelector('.show-password');


show_password_btn.addEventListener('click', (e) => {
    let input_type = create_password_input.getAttribute('type');
    if (input_type === 'password') {
        create_password_input.setAttribute('type', 'text');
        show_password_btn.classList.remove('fa-eye-slash');
        show_password_btn.classList.add('fa-eye')
    } else if (input_type === 'text') {
        create_password_input.setAttribute('type', 'password');
        show_password_btn.classList.add('fa-eye-slash');
        show_password_btn.classList.remove('fa-eye')
    }
});