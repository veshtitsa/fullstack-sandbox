import React, { useEffect, useState } from 'react'
import { TextField, Typography, Checkbox } from '@mui/material'

export const TodoListItem = ({ todoListItem, saveTodoListItem }) => {

  const [task, setTask] = useState(todoListItem.task)
  const [tempTask, setTempTask] = useState(todoListItem.task)
  
  useEffect(() => {
    console.log(todoListItem)
  }, [])
  return ( 
    <div style={{width:'100%', display:'flex'}}>
        <Checkbox
        sx={{ margin: '8px' }}
        size='medium'
        color='secondary'
        checked={todoListItem.done}
        onClick={(event) => saveTodoListItem({task: tempTask, done: !todoListItem.done})}
        >
        </Checkbox>
 
        <TextField
          sx={{ flexGrow: 1, marginTop: '0.50rem', marginBottom:'0.50em' }}
          label='What to do?'
          value={tempTask}
          onChange={(event) => {
            setTempTask(event.target.value)
          }}
          onBlur={(event) => {
            saveTodoListItem({task: tempTask, done: todoListItem.done});
          }} 
        />

        
    </div>
    );
}