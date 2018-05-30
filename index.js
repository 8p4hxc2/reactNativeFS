const createStore = require('redux').createStore;
const combineReducers = require('redux').combineReducers;

// reducers
const aReducer = (state = [], actions) => {
    switch (actions.type) {
        case 'ADD_OBJECT':
            return state.concat([actions.title + ' in a']);
    }
    return state;
};

const bReducer = (state = [], actions) => {
    switch (actions.type) {
        case 'ADD_OBJECT':
            return state.concat([actions.title + ' in b']);
    }
    return state;
};

// actions creator
const addObject = (title) => ({ type: 'ADD_OBJECT', title });

const store = createStore(combineReducers({ a: aReducer, b: bReducer }));

store.dispatch(addObject('a title'));
console.log(store.getState());
