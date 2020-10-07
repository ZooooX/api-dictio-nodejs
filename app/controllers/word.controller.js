const db = require("../models");
const Word = db.word;

//handle get all words action
exports.getAll = function(req,res){
    Word.find(function(err, words){
        if(err){
            res.json({
                status : "error",
                message : err
            });
        }

        res.json({
            status : "success",
            message: "Success",
            data : words
        });
    });
}

//handle create a new word
exports.create = function(req,res){
    Word.findById(req.body.word, function(err,word){
        if(err) res.send(err);

        if(word == null){
            var word = new Word();
            word._id = req.body.word ? req.body.word : word.word;
            word.definitions = req.body.definitions;
            word.antonymes = req.body.antonymes;
            word.synonymes = req.body.synonymes;
    
            word.save(function(err){
                if(err){
                    res.json(err);
                }
                
                res.json({
                    message : 'Created',
                    data : word
                });
            });
        }
        else{
            res.send('Word already exists !');
        }

    });
}

//handle getByWord
exports.findById = function(req,res){
    Word.findById(req.params.word, function(err,word){
        if(err) res.send(err);

        if(word != null){
            res.json({
                message : "Word found !",
                data : word
            });
        }
        else{
            res.send('Word not found !')
        }

    });
}

//handle update
exports.update = function(req,res){
    Word.findById(req.params.word, function(err,word){
        if(err) res.send(err);
        
        if(word != null){
            word._id = req.body.word ? req.body.word : word._id;
            word.definitions = req.body.definitions;
            word.antonymes = req.body.antonymes;
            word.synonymes = req.body.synonymes;
            
            word.save(function(err){
                if(err) res.send(err);
                res.json({
                    message:'Successfully updated',
                    data : word
                });
            });
        }
        else{
            res.send('Word not found !');
        }
    });
}


//handle delete 
exports.delete = function(req,res){
    Word.deleteOne({
        _id : req.params.word
    },function(err,word){
        if(err) res.send(err);
        res.json({
            status : 'success',
            message: 'Deleted successfully'
        });
    });
}