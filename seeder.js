require('dotenv').config();
var UserModel = require('./models/User');
require('./config/db')();

UserModel.register(new UserModel({
    email: 'admin@admin.com',
    firstName: 'Administrator',
    lastName: 'Admin',
    role: 'ADMIN'
}),
'123456',
(err) => {
    if (err) {
        console.error(err);
    } else {
        console.info("user created successfully");
    }
});
