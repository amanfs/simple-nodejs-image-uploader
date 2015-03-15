
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes'),
  	fs = require('fs');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(8080, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

app.post('/single-image', function(req, res) {
	//Default location files will be stored. The path will start at the location relative to this script. make sure you have an images folder.
	var serverPath = __dirname + '/images/' + req.files.file.name;
	
	// Where you want your files to be saved too
	var serverLocation = '/var/www/server.com/public_html/images/'
	
	// Where you want your files to be moved too
	var publicLocation = 'http://servername.com/images/'
	
    var newPath = serverDefaultPath + req.files.file.name.replace(/ /g, '-');
	var newFile = publicLocation + req.files.file.name.replace(/ /g, '-');
    
    fs.rename(req.files.file.path, serverPath, function(error){
	   if(error){
		   res.send({
			   error: error
		   });
		   return;
	   }
	   fs.readFile(serverPath, function(err, data){
	   	fs.writeFile(newPath, data, function(err){
			 fs.unlink(serverPath, function(){
				 if(err) throw err;
				 res.send({
				 	path: newFile
		   		 });	   
			 })
		  });
	   });
	}) 
});

app.post('/multiple-images', function(req, res){
	
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	
	var length = req.files.file.length;
	// Checks to see if multiple files were uploaded
	if(length != undefined){
		var location = [];
		req.files.file.forEach(function(value, index, array){
			//Default location files will be stored. The path will start at the location relative to this script. make sure you have an images folder.
			var serverPath = __dirname + '/images/' + value.name;
			
			// Where you want your files to be saved too
			var serverLocation = '/var/www/server.com/public_html/images/'
			
			// Where you want your files to be moved too
			var publicLocation = 'http://servername.com/images/'
			
			var newPath = serverPath + value.name.replace(/ /g, '-');
			var newFile = publicLocation + value.name.replace(/ /g, '-');
			
			fs.rename(value.path, serverPath, function(error){
				if(error){
					res.send({
						error: error
					})
					return;
				}
				fs.readFile(serverPath, function(err, data){
					fs.writeFile(newPath, data, function(err){
						if(err) throw err;
						fs.unlink(serverPath, function(){
							if(err) throw err;
							location.push(newFile);
							if(location.length == array.length){
								res.send({
									data: location
								});
							}
						})
					})
				});
			});
		});	
	} else {
		res.status(400).send({error: 1, details: 'Must upload at lease 3 images'});
	}
});


