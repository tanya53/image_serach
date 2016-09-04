'use strict';

var path = process.cwd();

var ClickHandler = require( path + '/app/controllers/clickHandler.server.js');

module.exports = function (app) {

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});


	app.route('/latest/')
        .get(clickHandler.retrieve);

	
	app.route('/imagesearch/?')
	   .get(clickHandler.imgSearch);
	   
	app.route('*')
	.get(function(req,res){
		console.log("we are lost");
		console.log(req.originalUrl);
		console.log(req.params[0]);
		res.end("what a waste of time");
	});
};
