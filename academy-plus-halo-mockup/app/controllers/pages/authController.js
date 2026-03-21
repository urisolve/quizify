// Render register success page
const renderRegisterSuccess = (req, res) => {
    res.render('pages/register_success');
};

module.exports = {
    renderRegisterSuccess
};
const authWarningController = (req, res) => {
    res.renderPage('auth-warning', {
        layout: 'main',
        headerTitle: 'restricted_access'
    });
}

const loginController = (req, res) => {
    res.renderPage('login', {
        layout: 'main',
        headerTitle: 'login',
    });
};

const registerController = (req, res) => {
    res.renderPage('register', {
        layout: 'main',
        headerTitle: 'register',
    });
};

const passwordRecoveryController = (req, res) => {
    res.renderPage('password-recovery', {
        layout: 'main',
        headerTitle: 'password_recovery',
    });
};

module.exports = {
    authWarningController,
    loginController,
    registerController,
    passwordRecoveryController,
    renderRegisterSuccess
};