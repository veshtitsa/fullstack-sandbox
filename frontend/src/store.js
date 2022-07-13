import { createStore, combineReducers } from "redux";
import { lists, tasks, task, activeList } from "./todos/reducers";
import { defaultState } from "./todos/reducers";
import { configureStore } from "@reduxjs/toolkit";

const reducers = {
    lists,
    activeList
};

const rootReducer = combineReducers(reducers);

const store = configureStore({reducer: rootReducer, preloadedState: defaultState});

export default store;