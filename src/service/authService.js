const jwt = require('../lib/jwt');

const User = require('../models/User');
const { SECRET } = require('../constants');



exports.getUserByEmail = (email) => User.findOne({ email });

exports.register = (username, email, password) => User.create({ username, email, password });

exports.login = async (email, password) => {
    const user = await this.getUserByEmail(email)

    if (user === null) {
        throw new Error('Invalid email or password!');
    };

    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('Invalid email or password!');
    }

    const payload = { _id: user._id, email: user.email, username: user.username };
    const options = { expiresIn: '4h' };
    
    const token = await jwt.sign(payload, SECRET, options);
    
    
    return token
}

