import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import TodoListItem from './TodoListItem'
import {v4 as uuidv4} from "uuid";
import { addTask, changeTaskText, removeTask } from '../actions'
import { connect } from 'react-redux'

const TodoListForm = ({ todoList, saveTodoList, onTaskAdded, onTaskRemoved, onTaskChanged, activeList, todos }) => {

/*   useEffect(() => {
    console.log("from here")
    saveTodoList(todoList.id, { todos })
  }, [todos, todoList.id, saveTodoList])
 */
  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
         // onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TodoListItem
                todoListItem={item}
                saveTodoListItem={(task) => {
                  /* if(JSON.stringify(todos[index]) !== task){
                    onTaskChanged(activeList, item.id, task.text)
                  } */
                  // noop
                }}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                    onTaskRemoved(activeList, item.id)
                    /* setTodos([
                      // immutable delete
                      ...todos.slice(0, index),
                      ...todos.slice(index + 1),
                    ]) */
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
                onTaskAdded(activeList)
                //setTodos([...todos, { task: '', done: false }])
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

const mapStateToProps = (state) => {
  const {lists, activeList} = state;
  return {
    todos: lists[activeList].tasks,
    activeList: activeList
}};

const mapDispatchToProps = (dispatch) => ({
  onTaskAdded: (listId) => dispatch(addTask(listId, uuidv4())),
  onTaskRemoved: (listId, taskId) => dispatch(removeTask(listId, taskId)),
  onTaskChanged: (listId, taskId, text) => dispatch(changeTaskText(listId, taskId, text))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListForm);