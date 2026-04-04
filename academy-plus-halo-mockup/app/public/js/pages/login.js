import { enableButtonOnFilledFields } from '../ui/formButtonUI.js';
import { registerAuthUI } from '../ui/authUI.js';

document.addEventListener('DOMContentLoaded', () => {
    registerAuthUI();
    enableButtonOnFilledFields('login-form', 'login-button');
});
