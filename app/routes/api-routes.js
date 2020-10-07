const router = require('express').Router();
const wordController = require('../controllers/word.controller');
const authController = require('../controllers/auth.controller');
const { verifySignUp, authJwt } = require('../middlewares');


router.get('/', function(req,res){
    res.json({
        status:'Api Working',
        message: 'Hello World'
    });
});

router.route('/word')
    .get(wordController.getAll)
    .post([authJwt.verifyToken,authJwt.isAdmin],wordController.create);

router.route('/word/:word')
    .get(wordController.findById)
    .patch([authJwt.verifyToken,authJwt.isAdmin],wordController.update)
    .put([authJwt.verifyToken,authJwt.isAdmin],wordController.update)
    .delete([authJwt.verifyToken,authJwt.isAdmin],wordController.delete);



router.route('/signin')
    .post(authController.signin);


router.route('/signup')
    .post(
        [verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkIfRolesExists],
        authController.signup);
        
        
module.exports = router;