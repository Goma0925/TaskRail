require('dotenv').config(); 
const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const path = require("path");
const mongooseUtil = require("./util/MongooseUtil");
const app = express(); 
const PORT = process.env.PORT; 

var corsOptions = {
    origin: 'http://localhost:3000',
}

mongooseUtil.connect(() => {
    // Start the app after mongo db is connected.
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(path.resolve("../"), "client/build")));

    app.listen(PORT || 3000, () => "");
    // Do not add path here, Add all the paths to the root router.
    const rootRouter = require("./routes/RootRouter");
    app.use("/", cors(corsOptions), rootRouter);
})





