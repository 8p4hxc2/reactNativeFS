import React from 'react';
import { Text, View, Image, ScrollView, FlatList, Linking, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import randomizeItem from '../../actions/splashscreen';

const styles = {
    h1: {
        fontWeight: 'bold',
        fontSize: 30
    },
    h2: {
        fontWeight: 'bold',
        fontSize: 40
    },
    infosItem: {
        width: 150,
        height: 75,
        borderRightWidth: 1,
        borderRightColor: 'red'
    }
}

const But = (item) => {
    //console.log(item);
    return (<View><Image />
        <Text>{item.key}</Text></View>);
};

class Home extends React.Component {
    render() {
        const { random, dispatch } = this.props;
        const { h1, h2, infosItem } = styles;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ScrollView>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text style={h1}>Bienvenue !</Text>
                        <Text>à Disneyland Paris</Text>
                    </View>
                    <Text style={h2} numberOfLines={2} onPress={() => { Linking.openURL('https://google.com'); }}>Information et accès aux Parcs</Text>
                    <FlatList horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={[{ key: 'Title 1' }, { key: 'Title 2' }, { key: 'Title 3' }, { key: 'Title 4' }, { key: 'Title 5' }]}
                        renderItem={({ item }) => <TouchableWithoutFeedback style={infosItem}>
                            <But item={item} />
                        </TouchableWithoutFeedback>}
                    />
                    <Text></Text>
                </ScrollView>
            </View >
        );
    }
}

const mapStateToProps = (state) => ({
    random: state.a.number
})

export default connect(mapStateToProps)(Home);
