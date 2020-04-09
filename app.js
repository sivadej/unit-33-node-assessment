const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/', async function (req, res, next) {
	try {
		usernames = req.body.developers; // should be array of names
		if (!usernames) throw "invalid request";

		// create an array of promises resolving API response per name
		let userData = await Promise.all(usernames.map(username => {
			return axios.get(`https://api.github.com/users/${username}`);
		}))

		// create array as output to response
		let output = userData.map(user => {
			return {name: user.data.name, bio: user.data.bio};
		})
		
		res.send(output);
	} catch (err) {
		next(err);
	}
});

app.listen(3000);
