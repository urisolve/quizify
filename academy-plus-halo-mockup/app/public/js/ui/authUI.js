//* Global variables
const HTMLELEMENTS = { //* HTML elements used in this page
    //* Permanent elements
    authPage: document.querySelector(".auth-container"),
    loginForm: document.querySelector("#login-form"),
    registerForm: document.querySelector("#register-form"),
    recoveryForm: document.querySelector("#recovery-form"),
};

export async function registerAuthUI() {
    console.log('Registering auth UI...');
    if(!HTMLELEMENTS.authPage) return;

    if(HTMLELEMENTS.loginForm) {
        console.log('Login form found, adding event listener...');
        HTMLELEMENTS.loginForm.addEventListener('submit', async (e) => {
            console.log("Carregou");
            e.preventDefault();
            const formData = new FormData(HTMLELEMENTS.loginForm);
            const body = Object.fromEntries(formData.entries());

            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await res.json();
            const messageDiv = document.getElementById('login-message');
            if (res.ok) {
                console.log('Login successful!');
                window.location.href = data.redirectTo;
            } else {
                console.log(data.message || 'Login failed');
                if (messageDiv) {
                    messageDiv.textContent = data.message || 'Login failed';
                    messageDiv.style.color = 'red';
                }
            }
        });
    }

    if(HTMLELEMENTS.registerForm) {
        HTMLELEMENTS.registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Register form submitted');
            const formData = new FormData(HTMLELEMENTS.registerForm);
            const body = Object.fromEntries(formData.entries());

            /* console.log('Form data:', body); */
            const res = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await res.json();
            const messageDiv = document.getElementById('register-message');
            if (res.ok) {
                console.log('Registration successful!');
                // Use redirectTo from response or fallback to login page
                const redirectUrl = data.redirectTo || '/login';
                window.location.href = redirectUrl;
            } else {
                console.log(data.message || 'Registration failed');
                if (messageDiv) {
                    messageDiv.textContent = data.message || 'Registration failed';
                    messageDiv.style.color = 'red';
                }
            }
        });
    }

    if (HTMLELEMENTS.recoveryForm) {
        HTMLELEMENTS.recoveryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(HTMLELEMENTS.recoveryForm);
            const body = Object.fromEntries(formData.entries());

            const res = await fetch('/auth/password-recovery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await res.json();
            if (res.ok) {
                alert('Password changed successfully!');
                window.location.href = '/login';
            } else {
                alert(data.message || 'Password recovery failed');
            }
        });
    }
}