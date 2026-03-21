const bcrypt = require('bcrypt');
const User = require('../../models/User');
const { getLevelFromScore, getLevelProgressPercent } = require('../../utils/level');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user exists
        console.log('Checking if user exists...');
        const existingUser = await User.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: req.t('auth.user_exists') });
        }

        if (!password ||
            password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[0-9]/.test(password) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(password)
        ) {        
            return res.status(400).json({
                message: req.t('auth.password_requirements')
            });
        }

        // Hash password
        const saltRounds = 10;
        console.log('Hashing password...');
        const passwordHash = await bcrypt.hash(password, saltRounds);
        console.log('Password hashed:', passwordHash);

        // Avatar icon (default)
        //TODO: Atualizar conforme o que for adicionado no avatar
        const avatar_icon = [
            "face:shape_01", "face:color_01",
            "eyes:shape_01", "eyes:color_01",
            "nose:shape_01", "mouth:shape_01",
            "hair:style_01", "glasses:style_01"
        ];
        const avatarIcon = JSON.stringify(avatar_icon);

        // Save user
        const userId = await User.createUser({ username, email, passwordHash});

        // Send success response with redirect URL
        return res.status(201).json({ 
            message: req.t('auth.user_created'), 
            redirectTo: '/register-success' 
        });
    } catch (err) {
        console.error('Registration error:', err);
        /* console.log(err); */
        res.status(500).json({ message: req.t('auth.internal_server_error'), err });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: req.t('auth.invalid_credentials') });
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ message: req.t('auth.invalid_credentials') });
        }


        // Compute level from score (default 0 if missing)
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            level: getLevelFromScore(user.exp || 0),
            levelProgress: getLevelProgressPercent(user.exp || 0),
            avatar: user.avatar_url,
            exp: user.exp || 0,
            hide_name: user.hide_name || false,
            private_account: user.private_account || false,
            name: user.name,
            date_of_birth: user.date_of_birth
        };


        const redirectTo = '/';

        res.status(200).json({ message: req.t('auth.login_successful'), redirectTo });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: req.t('auth.internal_server_error') });
    }
};

const passwordRecovery = async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res.status(400).json({ message: req.t('auth.all_fields_required') });
    }

    try {
        // Find user by email
        const user = await User.findUserByEmail(email);
        if (!user || user.username !== username) {
            return res.status(404).json({ message: req.t('auth.user_not_found') });
        }

        // Hash new password
        const passwordHash = await bcrypt.hash(password, 10);

        // Update password
        await User.updateUserPassword(user.id, passwordHash);

        res.status(200).json({ message: req.t('auth.password_updated') });
    } catch (err) {
        console.error('Password recovery error:', err);
        res.status(500).json({ message: req.t('auth.internal_server_error') });
    }
};

module.exports = {
    registerUser,
    loginUser,
    passwordRecovery,
};