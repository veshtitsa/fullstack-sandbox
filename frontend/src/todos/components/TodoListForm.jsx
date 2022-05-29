import React, { useState, useEffect } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export const TodoListForm = ({ todoList, saveTodoList }) => {

  var gottenTodos;

/*   const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  fetch('/todos', requestOptions)
    .then(response => response.text())
    .then(data => gottenTodos = data.todo);
 */
  const [todos, setTodos] = useState(todoList.todos)

  useEffect(() => {
    saveTodoList(todoList.id, { todos })
  }, [todos])

  const handleSubmit = (event) => {
    console.log("submitted");
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  }
/* 
  useEffect(() => {
    // PUT request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: todos })
    };
    fetch('/todos', requestOptions)
        .then(response => response.text())
        .then(data => console.log(data));

  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  });
 */
  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((name, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={name}
                onChange={(event) => {
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    event.target.value,
                    ...todos.slice(index + 1),
                  ])
                }}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, ''])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button 
              type='submit' 
              variant='contained' 
              color='primary'
              >
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
