//jshint esversion:6

//For Next Time: Watch from 15:27

// GET REQUEST
function getTodos() {
  // axios({
  //   method: "GET",
  //   url: "https://jsonplaceholder.typicode.com/todos",
  //   params: {
  //     _limit: 5
  //   }
  // })
  // .then(res => {
  //   showOutput(res);
  // })
  // .catch(err => {
  //   console.error(err);
  // });

  // axios.get("https://jsonplaceholder.typicode.com/todos", {
  //   params: {
  //     _limit: 5
  //   }
  // })
  // .then(res => {
  //   showOutput(res);
  // })
  // .catch(err => {
  //   console.error(err);
  // });

  // axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5")
  // .then(res => {
  //   showOutput(res);
  // })
  // .catch(err => {
  //   console.error(err);
  // });

  axios("https://jsonplaceholder.typicode.com/todos?_limit=5")
  .then(res => {
    showOutput(res);
  })
  .catch(err => {
    console.error(err);
  });
}

// POST REQUEST
function addTodo() {
  // axios({
  //   method: "POST",
  //   url: "https://jsonplaceholder.typicode.com/todos",
  //   data: {
  //     title: "New Todo",
  //     completed: false
  //   }
  // })
  // .then(res => {
  //   showOutput(res);
  // })
  // .catch(err => {
  //   console.error(err);
  // });

  axios.post("https://jsonplaceholder.typicode.com/todos", {
    title: "New Todo",
    completed: false
  })
  .then(res => {
    showOutput(res);
  })
  .catch(err => {
    console.error(err);
  });
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios.patch("https://jsonplaceholder.typicode.com/todos/4", {
    title: "Update Todo",
    completed: true
  })
  .then(res => {
    showOutput(res);
  })
  .catch(err => {
    console.error(err);
  });
}

// DELETE REQUEST
function removeTodo() {
  axios.delete("https://jsonplaceholder.typicode.com/todos/1")
  .then(res => {
    showOutput(res);
  })
  .catch(err => {
    console.error(err);
  });
}

// SIMULTANEOUS DATA
function getData() {
  // axios.all([
  //   axios.get("https://jsonplaceholder.typicode.com/todos"),
  //   axios.get("https://jsonplaceholder.typicode.com/posts")
  // ])
  // .then(res => {  // These only run when Promises above have been fulfilled
  //   console.log(res[0]);
  //   console.log(res[1]);
  //   showOutput(res[1]);  // We can only pass ONE argument into Function!
  // })
  // .catch(err => {
  //   console.error(err);
  // });

  axios.all([
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
    axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5")  // axios.spread() takes a function; variable names for each request are passed as arguments
  ])
  .then(axios.spread((todos, posts) => {
    showOutput(posts);  // Do whatever you want with each response
  }))
  .catch(err => {
    console.error(err);
  });
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'sometoken'  // Hypothetical header
    }
  };

  axios.post("https://jsonplaceholder.typicode.com/todos", {
    title: "New Todo",
    completed: false
  }, config)
  .then(res => {
    showOutput(res);
  })
  .catch(err => {
    console.error(err);
  });
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config => {  // toUpperCase() converts string --> Upper Case
  console.log(`${config.method.toUpperCase()} request sent to
  ${config.url} at ${new Date().getTime()}`);

  return config;
}, error => {
  return Promise.reject(error);
});

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
