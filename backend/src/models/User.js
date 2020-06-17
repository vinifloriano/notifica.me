const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profile_photo: String,
    interest: []
});


module.exports = mongoose.model('User', UserSchema);