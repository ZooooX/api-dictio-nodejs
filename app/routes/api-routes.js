let router = require('express').Router();
var wordController = require('../controllers/word.controller');

router.get('/', function(req,res){
    res.json({
        status:'Api Working',
        message: 'Hello World'
    });
});

router.route('/word')
    .get(wordController.getAll)
    .post(wordController.create);

router.route('/word/:word')
    .get(wordController.findById)
    .patch(wordController.update)
    .put(wordController.update)
    .delete(wordController.delete);


module.exports = router;