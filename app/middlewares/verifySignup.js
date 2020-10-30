const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;


checkEmptyFields = (req, res, next) => {
    if(req.body.username == "" || req.body.password == "" || req.body.email == "" || req.body.roles == "" || req.body.username == undefined || req.body.password == undefined || req.body.email == undefined || req.body.roles == undefined){
        res.status(400).send({message : 'Some fields are empty'});
        return;
    }
    next();
}


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

checkIfRolesExists = (req, res, next) => {
    console.log(req.body);
    if(req.body.roles){
        for(let i =0; i< req.body.roles.length; i++){
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                  message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
              }
        }
    }
    next();
};

const verifySignup = {
    checkEmptyFields,
    checkDuplicateUsernameOrEmail,
    checkIfRolesExists
}

module.exports = verifySignup;

