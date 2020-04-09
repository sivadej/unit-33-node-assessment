const fs = require('fs');
const axios = require('axios');
const fileName = process.argv[2]

// read text file
// get each line from file, store in arra
fs.readFile(fileName, 'utf8', (err,data) => {
	if (err) {
		console.log(`Not a valid file: ${file}`);
		process.exit(1);
	}
	console.log(`Getting URLs from file: ${fileName}`)
	console.log(`......................................`)
	let lines = data.split('\n');
	lines = lines.filter(c => c !== '');

	// send async get request to each url
	lines.forEach(url => processData(url));
});

// send get request to url, write to file on success
const processData = async url => {
	try {
		if (!url.includes('http://') && !url.includes('https://')) {
			throw 'invalid URL'; }

		const resp = await axios.get(url);
		if (resp.status === 200) {
			console.log(`Successful response from ${url}`);
			fileToWrite = makeFileName(url);
			writeToFile(resp.data, fileToWrite);
		}
	} catch(e) {
		console.log(`Error in request for ${url}`);
	}
}

const writeToFile = (text, target) => {
	fs.writeFile(target, text, 'utf8', (err) => {
		if (err) {
			console.log(`ERROR: Could not write to file.`);
			//process.exit(1);
		}
		console.log(`Saved to file ${target}`);
	})
}

// name files using hostname of url
const makeFileName = url => {
	splitUrl = url.split('/');
	return (`./output/${splitUrl[2]}.txt`);
}
