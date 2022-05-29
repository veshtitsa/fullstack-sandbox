import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))




export const TodoLists = ({ style }) => {

  let getPersonalTodos = () => {
    return sleep(1000).then(() =>
    Promise.resolve(
      getTodoLists()
      .then(console.log(todoLists)))
    )
  }

  var oldLists = {
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

  const [todoLists, setTodoLists] = useState(oldLists)
  const [activeList, setActiveList] = useState()

  useEffect(() => {
   const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
    };
    
    fetch('/gettodos', requestOptions)
      .then(response => response.json())
      .then(data => setTodoLists(data));
  }, [])

  useEffect(()=> {
    if(todoLists != oldLists)
    {
      sendTodoLists(todoLists);
      oldLists = todoLists;
    }
  }, [todoLists])
  

  console.log(todoLists)
  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItem key={key} button onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={(id, { todos }) => {
            const listToUpdate = todoLists[id]
            setTodoLists({
              ...todoLists,
              [id]: { ...listToUpdate, todos },
            })
          }}
        />
      )}
    </Fragment>
  )
}

function sendTodoLists (todoLists) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todoLists)
  };
  fetch('/todos', requestOptions)
    .then(response => response.text())
    .then(data => console.log(data));

    getTodoLists();
}

function getTodoLists () {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  return fetch('/gettodos', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
}
