const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const CompanySchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profile_photo: String,
    interest: [],
    cep: String,
    location: {
        type: PointSchema,
        index: '2dsphere'
    }

});


module.exports = mongoose.model('Company', CompanySchema);