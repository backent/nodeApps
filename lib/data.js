var fs = require('fs');
var path = require('path');

var basedir = path.join(__dirname,'/../.data/');

var lib ={};

lib.create = function(dir,file,data,callback){
	fs.open(basedir+dir+'/'+file+'.json','wx', function(err,filedescriptor){
		if(!err && filedescriptor){
			var stringifyJSON = JSON.stringify(data);

			fs.writeFile(basedir+dir+'/'+file+'.json', stringifyJSON, function(err){
				if(!err)
					callback(false);
				else
					callback(err);
			});

			fs.close(filedescriptor, function(err){
				if(!err)
					callback(false);
				else
					callback("can not close file, message error : " +err);
			});
		}
		else
			callback(err);
	});
};

lib.read = function(dir,file,callback){
	fs.readFile(basedir+dir+'/'+file+'.json', 'utf8', function(err,data){
		if(!err){
			callback(data);
		}
		else
			callback(err);
	});
};	

lib.update = function(dir,file,data,callback){

	fs.open(basedir+dir+'/'+file+'.json','w+', function(err,fd){


		fs.writeFile(basedir+dir+'/'+file+'.json', stringifyJSON, function(err){
				if(!err)
					callback(false);
				else
					callback(err);
			});
		fs.close(filedescriptor, function(err){
				if(!err)
					callback(false);
				else
					callback("can not close file, message error : " +err);
			});
	});
	
};

lib.delete= function(dir,file,callback){

	fs.unlink(basedir+dir+'/'+file+'.json', function(err){
		if(!err)
			callback(false);
		else
			callback(err);
	});

};
module.exports = lib;	