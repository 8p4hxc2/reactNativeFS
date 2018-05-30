const createStore = require('redux').createStore;
const combineReducers = require('redux').combineReducers;

// reducers
const aReducer = (state = [], actions) => {
    switch (actions.type) {
        case 'ADD_OBJECT':
            return [...state, actions.title + ' in a'];

        case 'RANDOMIZE_ITEM':
            return [...state, Math.random()];
    }
    return state;
};

const bReducer = (state = [], actions) => {
    switch (actions.type) {
        case 'ADD_OBJECT':
            return [...state, actions.title + ' in b'];
    }
    return state;
};

// actions creator
const addObject = (title) => ({ type: 'ADD_OBJECT', title });
const randomizeItem = (index) => ({ type: 'RANDOMIZE_ITEM', index });

// middleware
const logger = (store) => {
    const rawDispatcher = store.dispatch;
    return (action) => {
        console.log('state before action ' + action.type, store.getState());
        const returnValue = rawDispatcher(action);
        console.log('state after action ' + action.type, store.getState());
        return returnValue;
    };
};

const store = createStore(
    combineReducers({ a: aReducer, b: bReducer }),
    { a: ['initial value in a'], b: ['initial value in b'] }
);

store.dispatch = logger(store);

store.dispatch(addObject('a title'));
store.dispatch(randomizeItem());