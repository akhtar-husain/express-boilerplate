const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, required: true},
    username: { type: String, required: true, index: { unique: true } },
    password: {type: String}
}, {
  timestamps: true
});

//UserSchema.index({ email: 1, username: 1 }, { unique: true });
UserSchema.plugin(passportMongoose);

module.exports = mongoose.model('User', UserSchema);