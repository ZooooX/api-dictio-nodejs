const mongoose = require('mongoose');

const Word = mongoose.model(
    "Word",
    new mongoose.Schema({
        _id : {
            type: String,
            required : true
        },
        definitions : [{wordType : String , def : String, expl : String}],
        antonymes : [String],
        synonymes : [String]
    })
);


module.exports = Word;