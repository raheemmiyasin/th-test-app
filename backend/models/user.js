const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    last_login_at: {
        type: Number,
        default: Date.now()
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('User', UserSchema);