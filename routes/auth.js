const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('user');

exports.authenticate = (email,password) => {
    return new Promise(async (resolve,reject) => {
        try { 
            const user = await User.findOne({email});

            bcrypt.compare(password,user.password,(err,isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    resolve(user);
                } else {
                    reject('Authentication Failed');
                }
            }); 
        } catch(err) {
            reject('Authentication Failed');
        }
    });
}