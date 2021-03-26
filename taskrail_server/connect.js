require('dotenv').config(); 
const MongoClient = require('mongodb').MongoClient; 

const DB_USER = process.env.DB_USER;
const DB_PW = process.env.DB_PW;
const DB_CLUSTER = process.env.DB_CLUSTER; 
const DB_NAME = process.env.DB_NAME; 

var _db; 
const uri = `mongodb+srv://${DB_USER}:${DB_PW}@${DB_CLUSTER}.ajpsn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

function connect(callback) {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => {
        console.log("connect to db")
        _db = db;
        callback(); 
    })
    .catch(err => { console.error(err)});
};
function getDb() { return _db; };
function close() { _db.close(); };

module.exports =  {
    connect,
    getDb,
    close
};


