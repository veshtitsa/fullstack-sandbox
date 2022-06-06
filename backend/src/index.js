const express = require('express')
const cors = require('cors')
const PORT = 3001
const app = express()

app.use(cors())
app.use(express.json())

// keeping default content same as in the beginning example
// of course if this was actually production-intended, the lists would be empty
var todos = { 
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: [
      {
        done: false,
        task: 'First todo of first list!'
      }
    ],
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: [
      {
        done: false,
        task: 'First todo of second list!'
      }
    ],
  }
};

app.get('/todos', ( _, res) => {
    res.send(todos)
    //console.log(JSON.stringify(todos));
})


app.post('/todos', function(request, response){
  if(("id" in request.body)) // this is already checked on the client side, but good to be extra extra sure
  {
    todos[request.body.id] = request.body;
  }
     //console.log(todos);
     response.send(request.body);
  });


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
