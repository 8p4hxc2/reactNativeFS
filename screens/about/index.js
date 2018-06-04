import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import randomizeItem from '../../actions/splashscreen';

class Home extends React.Component {
    render() {
        const { random, dispatch } = this.props;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text onPress={() => { dispatch(randomizeItem()); }}>Home {random}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    random: state.a.number
})

export default connect(mapStateToProps)(Home);
