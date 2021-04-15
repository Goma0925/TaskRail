require('dotenv').config(); 
const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const mongoUtil = require("./MongoUtil");
const app = express(); 
const PORT = process.env.PORT; 

var corsOptions = {
    origin: 'http://localhost:3000',
}

mongoUtil.connect(() => {
    // Start the app after mongo db is connected.
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.listen(PORT || 3000, () => "");
    // Do not add path here, Add all the paths to the root router.
    const rootRouter = require("./routes");
    app.use("/", cors(corsOptions), rootRouter);
})



