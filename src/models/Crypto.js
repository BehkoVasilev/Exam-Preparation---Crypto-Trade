const { default: mongoose } = require('mongoose');
const mognoose = require('mongoose');

const cryptoSchema = new mognoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^(http(s)?:\/\/)/, 'Invalid Url']
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
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