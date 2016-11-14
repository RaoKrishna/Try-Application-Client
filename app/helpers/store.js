import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from '../reducers';
//import DevTools from '../components/DevTools.js';

const storeEnhancers = [];
if (__DEVTOOLS__) {
    //storeEnhancers.push(DevTools.instrument());
}

let combinedCreateStore = compose(...storeEnhancers)(createStore);
const finalCreateStore = applyMiddleware(thunkMiddleware)(combinedCreateStore);

const combinedReducer = combineReducers(reducers);

export default function configureStore (initialState) {

    const store = finalCreateStore(combinedReducer, initialState);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}

/*
import { applyMiddleware, compose, createStore } from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

let finalStore = compose(
    applyMiddleware(logger(), thunkMiddleware)
)(createStore);

export default function configureStore(initialState = {}) {
    return finalStore(reducer, initialState);
}*/
