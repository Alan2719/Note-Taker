const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const fs = require("fs");

//PORT
const app = express();
const PORT = process.env.PORT || 8080;

//Body Parsing
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './Develop/public')));

//Routes
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

//Server Listen
app.listen(PORT, () => {
    console.log("App listening to http://localhost:" + PORT);
})