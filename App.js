import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Splashscreen, Home } from './screens';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import { View, StatusBar, Button, TouchableOpacity, Text, Animated, Image, Easing, Icon, ScrollView, FlatList, Platform } from 'react-native';

// reducers
const aReducer = (state = { number: 0 }, actions) => {
    switch (actions.type) {
        case 'RANDOMIZE_ITEM':
            return { ...state, number: Math.random() };
    }
    return state;
};

// store creation
const store = createStore(
    combineReducers({ a: aReducer })
);

/*class Splashscreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Splashscreen33</Text>
            </View>
        );
    }
}*/


const AppNavigator = createStackNavigator(
    {
        Splashscreen: { screen: Splashscreen },
        Home: { screen: Home,headerMode: 'none' }
    },
    {
        // Default config for all screens
        headerMode: 'none',
        title: 'Main',
        initialRouteName: 'Splashscreen'
    }
);

const ReduxApp = connect((state) => (state))(AppNavigator);



export default () => (
    <Provider store={store}>
        <ReduxApp />
    </Provider>
);

