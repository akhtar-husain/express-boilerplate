const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    SALT_WORK_FACTOR = 10,
    passportMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, required: true},
    username: { type: String, required: true, index: { unique: true } },
    password: {type: String, required: true}
});

UserSchema.plugin(passportMongoose);

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) {
      return next();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
          return next(err);
        }
        
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
              return next(err);
            }
            
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = (candidatePassword, cb) => {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
          return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);