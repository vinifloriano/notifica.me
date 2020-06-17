const axios = require('axios');
const User = require('../models/User');
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections } = require('../websocket');

module.exports = {
    async store(request, response) {
        const { username, techs, latitude, longitude } = request.body;
        
        let user = await User.findOne({ username });

        if(!user) {
            const apiResponse = await axios.get(`https://api.github.com/users/${username}`);
            //const endereco = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const {name = login, avatar_url, bio = 'Este usuário não possui bio'} = apiResponse.data;
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            
            const techsArray = parseStringAsArray(techs);

            user = await User.create({
                name,
                username,
                bio,
                avatar_url,
                techs: techsArray,
                location,
            });

            // Filtrar as conexões que estão há no maximo 10 km de distancia e que o novo usuario tenha pelo menos uma das tecnologias

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            );
            
        }

        return response.json(user);
    },
    async index(request, response) {
        const users = await User.find();
        return response.json(users);
    } 
}