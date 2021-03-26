require('dotenv').config(); 
const mongo = require('./connect.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT; 

mongo.connect(() => {
    app.use(require('./routes'));
    app.listen(PORT || 3000, () => "");
});



