const mongoose = require('mongoose');

module.exports = () => {
    const connectionString = (process.env.DB_USER && process.env.DB_PASS) ? `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@127.0.0.1:27017/${process.env.DB_NAME}` : `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`;

    mongoose.Promise = global.Promise;
    mongoose.connect(connectionString)
        .then(() => console.log('MongoDB connected to:', connectionString))
        .catch((err) => {
            console.error('MongoDB connection error:', err);
        });
};