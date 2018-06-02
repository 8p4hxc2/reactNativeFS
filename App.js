import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import createSagaMiddleware, { delay } from 'redux-saga';
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import React, { Component } from 'react';
import { View, StatusBar, Button, TouchableOpacity, Text, Animated, Image, Easing, Icon } from 'react-native';

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

// styles
const styles = {
    container: {
        width: '50px',
        height: '300px'
    },
    circle: {
    }
}

// entry point component
class App extends Component {
    constructor() {
        super();
        this.spinValue = new Animated.Value(0);
        this.slideValue = new Animated.Value(0);
    }

    componentDidMount() {
        //this.spin();
        this.slide();
    }

    spin() {
        this.spinValue.setValue(0);
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear
            }
        ).start((o) => { if (o.finished) { this.slide(); } })
    }

    slide() {
        this.slideValue.setValue(0);
        Animated.timing(
            this.slideValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear
            }
        ).start((o) => { if (o.finished) { this.spin(); } })
    }

    render() {
        const { a, dispatch } = this.props;
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        const slide = this.slideValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 360]
        });

        return (
            <View>
                <Animated.View
                    style={{
                        width: 227,
                        height: 200,
                        backgroundColor: 'green',
                        transform: [{ translateX: slide }]
                    }}
                    source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }}
                />
                <TouchableOpacity onPress={() => {
                    this.stopped = !this.stopped;

                    if (this.stopped) {
                        Animated.timing(
                            this.spinValue
                        ).stop();
                    }
                    else {
                        this.spin();
                    }
                }} style={{ backgroundColor: 'red', height: 100, marginTop: 10 }}>
                    <Text>MyA button</Text>
                </TouchableOpacity>
                <Button
                    style={styles}
                    rounded
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