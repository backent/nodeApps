//dependencies
const http = require('http');
const https = require('https');
const url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var env = require('./config');
const fs = require('fs');

//the http server
var httpServer = http.createServer(function(req,res){
unifiedServer(req,res);

});
//the https server
var httpsServer = https.createServer(httpsServerOptions ,function(req,res){
unifiedServer(req,res);

});
//https ssl
var httpsServerOptions = {
	cert : fs.readFileSync('./https/cert.pem'),
	key : fs.readFileSync('./https/key.pem')
};

//unified callback 
var unifiedServer = function(req,res){
		//get the URL and parse it
	var parsedURL = url.parse(req.url,true);

	//get the path
	var path = parsedURL.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g,'');

	//get the HTTP method
	var method = req.method.toLowerCase();

	//get the query string as an object
	var queryStringObject = parsedURL.query;

	//get the header request
	var headers = req.headers;

	//get the payload, in any
	var decoder = new StringDecoder('utf-8');
	var buffer = '';
	req.on('data', function(data){
		buffer += decoder.write(data);
	});

	req.on('end', function(){
		buffer +=decoder.end();

		  // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
		  var choosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handler.notFound;
      // Construct the data object to send to the handler
      	var data = {
      		'path' : trimmedPath,
      		'method' : method,
      		'queryStringObject' : queryStringObject,
			'headers' : headers,
			'payload' : buffer
      	};
      // Route the request to the handler specified in the router
      	choosenHandler(data, function(statusCode,payload){


        // Use the status code returned from the handler, or set the default status code to 200
        statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

        // Use the payload returned from the handler, or set the default payload to an empty object
        payload = typeof(payload) == 'object' ? payload : {};

        // Convert the payload to a string
        var payloadString = JSON.stringify(payload);
        // Return the response
        res.setHeader('content-type','application/json');
        res.writeHead(statusCode);
        res.end(payloadString);
        console.log("Returning this response: ", statusCode,payloadString + " with port : " + env);
	
		});
	});
};

//start server and listening to http port
httpServer.listen(env.httpPort,function(){
	console.log("now listening on port " + env.httpPort);
});

//start server and listening to https port
httpsServer.listen(env.httpsPort,function(){
	console.log("now listening on port " + env.httpsPort);
});

// Define all the handlers
var handler = {};
// Sample handler
handler.sample = function (data, callback){
	callback(406,{'name':'sample handler'})
};
//Ping handler
handler.ping = function(data,callback){
  callback(200);
};

// Not found handler
handler.notFound = function(data,callback){
 callback(404);
};
// Define the request router

var router = {
	'sample' : handler.sample,
	'ping' : handler.ping
}