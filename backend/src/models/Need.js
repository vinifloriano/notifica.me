const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const NeedSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: String,
    category: String,
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});


module.exports = mongoose.model('Need', NeedSchema);