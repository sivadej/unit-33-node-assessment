const express = require('express');
const MyError = require('./MyError');
const morgan = require('morgan');
const middleware = require('./middleware')
const app = express();

app.use(express.json());
//app.use(middleware.logger);
app.use(morgan('dev'))
//app.use(middleware.checkForPassword);

app.use((req, res, next) => {
	console.log('server got a request');
	next();
})

const CANDIES = [
	{ name: 'snickers', qty: 43, price: 1.99 },
	{ name: 'skittles', qty: 23, price: 0.99 },
	{ name: 'butterfingers', qty: 9, price: 1.25 },
]

app.get('/secret', middleware.checkForPassword, (req, res, next) => {
	return res.send('I love you <3 for real');
})

app.get('/private', middleware.checkForPassword, (req, res, next) => {
	return res.send('privato');
})

app.get('/candies', (req, res) => {
	res.json(CANDIES);
})

app.get('/throw', (req, res, next) => {
	throw new MyError('yo wtf stop throwing', 404);
})

app.post('/candies', (req, res, next) => {
	try {
		if (Object.keys(req.body).length === 0) {
			throw new MyError('zzomgg empty object received', 403);
		}
		CANDIES.push(req.body);
		res.status(201).json({ added: req.body, all: CANDIES });
	} catch (e) {
		next(e);
	}
})

// error handler with default 500
app.use((err, req, res, next) => {
	let status = err.status || 500;
	let message = err.message;

	return res.status(status).json({
		error: { message, status }
	});
});

// app.use((err, req, res, next) => {
// 	res.status(err.status).send(err.message)
// })

app.listen('3000', () => console.log(`running on port 3000`));