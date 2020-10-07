const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


let apiRoutes = require('./app/routes/api-routes');

var corsOptions = {
    origin : "http://localhost:4200"
};

//Port the application will listen to
const port = 3000;

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());

//database connection
const db = require('./app/models');
const dbConfig = require('./app/config/db.config');

const Role = db.role;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}/${dbConfig.DB}`, 
    {useNewUrlParser : true, useUnifiedTopology:true})
    .then(() => {
        console.log("Succesfully connected to database");
        initial();
    })
    .catch(err => {
        console.log("Error connecting to db", err);
        process.exit();
    });


app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.use('/api', apiRoutes);

app.get('/', (req,res) => res.send('Hell World'));

app.listen(port, function(){
    console.log('server started on port :' + port);
});



//add roles to the roles collections if they dont exists yet
function initial(){
    Role.estimatedDocumentCount((err,count) =>{
        if(!err && count === 0){
            new Role({
                name : "user"
            }).save(err => {
                if(err){
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name : "admin"
            }).save(err =>{
                if(err){
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}