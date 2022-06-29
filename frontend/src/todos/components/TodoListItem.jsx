import React from 'react'
import { TextField, Checkbox } from '@mui/material'

export const TodoListItem = ({ todoListItem, saveTodoListItem }) => {

  return ( 
    <div style={{width:'100%', display:'flex'}}>
      <Checkbox
      sx={{ margin: '8px' }}
      size='medium'
      color='secondary'
      checked={todoListItem.done}
      onClick={() => saveTodoListItem({task: todoListItem.task, done: !todoListItem.done})}
      >
      </Checkbox>

      <TextField
        sx={{ flexGrow: 1, marginTop: '0.50rem', marginBottom:'0.50em'}}
        inputProps={{disabled: todoListItem.done}}
        label='What to do?'
        size='small'
        value={todoListItem.task}
        onChange={(event) => {
          saveTodoListItem({task: event.target.value, done: todoListItem.done});
        }}
      />
    </div>
    );
}