require('dotenv').config(); 
const mongo = require('./connect.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT; 
// 
mongo.connect(() => {
    app.listen(PORT || 3000, () => "");
})


app.get("/", (req, res) => {
    // const subtaskCollection = mongo.getDb();
    // console.log(subtaskCollection)
    console.log("/");
});

app.post("/workspaces", (req, res) => {
    res.send("Get needed data");
});


app.get("/workspace/:id", (req, res) => {

    res.send("Workspace object from MongoDB with respective id");
});




