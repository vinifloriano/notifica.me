const Need = require('../models/Need');

module.exports = {
    async store(request, response) {
        const { filename } = request.file;
        const { name, desc, category, latitude, longitude } = request.body;

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        need = await Need.create({
            name,
            desc,
            img: filename,
            category,
            location,
        });

        return response.json(need);
    },

    async index(request, response) {
        const need = await Need.find();
        return response.json(need);
    } 
}