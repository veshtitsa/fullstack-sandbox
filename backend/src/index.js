const express = require('express')
const cors = require('cors')
const app = express()


app.use(cors())
app.use(express.json())

const PORT = 3001

var todos = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: ['First todo of first list!'],
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: ['First todo of second list!'],
  }
};

app.get('/gettodos', (req, res) => {
    res.send(todos)
    console.log('ding');
    console.log(todos);
})


app.post('/todos', function(request, response){
    /* console.log(request.body);      // your JSON
     response.send(request.body);    // echo the result back */
     todos = request.body;
     console.log(todos);
     response.send(request.body);
  });


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
