const router = require('express').Router();
const wordController = require('../controllers/word.controller');
const authController = require('../controllers/auth.controller');
const { verifySignUp, authJwt } = require('../middlewares');
const verifySignup = require('../middlewares/verifySignup');


router.get('/', function(req,res){
    res.json({
        status:'Api Working',
        message: 'Hello World'
    });
});

router.route('/word')
    .get(authJwt.verifyToken,wordController.getAll)
    .post([authJwt.verifyToken,authJwt.isAdmin],wordController.create);

router.route('/word/:word')
    .get(authJwt.verifyToken,wordController.findById)
    .patch([authJwt.verifyToken,authJwt.isAdmin],wordController.update)
    .put([authJwt.verifyToken,authJwt.isAdmin],wordController.update)
    .delete([authJwt.verifyToken,authJwt.isAdmin],wordController.delete);



router.route('/auth/signin')
    .post(authController.signin);


router.route('/auth/signup')
    .post(
        verifySignup.checkEmptyFields,
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkIfRolesExists,
        authController.signup);
        
        
module.exports = router;