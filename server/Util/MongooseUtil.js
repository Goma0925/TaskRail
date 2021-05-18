const mongoose = require("mongoose");

const DB_USER = process.env.DB_USER;
const DB_PW = process.env.DB_PW;
const DB_CLUSTER = process.env.DB_CLUSTER; 
const DB_NAME = process.env.DB_NAME; 
const PORT = process.env.PORT; 

const uri = `mongodb+srv://${DB_USER}:${DB_PW}@${DB_CLUSTER}.ajpsn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

async function connect(callback){
    console.log(uri);
    mongoose.connect(uri, 
      {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
    );
    const connection = mongoose.connection;
    connection.once("open", ()=>{
      console.log(
      "Mongoose established DB connection.\n" + 
      "Running server on PORT:"+PORT);
      callback();
    });
}

module.exports = {
    connect: connect
} 