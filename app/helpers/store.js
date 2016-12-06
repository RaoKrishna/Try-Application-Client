/*
 * This file creates the variable store for the application. It also
 * helps to combine reducers.
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from '../reducers';

const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore);

const combinedReducer = combineReducers(reducers);

export default function configureStore (initialState) {

    const store = finalCreateStore(combinedReducer, initialState);
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}