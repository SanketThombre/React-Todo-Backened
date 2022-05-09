const User = require("../Models/user_model")

const jwt = require('jsonwebtoken');


let createToken = (user) => {
   return jwt.sign({ user }, 'shhhhh');
}
const register = async(req,res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).lean().exec();
        // console.log("test")

        if (user) return res.status(400).send("Email Already Exists");

        user = await User.create(req.body);

        const token = createToken(user);
        
        return res.status(201).send({user,token}) 

    
    }
    catch (e) {
       return res.status(500).send(e.message); 
    }
}

const login = async(req,res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(400).send("Please Try another Email");

       let match =  user.matchPass(req.body.password)
        if (!match) return res.status(400).send("Please Try another Password");
        
        const token = createToken(user);
        
        return res.status(201).send({ user, token }); 


    }
    catch (e) {
       return res.status(500).send(e.message); 
    }
}

module.exports = { login, register };