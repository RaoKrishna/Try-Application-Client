import {
    LOG_IN,
    LOG_IN_ERROR_MSG
} from '../helpers/constants';
import createReducer from '../helpers/create-reducer';

const initialState = {

};

const actionHandlers = {
    [LOG_IN]: (state, action) =>  ({
        loggedIn: true,
        accessToken: action.token,
        isAuthenticated: action.isAuthenticated
    }),
    [LOG_IN_ERROR_MSG]: (state, action) =>  ({
        errorMessage: action.message
    })
};

export default createReducer(initialState, actionHandlers);