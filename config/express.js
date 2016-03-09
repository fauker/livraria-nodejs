var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function() {
	var app = express();

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(expressValidator());

	app.set('view engine', 'ejs');
	app.set('views', './app/views');	

	load('routes', {cwd: 'app'})
		.then('infra')
		.into(app);

	return app;
};