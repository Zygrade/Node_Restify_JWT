const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const auth = require('../auth');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = server => {

    // register new user
    server.post('/register', (req,res,next) => {

        const user = new User({
            email : req.body.email,
            password : req.body.password
        });
        
        bcrypt.genSalt(11, (err,salt) => {
            bcrypt.hash(user.password,salt, async(err,hash) => {
                user.password = hash;

                try {
                    const newUser = await user.save();
                    res.send(201);
                    next();
                } catch(err) {
                    return next(new errors.InternalError(err.message)); 
                }
            });
        });
    });

    // authenticate user
    server.post('/auth', async (req,res,next) => {
        const {email,password} = req.body;

        try {
            const user = await auth.authenticate(email,password);

            // JW_token
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
                expiresIn : '15m'
            });

            const { iat, exp } = jwt.decode(token);
            res.send({iat,exp,token});
            console.log(user);
            next();
        } catch(err) {
            return next(new errors.UnauthorizedError(err.message));
        }
    });                         
}