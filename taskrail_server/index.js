require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./DatabaseClient.js');
const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT; 

(async ()=>{
    await connect();

    const rootRouter = require('./routes');
    app.use("/", rootRouter);
    app.listen(PORT || 3000, () => "");
})();



