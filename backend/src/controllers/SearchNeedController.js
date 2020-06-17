const Need = require('../models/Need')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response) {
        const { latitude, longitude, interest } = request.query;

        const interestArray = interest == '' ? {
            $nin: ''
        } : {
            $in: parseStringAsArray(interest)
        };

        const needs = await Need.find({
            category: interestArray,
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 15000,
                },
            },
        });
         
        return response.json({ needs });
    }
}