const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports.users_sign_up = (req, res) => {

    const saltRounds = 10;
    var user;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
        });
        console.log(hash);
    });


    User.findOne({email: req.body.email}, (err, doc) => {
        if(err){
            return res.status(500).json({
                error: err
            });
        }
        
        if(doc === null){
            user.save();            

            res.status(200).json({
                message: "Successfully created!",
                user: user,
                request: {
                    method: "POST",
                    url: "localhost:3000/users/signup"
                }
            });
        }else{
            res.status(409).json({
                message: "An user with same email exists!",
                request: {
                    method: "POST",
                    url: "localhost:3000/users/signup"
                } 
            });
        }
    });
};


module.exports.users_log_in = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}, (err, doc) => {
        if(err){
            res.status(500).json({
                error: err
            });
        }

        const token = jwt.sign(
        {
            userId: doc._id,
            email:  doc.email
        }, 
        process.env.JWT_KEY,
        {
            expiresIn: "1h"
        }
        );

        if(!doc){
            res.status(404).json({
                message: "auth failed!"
            });
        }else{  
            bcrypt.compare(password, doc.password, (err, result) => {
                if(err){
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                }

                if(result){
                    res.status(200).json({
                        message: "You are successfully logged in!",
                        token: token
                    });
                }else{
                    res.status(404).json({
                        message: "auth failed!"
                    });
                }
            });
        }
    });
};


module.exports.users_delete = (req, res) => {
    const userId = req.params.userId;
    const email = req.body.email;
    const password = req.body.password;

    User.findById(userId, (err, doc) => {
        if(err){
            res.status(500).json({
                error: err
            });
        }

        if(!doc){
            res.status(404).json({
                message: "No user with provided id!"
            });
        }else{  

            if(!email || !password){
                res.json({
                    message: "Email & password required!"
                });
            }else{

                if(doc.email !== email){
                    res.status(404).status({
                        message: "Not found!"
                    });
                }

                bcrypt.compare(password, doc.password, (err, result) => {
                    if(err){
                        console.log(err);
                        res.status(500).json({
                            error: err 
                        });
                    }
                    if(result){
                        User.deleteOne({_id: userId}, (err) => {
                            if(err){
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            }

                            res.status(200).json({
                                message: "Successfully deleted!"
                            });
                        });
                    }else{
                        res.status(404).json({
                            message: "Not found!"
                        });
                    }
                });
            }
        }
    });
};