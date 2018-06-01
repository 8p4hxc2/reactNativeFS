import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import createSagaMiddleware, { delay } from 'redux-saga';
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import React, { Component } from 'react';
import { View, StatusBar, Button } from 'react-native';

StatusBar.setHidden(true);

// reducers
const aReducer = (state = {}, actions) => {
    switch (actions.type) {
        case 'FETCH_JSON_SUCCESS':
            return { ...state, json: actions.json };;

        case 'RANDOMIZE_ITEM_SUCCESS':
            return { ...state, number: actions.number };
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

// api
async function apiFetchJson() {
    return await fetch('https://jsonplaceholder.typicode.com/posts/1');
}

// actions creator
const addObject = (title) => ({ type: 'ADD_OBJECT', title });
const randomizeItem = (index) => ({ type: 'RANDOMIZE_ITEM', index });
const fetchJsonFromWeb = (index) => ({ type: 'FETCH_JSON', index });

// custom middleware
const logger = (store) => {
    const rawDispatcher = store.dispatch;
    return (action) => {
        console.log('state before action ' + action.type, store.getState());
        const returnValue = rawDispatcher(action);
        console.log('state after action ' + action.type, store.getState());
        return returnValue;
    };
};

// redux saga middleware
function* fetchRandom(action) {
    try {
        yield delay(1000);
        const randomNumber = Math.random();
        yield put({ type: "RANDOMIZE_ITEM_SUCCESS", number: randomNumber });
    }
    catch (e) {
        yield put({ type: "RANDOMIZE_ITEM_FAIL" });
    }
}

function* fetchJson(action) {
    console.log("fetchJson");
    try {
        const result = yield call(apiFetchJson);
        yield put({ type: "FETCH_JSON_SUCCESS", json: result.url });
    }
    catch (e) {
        yield put({ type: "FETCH_JSON_FAIL" });
    }
}

function* aSaga() {
    yield all([
        takeEvery("RANDOMIZE_ITEM", fetchRandom),
        takeEvery("FETCH_JSON", fetchJson)
    ]);
}

const sagaMw = createSagaMiddleware();

// store creation
const store = createStore(
    combineReducers({ a: aReducer, b: bReducer }),
    { a: {}, b: {} },
    applyMiddleware(sagaMw)
);

// custom apply middlewares
store.dispatch = logger(store);

// run saga
sagaMw.run(aSaga);


// entry point component
class App extends Component {
    render() {
        const { a, dispatch } = this.props;

        return (
            <View>
                <Button
                    onPress={() => { dispatch(randomizeItem()); }}
                    title={'' + a.number}>
                </Button>

                <Button
                    onPress={() => { dispatch(fetchJsonFromWeb()); }}
                    title={'' + a.json}>
                </Button>
            </View>
        );
    };
};

// use the connect helper from redux that will enable the update of App when the redux store is updated
// fix some issue with double render when doing the subscribe on the store ourself
const ReduxApp = connect((state) => (state))(App);

export default () => (
    <Provider store={store}>
        <ReduxApp />
    </Provider>
);