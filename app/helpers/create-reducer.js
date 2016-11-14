import {CLEAR_MESSAGES} from './constants';

export default function createReducer(initialState, actionHandlers) {
    return (state = initialState, action) => {
        if (action.type === CLEAR_MESSAGES) {
            state = initialState
        }
        const reduceFn = actionHandlers[action.type];
        if(!reduceFn) {
            return state;
        }
        return { ...state, ...reduceFn(state, action) };
    };
}