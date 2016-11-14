import {
    SET_LOADING
} from '../helpers/constants';
import createReducer from '../helpers/create-reducer';

const initialState = {

};

const actionHandlers = {
    [SET_LOADING]: (state, action) =>  ({
        loading: action.loading
    })
};

export default createReducer(initialState, actionHandlers);