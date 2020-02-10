import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebase from "firebase";
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { emphasize } from '@material-ui/core';

const firebaseConfig = {
    apiKey: "AIzaSyA5tM4PcANnpIJk-vYnYnL-q26QBhZR4zk",
    authDomain: "polished-leaf-256709.firebaseapp.com",
    databaseURL: "https://polished-leaf-256709.firebaseio.com",
    projectId: "polished-leaf-256709",
    storageBucket: "polished-leaf-256709.appspot.com",
    messagingSenderId: "766279430691",
    appId: "1:766279430691:web:153ad2000da94cc7617796",
    measurementId: "G-6M2NQ68H20"
};

// Initialize Firebase
let fireapp;

try {
    fireapp = firebase.initializeApp(firebaseConfig);
    firebase.analytics();
} catch (error) {
    console.log(error.message);
}

export default fireapp;

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
    login : false,
    articles : [],
    userid : 'annonymous',
    email : ''
}

const persistConfig = {
    key: 'primary',
    storage,
    whitelist: ['login', 'articles', 'userid', 'email'], // place to select which state you want to persist
  }
  
const persistedReducer = persistReducer(persistConfig, reducer)
  

// initStore function
function initStore(state = initial) {
    return createStore(persistedReducer, state,
        composeWithDevTools(applyMiddleware()));}

export { initStore };