# Broken App Issues

1. ```ReferenceError: err is not defined```
	- catch function had no (err) parameter defined

2. ```TypeError: Cannot read property 'developers' of undefined```
	- no parser installed to handle POST request body. used express.json() middleware to fix this

3. ```TypeError: Cannot read property 'map' of undefined```
	- trying use an async callback inside of the map function will reutrn undefined because the result is a Promise, not the actual request data. To fix this, get the results first, THEN map the resulting object/array