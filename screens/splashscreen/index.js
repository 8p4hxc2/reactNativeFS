import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import randomizeItem from '../../actions/splashscreen';
import { StackActions, NavigationActions } from 'react-navigation';

class Splashscreen extends React.Component {
    gotoHome() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        const { random, dispatch } = this.props;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text onPress={() => { this.gotoHome(); }}>Splashscreen {random}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    random: state.a.number
})

export default connect(mapStateToProps)(Splashscreen);
