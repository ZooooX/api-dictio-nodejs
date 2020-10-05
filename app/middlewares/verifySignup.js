const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req,res,next) => {
    //check username

    User.findOne({
        username : req.body.username
    }).exec((err, user) => {
        if(err){
            res.status(500).send({message : err});
            return;
        }

        if(user){
            res.status(400).send({message : 'Username already in use'});
            return;
        }

        //check email
        User.findOne({
            email : req.body.email
        }).exec((err, user) => {
            if(err){
                res.status(500).send({message : err});
                return;
            }

            if (user){
                res.status(400).send({message : 'Email already in use'});
                return;
            }

            next();
        });
    });
};


checkRolesExisted = (req,res,next) => {
    if(req.body.roles){
        
    }
}

