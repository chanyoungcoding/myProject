const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'User name is blank']
    },
    password: {
        type: String,
        required: [true, 'Password is blank']
    }
})

module.exports = mongoose.model('User', userSchema);