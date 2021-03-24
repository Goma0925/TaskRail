const express = require('express');
const app = express(); 
require('dotenv').config(); 
const MongoClient = require('mongodb').MongoClient; 

const PORT = process.env.PORT; 
const DB_USER = process.env.DB_USER;
const DB_PW = process.env.DB_PW;
const DB_CLUSTER = process.env.DB_CLUSTER; 
const DB_NAME = process.env.DB_NAME; 

const uri = `mongodb+srv://${DB_USER}:${DB_PW}@${DB_CLUSTER}.ajpsn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
           .then(client => {
               console.log("Connected to Database!");
               const db = client.db('TaskRail')
               const subtaskCollection = db.collection('Subtask')
               subtaskCollection.insertOne({name: "dsadaddsa"})
           })
           .catch(console.error);

app.get("/", (req, res) => {
    console.log("/");
});

app.post("/workspaces", (req, res) => {
    res.send("Get needed data");
});


app.get("/workspace/:id", (req, res) => {
    res.send("Workspace object from MongoDB with respective id");
});

app.listen(PORT || 3000, () => "");


