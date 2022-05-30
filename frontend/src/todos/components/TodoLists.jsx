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

export const TodoLists = ({ style }) => {


  const [todoLists, setTodoLists] = useState(oldLists)
  const [activeList, setActiveList] = useState()

  useEffect(() => {
   getTodoLists()
      .then(data => setTodoLists(data));
  }, [])

  useEffect(()=> {
    if(todoLists !== oldLists)
    {
      postTodoLists(todoLists);
      oldLists = todoLists;
    }
  }, [todoLists])
  
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
            if(JSON.stringify(listToUpdate.todos) !== JSON.stringify(todos))
            {
              setTodoLists({
                ...todoLists,
                [id]: { ...listToUpdate, todos },
              })
            }
            
          }}
        />
      )}
    </Fragment>
  )
}

function postTodoLists (todoLists) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todoLists)
  };
  fetch('/todos', requestOptions)
    .then(response => response.text())
    .then(data => console.log("POST REQUEST" + data));
}

async function getTodoLists () {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  const response = await fetch('/todos', requestOptions)
  const data = await response.json()
  await console.log("GET REQUEST:" + data)
  return data;
}
