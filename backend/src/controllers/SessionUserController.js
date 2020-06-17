// index: listagem de Sessões, show: mostrar uma unica sessão, store: criar uma sessão, update, destroy
const User = require('../models/User');
const crypto = require("crypto");
const parseStringAsArray = require('../utils/parseStringAsArray')

//    const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
//    decipher.update(senha, DADOS_CRIPTOGRAFAR.tipo);


module.exports = {
    async store(req, res) {
        const { filename } = req.file;
        const { name, email, password, interest } = req.body;

        let user = await User.findOne({ email });

        if(!user) {
            const interestArray = parseStringAsArray(interest);
            const newpassword = crypto.createHmac('sha256', password).update(password).digest('hex');
            user = await User.create({ 
                name, 
                email, 
                password,
                newpassword, 
                profile_photo: filename, 
                interest:  interestArray,
            });

            return(user)
        }
        else {
            return res.json({validation: "false", desc: "User has already been created"});
        }

        return res.json({validation: "false", desc: "Undentify error"});
    },
    async show(req, res) {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if(user) {
            const new_password = crypto.createHmac('sha256', password).update(password).digest('hex');
            if(user.senha === new_password) {
                return res.json(user);
            }
            else {
                return res.json({validation: "false", desc: "Incorrect Password"});
            }
        }
        else {
            return res.json({validation: "false", desc: "User not found"});
        }

        return res.json({validation: "false", desc: "Undentify error"});
    }
};