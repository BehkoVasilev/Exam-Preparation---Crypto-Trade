const mognoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mognoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [5, 'Username is incorrect.']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: [10, 'Email is incorrect.']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [5, 'Password is incorrect.']
    }

})

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            next();
        });
});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
})

const User = mognoose.model('User', userSchema);

module.exports = User;
