// index: listagem de Sessões, show: mostrar uma unica sessão, store: criar uma sessão, update, destroy
const Company = require('../models/Company');
const crypto = require("crypto");
const parseStringAsArray = require('../utils/parseStringAsArray')

//    const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
//    decipher.update(senha, DADOS_CRIPTOGRAFAR.tipo);


module.exports = {
    async store(req, res) {
        const { filename } = req.file;
        const { name, email, password, interest, cep, latitude, longitude } = req.body;

        let company = await Company.findOne({ email });

        if(!company) {

            const interestArray = parseStringAsArray(interest);
            const newpassword = crypto.createHmac('sha256', password).update(password).digest('hex');
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            company = await Company.create({ 
                name, 
                email, 
                password,
                newpassword, 
                profile_photo: filename, 
                interest:  interestArray,
                cep,
                location
            });

            return(company)
        }
        else {
            return res.json({validation: "false", desc: "Company has already been created"});
        }

        return res.json({validation: "false", desc: "Undentify error"});
    },
    async show(req, res) {
        const { email, password } = req.body;

        let company = await Company.findOne({ email });

        if(company) {
            const new_password = crypto.createHmac('sha256', password).update(password).digest('hex');
            if(company.senha === new_password) {
                return res.json(company);
            }
            else {
                return res.json({validation: "false", desc: "Incorrect Password"});
            }
        }
        else {
            return res.json({validation: "false", desc: "Company not found"});
        }

        return res.json({validation: "false", desc: "Undentify error"});
    }
};