import React from 'react'
import { TextField, Checkbox } from '@mui/material'
import { changeTaskText, toggleTask } from '../actions';
import { connect } from 'react-redux';

const TodoListItem = ({ todoListItem, saveTodoListItem, onTaskChanged, onTaskToggled, activeList }) => {

  return ( 
    <div style={{width:'100%', display:'flex'}}>
      <Checkbox
      sx={{ margin: '8px' }}
      size='medium'
      color='secondary'
      checked={todoListItem.done}
      onClick={() => onTaskToggled(activeList, todoListItem.id)}
      >
      </Checkbox>

      <TextField
        sx={{ flexGrow: 1, marginTop: '0.50rem', marginBottom:'0.50em'}}
        inputProps={{disabled: todoListItem.done}}
        label='What to do?'
        size='small'
        value={todoListItem.text}
        onChange={(event) => {
          onTaskChanged(activeList, todoListItem.id, event.target.value)
        }}
      />
    </div>
    );
}

const mapStateToProps = (state) => {
  const {lists, activeList} = state;
  return {
    activeList: activeList
}};

const mapDispatchToProps = (dispatch) => ({
  onTaskChanged: (listId, taskId, text) => dispatch(changeTaskText(listId, taskId, text)),
  onTaskToggled: (listId, taskId) => dispatch(toggleTask(listId, taskId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem);