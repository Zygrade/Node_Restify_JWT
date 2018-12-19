const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../model/User');

module.exports = server => {

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
}