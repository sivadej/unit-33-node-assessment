const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/', async function (req, res) {

	usernames = req.body.developers; // should be array of names
	if (!usernames) res.send('Invalid request received');

	// create an array of promises resolving API response per name
	let userData = await Promise.all(usernames.map(username => {
		return axios.get(`https://api.github.com/users/${username}`);
	})).catch(err=>res.send(err));

	// create array as output to response
	let output = userData.map(user => {
		return {name: user.data.name, bio: user.data.bio};
	})
	
	res.send(output);

});


app.get("/", function(httpRequest, httpResponse, next){
    httpResponse.write("!!! Hello");
    next(); //remove this and see what happens 
});

app.get("/", function(httpRequest, httpResponse, next){
    httpResponse.write(" World !!!");
    httpResponse.end();
});

app.listen(3000);
