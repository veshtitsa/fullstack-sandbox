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
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { TodoListForm } from './TodoListForm'
import { debounce } from 'lodash';

export const TodoLists = ({ style }) => {

  const [todoLists, setTodoLists] = useState()
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    // initialize todoLists state from the server
   getTodoLists()
      .then(data => setTodoLists(data));
  }, [])

  if (todoLists === undefined || !Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItem key={key} button onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  {(todoLists[key].todos.every(item => item.done))
                    ? (<SentimentVerySatisfiedIcon />)
                    : (<ReceiptIcon />)}
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
              
              debouncedFunction({
                ...listToUpdate, todos 
              });
            }
          }}
        />
      )}
    </Fragment>
  )
}

var debouncedFunction = debounce(postTodoList, 500);

function postTodoList (todoList) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todoList)
  };
  fetch('/todos', requestOptions)
    .then(response => response.json())
    .then(data => console.log("POST REQUEST" + JSON.stringify(data)));
}

async function getTodoLists () {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  const response = await fetch('/todos', requestOptions)
  const data = await response.json()
  console.log("GET REQUEST:" + JSON.stringify(data))
  return data;
}