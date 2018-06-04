import React from 'react';
import { Text, View, Image, ScrollView, FlatList, Linking, TouchableWithoutFeedback } from 'react-native';
import Hr from '../../components/hr';
import { connect } from 'react-redux';
import randomizeItem from '../../actions/splashscreen';

const styles = {
    h1: {
        fontWeight: 'bold',
        fontSize: 18
    },
    h2: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    infosItem: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: 'red'
    }
}

class Home extends React.Component {
    render() {
        const { random, dispatch } = this.props;
        const { h1, h2, infosItem } = styles;

        return (
            <View style={{ paddingTop: 30, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ alignItems: 'center', flex: 1, marginTop: 30, marginBottom: 30 }}>
                        <Text style={h1}>Bienvenue !</Text>
                        <Text>à Disneyland Paris</Text>
                    </View>
                    <Hr title='Information et accès aux Parcs' width={200} />
                    <FlatList horizontal={true}
                        style={{ flex: 1, flexDirection: 'row' }}
                        showsHorizontalScrollIndicator={false}
                        data={[{ key: '1', title: 'Horaire des spectacles du jour' }, { key: '2', title: 'Horaires des parcs' }, { key: '3', title: 'Acheter des billets' }, { key: '4', title: 'Appelez pour acheter vos billets' }, { key: '5', title: 'Réserver une table' }]}
                        renderItem={({ item }) => {
                            return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100, width: 150, ...item.key !== '5' ? { borderRightWidth: 1 } : {} }}>
                                <Text numberOfLines={1} style={{ textAlign: 'center' }}>{item.title}</Text></View>)
                        }
                        }
                    />
                    <Hr title='Lumière sur' />
                    <View style={{ height: 400, flex: 1 }}>
                        <View style={{ borderWidth: 1, margin: 25, flex: 1, borderRadius: 5 }}>
                            <Image resizeMode={'cover'}
                                style={{ width: '100%', height: 200 }}
                                source={{ uri: 'http://www.univers-series.com/wp-content/uploads/2017/02/Walt_disney_pictures-750x400.jpg' }} />
                            <Text  onPress={()=>{this.props.navigation.navigate('About')}} style={{
                                fontWeight: 'bold',
                                fontSize: 24
                            }}>Fêtez notre 25e Anniversaire avec des étoiles plein les yeux !</Text>
                            <Text>En savoir plus ></Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'lightgray', height: 50, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex: 1, textAlign: 'center', color: 'blue' }}>A propos & Réglement</Text>
                        <Text style={{ flex: 1, textAlign: 'center', color: 'blue' }}>Mentions légales</Text>
                    </View>
                </ScrollView>
            </View >
        );
    }
}

const mapStateToProps = (state) => ({
    random: state.a.number
})

export default connect(mapStateToProps)(Home);
