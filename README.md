# api-dictio-nodejs

NodeJs API - Express - MongoDB mongoose <br>
User Signup / login / roles to access dictionnary data


# Endpoints

<b>POST : /auth/signup</b>
body : json
 {
    username : xxxx,
    email : xxxxx,
    password : xxxxx,
    roles : xxxxxx
 }

<b>POST : /auth/signin</b>
body : json
 {
    username : xxxx,
    password : xxxxx
 }

<b>GET : /word</b>

<b>POST : /word</b>
header : x-access-token
body : json
 {
    word : xxxx,
    definitions : [{wordType : xxxx, def : xxxx, expl : xxxx}],
    antonymes : [xxxxx],
    synonymes : [xxxxxx]
 }


<b>GET : /word/{word}</b>

<b>PUT : /word/{word}</b>
header : x-access-token
body : json
 {
    word : xxxx,
    definitions : [{wordType : xxxx, def : xxxx, expl : xxxx}],
    antonymes : [xxxxx],
    synonymes : [xxxxxx]
 }

<b>DELETE : /word/{word}</b>
header : x-access-token

