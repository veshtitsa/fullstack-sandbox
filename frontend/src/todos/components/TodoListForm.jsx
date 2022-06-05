import React, { useEffect, useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { TodoListItem } from './TodoListItem'

export const TodoListForm = ({ todoList, saveTodoList }) => {

  const [todos, setTodos] = useState(todoList.todos)
  const [tempTodos, setTempTodos] = useState(todoList.todos)

  const handleSubmit = (event) => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  }

  useEffect(() => {
    setTempTodos(todos)
      saveTodoList(todoList.id, { todos })
  }, [todos, todoList.id, saveTodoList])

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {tempTodos.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TodoListItem
                todoListItem={item}
                saveTodoListItem={(task) => {
                  /* console.log(tempTodos.slice(0, index))
                  console.log(task)
                  console.log(tempTodos.slice(index+1)) */
                  console.log("task is: "+JSON.stringify(task))
                  if(JSON.stringify(tempTodos[index]) !== task){
                  setTodos([
                    ...tempTodos.slice(0, index),
                    task,
                    ...tempTodos.slice(index+1)
                    ])
                  }

                }}
              
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={(event) => {
                    setTodos([
                      // immutable delete
                      ...tempTodos.slice(0, index),
                      ...tempTodos.slice(index + 1),
                    ])
                  }
                }
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
                setTodos([...todos, {task:'', done:false}])
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
