const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  firstName: {
      type: String,
      required: true   
  },
  lastName: {
      type: String,
      required: true   
  },
  email: { 
    type: String, 
    required: true ,
    unique: true
  },
  client_ip: String,
  user_agent: String,
  password: String,
  last_login: {
    type: Date
  }
}, {
    timestamps: true
});
UserSchema.methods.addLastLogin = function(obj, callback) {
  return this.model('User').findByIdAndUpdate(this.id, { $set: { 
      'last_login': Date('2016-08-18'),
      'client_ip': obj.client_ip,
      'user_agent': obj.user_agent
     }}, { new: true }, callback);
};
const options = { 
    usernameField: 'email',
    errorMessages: {
        UserExistsError: "A user with the given username/email-ID is already registered."
    }
};
UserSchema.plugin(passportMongoose, options);

module.exports = mongoose.model('User', UserSchema);