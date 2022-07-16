import constants from "./constants";
import { todos } from "./reducers";

export const addTask = (listId, taskId) => ({
    type: constants.ADD_TASK,
    payload: {
        listId: listId,
        taskId: taskId
    }
});

export const removeTask = (listId, taskId) => ({
    type: constants.REMOVE_TASK,
    payload: {
        listId: listId,
        taskId: taskId
    }
})

export const toggleTask = (listId, taskId) => ({
    type: constants.TOGGLE_TASK,
    payload: {
        listId: listId,
        taskId: taskId
    }
})

export const changeTaskText = (listId, taskId, text) => ({
    type: constants.CHANGE_TASK_TEXT,
    payload: {
        listId: listId,
        taskId: taskId,
        text: text
    }
})

export const activateList = (listId) => ({
    type: constants.ACTIVATE_LIST,
    payload: {
        listId: listId
    }
})

export const temporary_setList = (listId, tasks) => ({
    type: constants.ACTIVATE_LIST,
    payload: {
        listId: listId,
        tasks: tasks
    }
})

export const setInitialState = (state) => ({
    type: constants.SET_INITIAL_STATE,
    payload: {
        state:state
    }
})