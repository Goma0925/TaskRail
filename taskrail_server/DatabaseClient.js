require('dotenv').config(); 
const MongoClient = require('mongodb').MongoClient; 

const DB_USER = process.env.DB_USER;
const DB_PW = process.env.DB_PW;
const DB_CLUSTER = process.env.DB_CLUSTER; 
const DB_NAME = process.env.DB_NAME; 

const uri = `mongodb+srv://${DB_USER}:${DB_PW}@${DB_CLUSTER}.ajpsn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

async function connect() {
    await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(connectedMongoClient => {
        console.log("connect to db");
        return connectedMongoClient;
    })
    .catch(err => { 
        throw err;
    });
};

module.exports = connect;


