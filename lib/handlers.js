/*
 *
 *
 *handlers for router
 *
 *
*/

//all dependencies


// Define all the handlers
var handlers = {};
// Sample handler
handlers.sample = function (data, callback){
	callback(406,{'name':'sample handler'})
};

handlers.user = function(data,callback){
	var acceptableMethods  = ['get','post','put','delete'];
	if(valueof(acceptableMethods[data.method] > -1)){

	handlers._user[data.method](data,callback);
	}
	else
		callback(405);


};

//define container for all method
handlers._user = {};


// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._user.get = function(data,callback){
	var name = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false;
	var number = typeof(data.payload.number) == 'string' && data.payload.number.trim().length == 10 ? data.payload.number : false;
	var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false;
	var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.paylad.tosAgreement == true ? true : false;

};


//Ping handler
handlers.ping = function(data,callback){
  callback(200);
};

// Not found handler
handlers.notFound = function(data,callback){
 callback(404);
};


//export

module.exports = handlers;