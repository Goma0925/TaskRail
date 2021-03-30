require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const mongoUtil = require("./MongoUtil");
const app = express(); 
const PORT = process.env.PORT; 

mongoUtil.connect(() => {
    // Start the app after mongo db is connected.
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.listen(PORT || 3000, () => "");
    const rootRouter = require("./routes");
    app.use("/", rootRouter);
})



