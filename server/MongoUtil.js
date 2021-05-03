require('dotenv').config(); 
const MongoClient = require('mongodb').MongoClient; 

let _db; 
const uri = process.env.ATLAST_URL;

function connect(callback) {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log("Database connection established.");
        _db = client.db();
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