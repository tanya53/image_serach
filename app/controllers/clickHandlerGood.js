'use strict';
var Query = require('../models/Query.js');

/*using bing to do the image search */
/*key for access to bing */

var Bing = require('node-bing-api')({accKey:'Ca1vCr1a63IgazyI6cthpTRujvJTNBU+wDk0tzDB+yo'});


function ClickHandler () {
	var results = 0;
	this.imgSearch = function(req,res2,https){
		console.log("****** we made it here *******");
	   /*using bing to find the images */

       Bing.images(req.params[0],{skip :50},function(err,res,body){
         if (err) {console.log("error in bing ",err)}
         else {
    		results=JSON.parse(res.body);
    		console.log('adding data');
    		console.log(results.d.results[0].Thumbnail.MediaUrl);
		     /*add the query to the database and the timestamp */
	    	var qtoAdd = new Query({queryType : req.params[0]});
			qtoAdd.save(function(err){
	    	if (err){
	     		console.log("didn't add to database",err);
		    	}
		    console.log("!!!!!!!!!!!!!!!");
		    console.log(results.d.results[0].Thumbnail.MediaUrl);
		    console.log(results.d.results[1]);
	    	res2.send(JSON.stringify({'query':results.d.results[0].Thumbnail.MediaUrl}));

			}); /*qtoAdd */

         }/*else */

       }); /*bing */
 

	};
	
    this.retrieve = function(req,res,https){
    	console.log("******* we made it to retrieve search");
    	/*retrieve values from database sorted by most recent first and limited to 10 */
    	Query.find(function(err,data){
    		if (err) console.error(err);
    		else {
    		    var result = [];
    		    for (var i =0;i<data.length;i++){
    		    	console.log('pushing data',data[i]._id,data[i].queryType);
    		    	result.push({_id:data[i]._id,queryType:data[i].queryType});
    		    }
    		    res.send(JSON.stringify(result));
    		    
    		    }
    	}).sort({'_id':-1}).limit(10);
    };

}

module.exports = ClickHandler;