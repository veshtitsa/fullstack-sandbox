import {v4 as uuidv4} from "uuid";
import constants from "./constants";

export const defaultState = { 
    lists: {
        '0000000001': {
        id: '0000000001',
        title: 'First List',
        tasks: [
            {
                id: uuidv4(),
                done: false,
                text: 'First todo of first list!'
            }
        ],
        },
        '0000000002': {
        id: '0000000002',
        title: 'Second List',
        tasks: [
            {
                id: uuidv4(),
                done: false,
                text: 'First todo of second list!'
            }
        ],
        }
    },
    activeList: ''
  };

export const task = (state={}, action) => {
    switch (action.type){
        case constants.ADD_TASK:
            return {
                id: action.payload.taskId,
                done: false,
                text: ""
            }
        case constants.TOGGLE_TASK:
            return {
                ...state,
                done: !state.done
            }
        case constants.CHANGE_TASK_TEXT:
            return {
                ...state,
                text: action.payload.text
            }
        default:
            return state;
    }
}

export const tasks = (state=[], action) => {
    switch (action.type){
        case constants.ADD_TASK:
            return [
                ...state,
                task({}, action)
            ]
        case constants.REMOVE_TASK:
            var index = state.findIndex(x => x.id == action.payload.taskId);
            return [
                ...state.slice(0, index),
                ...state.slice(index +1 )
            ]
        case constants.TOGGLE_TASK:
            var index = state.findIndex(x => x.id == action.payload.taskId);
            return [
                ...state.slice(0, index),
                task(state[index], action),
                ...state.slice(index + 1 )
            ]
        case constants.CHANGE_TASK_TEXT:
            var index = state.findIndex(x => x.id == action.payload.taskId);
            return [
                ...state.slice(0, index),
                task(state[index], action),
                ...state.slice(index + 1 )
            ]
        default:
            return state;
    }
}

export const lists = (state={}, action) => {
    switch (action.type){
        case constants.ADD_TASK:
        case constants.REMOVE_TASK:
        case constants.TOGGLE_TASK:
        case constants.CHANGE_TASK_TEXT:
            return {
                ...state,
                [action.payload.listId]: {
                    ...state[action.payload.listId],
                    tasks: tasks(state[action.payload.listId].tasks, action)
                }
            };

        case constants.TEMPORARY_SET_LIST:
            return {
                ...state,
                [action.payload.listId]: {
                    ...state[action.payload.listId],
                    tasks: action.payload.tasks
                }
            };

        default:
            return state;
    }
}

export const activeList = (state='', action) => {
    switch (action.type){
        case constants.ACTIVATE_LIST:
            return action.payload.listId;
        default:
            return state;
    }
}