const { default: mongoose } = require('mongoose');
const mognoose = require('mongoose');

const cryptoSchema = new mognoose.Schema({
    name: {
        type: [String, 'Name is required!'],
        minLength: [2, 'Name must be at least 2 characters!'],
        required: true
    },
    imageUrl: {
        type: [String, 'Image is required!'],
        required: true,
        match: [/^(http(s)?:\/\/)/, 'Invalid Url']
    },
    price: {
        type: [Number, 'Price is required!'],
        min: [0, 'Number must be positive!'],
        required: true
    },
    description: {
        type: [String, 'Description is required!'],
        minLength: [10, 'Name must be at least 2 characters!'],
        required: true
    },
    method: {
        type: String,
        required: true,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],

    },
    buyers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Crypto = mognoose.model('Crypto', cryptoSchema);

module.exports = Crypto