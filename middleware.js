const express = require('express');
const app = express();
const MyError = require('./MyError');
app.use(express.json());

function logger(req,res,next) {
	console.log(`sending ${req.method} request to ${req.path}`);
	return next();
}

function checkForPassword(req,res,next){
	try{
		if(req.query.password !== 'monkeybreath'){
			throw new MyError('missing or invalid password', 402);
		} else {
			return next();
		}
	} catch(e) {return next(e);}
}

module.exports = { logger, checkForPassword }