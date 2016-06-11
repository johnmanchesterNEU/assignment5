var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


//var models =


//require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//var assignment = require("./assignment/app.js");
//var project = require("./public/project/project.js")
//var project = require("./public/project/app.js");
//assignment(app);
//project(app);
//require("./assignment/models/model.server.js")();

require("./assignment/app")(app);

//require("./assignment/app.js")(app);

app.listen(port, ipaddress);