var express = require('express');
const User = require('../model/User');
var router = express.Router();
const jwt = require("jsonwebtoken");

const generateToken = (params = {}, timeout = 3600) => {
    return jwt.sign(params, process.env.JWT_SECRET, {expiresIn: timeout })
}

const timeout = 3600;
router.post("/", async (req,res) => {
    const {email, password} = req.body;
    
    //Veriicar se o usuário existe no DB
    const user = await User.findOne({email, password});

    //Verificar credenciais
    if(!user)
        return res.status(400).json({message: "Credenciais inválidas"});

    const now = new Date();
    //Gerar o token JWT
    const resposta = {
        token: generateToken({id: user.id}),
        user,
        loogerId: now,
        expiresIn: new Date(now.getTime() + timeout * 1000)
    }

    //Devolver a resposta ao cliente

    return res.json(resposta);

})




module.exports = router;


