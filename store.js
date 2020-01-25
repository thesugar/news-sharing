import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// reducer
function reducer (state = initial, action) {
    switch (action.type){
        // dummy
        case 'UPDATE_USER':
            return action.value;
        // default
        default:
            return state;
    }
}

const initial = { 
    articles : []
}

// initStore function
function initStore(state = initial) {
    return createStore(reducer, state,
        applyMiddleware(thunkMiddleware));}

export { initStore };