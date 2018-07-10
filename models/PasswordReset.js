const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PasswordResets = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String
    },
    expired: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PasswordResets', PasswordResets);