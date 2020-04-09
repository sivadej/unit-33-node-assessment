### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  - Promises
  - async/await

- What is a Promise?
  - An object with a status of the state of a request. A promise can be resolved, pending, or rejected. Different returns are written for resolve and reject, typically the successful response data, and and error message.

- What are the differences between an async function and a regular function?
  - Regular functions are blocking, meaning the code will run one line at a time, regardless of how long an operation takes. Async functions can perform operations at the same time while the stack continues to run

- What is the difference between Node.js and Express.js?

  - Node is the backend, express is a web server that runs on Node. Similar to how Flask is a web server framework built on Python, Apache on Linux, etc.

- What is the error-first callback pattern?
  - a nodejs standard of reserving the first argument of a callback for an error object, with successful data returning in the next argument: ```function(err,data)```

- What is middleware?
  - functions that have access to req/res, denoted usually with var ```next```

- What does the `next` function do?
  - next passes control to the next matching route.

- What does `RETURNING` do in SQL? When would you use it?
  - basically a RETURN statement, but used in SQL stored procedures



```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

  - the return won't show any data because each await is going to return a promise. the data from the return needs to be handled for display. if you just read the raw JSON data, it will contain a lot of extra information about the response, headers, etc. 

  - repetition of the getJSON calls don't follow the DRY principle. One solution would be to have a function handle an array of usernames passed as an argument, then the functino would make the getJSON call and return the desired data upon each promise's resolve. Or, wait for all Promises to resolve then get the data from the Promise.all resulting array, thus making the requests parallel, which would increase the performance of the function.