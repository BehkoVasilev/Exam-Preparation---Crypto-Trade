const authService = require("../service/authService");
const { parserMongooseErrors } = require("../utils/errorUtils");

exports.getRegisterController = (req, res) => {
    res.render('auth/register');

};

exports.postRegisterController = async (req, res) => {
    const { username, email, password, repassword } = req.body;

    if (repassword == '') {
        return res.render('auth/register', { error: `Confirm password is required!` });

    }

    if (password !== repassword) {

        return res.render('auth/register', { error: `Password does not match!` });
    };

    const existingUser = await authService.getUserByEmail(email);

    if (existingUser) {
        return res.render('auth/register', { error: `User already exists!` })
    }
    try {
        const user = await authService.register(username, email, password);
        console.log(user);
    } catch (err) {
        console.log(err);
        const errors = parserMongooseErrors(err);
        return res.render('auth/register', { error: errors[0] });
    }

    res.redirect('/login')
};

exports.getLoginController = (req, res) => {
    res.render('auth/login')
};

exports.postLoginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        res.cookie('auth', token, { httpOnly: true });

    } catch (err) {
        // const errors = parserMongooseErrors(err);
        return res.render('auth/login', { error: err.message });
    }

    res.redirect('/')
};