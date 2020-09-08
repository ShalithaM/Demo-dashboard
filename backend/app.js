var express = require('express');
var bodyParser = require('body-parser');
var morgan = require("morgan");
var cors = require('cors');


var config = require('./constant/config');


var app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));



/*
 * Import all routes files
 */
var dashboard = require('./routes/dashboard');

/*
 * Register all routes  
 */
app.use('/api/dashboard', dashboard);


server = app.listen(config.port, function () {
  console.log('App listening on port ' + config.port);
});

module.exports = app;
