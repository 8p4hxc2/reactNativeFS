import React from 'react';
import { Text, View } from 'react-native';

const Hr = (props) => (<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 2, marginRight: 2 }}>
    <View style={{
        flex: 1,
        height: 1,
        marginLeft:5,
        backgroundColor: 'black'
    }} />
    <Text style={{
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15,
        ... props.width ? {width: props.width} : {}
    }} onPress={() => { Linking.openURL('https://google.com'); }}>{props.title || 'test'}</Text>
    <View style={{
        flex: 1,
        height: 1,
        marginRight:5,
        backgroundColor: 'black'
    }} />
</View>);

export default Hr;