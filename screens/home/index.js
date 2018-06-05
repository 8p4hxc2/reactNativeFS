import React from 'react';
import { Text, View, Image, ScrollView, FlatList, Linking, TouchableWithoutFeedback, Animated, PanResponder, Dimensions, StatusBar } from 'react-native';
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
    constructor() {
        super();
        this.state = {
            test: new Animated.ValueXY(),
            pan: new Animated.ValueXY(),
            scroll: true
        };
    }

    componentWillMount() {
        // Add a listener for the delta value change
        this._val = { x: 0, y: 0 }
        this.state.pan.addListener((value) => this._val = value);
        // Initialize PanResponder with move handling
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => {
                return true;
            },
            onPanResponderMove: Animated.event([
                null, { dx: 0, dy: this.state.pan.y }
            ]),
            onPanResponderGrant: (e, gestureState) => {

                console.log(this.state.pan.y._value);
                // Set the initial value to the current state
                //let y = (this.state.pan.y._value < 0) ? 0 : this.state.pan.y._value;


                this.state.pan.setOffset({ x: 0, y: this.state.pan.y._value });
                this.state.pan.setValue({ x: 0, y: 0 });


            },
            onPanResponderRelease: (e, gesture) => {
                // slide down
                if (this.state.pan.y._value > 0) {
                    if (this.state.pan.y._value < 200) {
                        Animated.spring(this.state.pan, {
                            toValue: { x: 0, y: 0 },
                            friction: 5
                        }).start();
                    }
                    else {
                        //this.setState({ scroll: false });
                        Animated.spring(this.state.pan, {
                            toValue: { x: 0, y: Dimensions.get('window').height - 80 },
                        }).start();
                    }
                }
                else {
                    this.state.pan.setOffset({ x: 0, y: 0 });
                    this.state.pan.setValue({ x: 0, y: Dimensions.get('window').height - 80 + this.state.pan.y._value });
                    if (this.state.pan.y._value > 200) {
                        Animated.spring(this.state.pan, {
                            toValue: { x: 0, y: Dimensions.get('window').height - 80 },
                            friction: 5
                        }).start();
                    }
                    else {
                        Animated.spring(this.state.pan, {
                            toValue: { x: 0, y: 0 },
                            friction: 5
                        }).start();
                        //this.setState({ scroll: true });
                    }
                }
            }
        });

        //this.state.pan.setOffset({ x: 0, y: Dimensions.get('window').height / 2 });
        this.state.pan.setValue({ x: 0, y: 0 });
    }

    render() {
        const { random, dispatch } = this.props;
        const { h1, h2, infosItem } = styles;
        const wHeight = Dimensions.get('window').height;
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
        };

        //<View style={{ flex:1, backgroundColor: 'green' }}></View>
        //position: 'absolute',
        // paddingTop: StatusBar.currentHeight, 
        return (
            <View>
                <Animated.View style={[panStyle, { alignItems: 'center', justifyContent: 'center' }]}>
                    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                        <View>
                            <View
                                {...this.panResponder.panHandlers}
                                style={{ alignItems: 'center', backgroundColor: '#4286f4', height: 75, width: 75, borderRadius: 50 }} />
                            <View style={{ flex: 1 }}>
                                <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 30 }}>
                                    <Text style={h1}>Bienvenue !</Text>
                                    <Text>à Disneyland Paris</Text>
                                </View>
                                <Hr title='Information et accès aux Parcs' width={200} />
                                <FlatList horizontal={true}
                                    style={{ flexDirection: 'row' }}
                                    showsHorizontalScrollIndicator={false}
                                    data={[{ key: '1', title: 'Horaire des spectacles du jour' }, { key: '2', title: 'Horaires des parcs' }, { key: '3', title: 'Acheter des billets' }, { key: '4', title: 'Appelez pour acheter vos billets' }, { key: '5', title: 'Réserver une table' }]}
                                    renderItem={({ item }) => {
                                        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100, width: 150, ...item.key !== '5' ? { borderRightWidth: 1 } : {} }}>
                                            <Text numberOfLines={1} style={{ textAlign: 'center' }}>{item.title}</Text></View>)
                                    }
                                    }
                                />
                                <Hr title='Lumière sur' />
                                <View>
                                    <View style={{ borderWidth: 1, margin: 25, borderRadius: 5 }}>
                                        <Image resizeMode={'cover'}
                                            style={{ width: '100%', height: 200 }}
                                            source={{ uri: 'http://www.univers-series.com/wp-content/uploads/2017/02/Walt_disney_pictures-750x400.jpg' }} />
                                        <Text onPress={() => { this.props.navigation.navigate('About') }} style={{
                                            fontWeight: 'bold',
                                            fontSize: 24
                                        }}>Fêtez notre 25e Anniversaire avec des étoiles plein les yeux !</Text>
                                        <Text>En savoir plus ></Text>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: 'lightgray', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ flex: 1, textAlign: 'center', color: 'blue' }}>A propos & Réglement</Text>
                                    <Text style={{ flex: 1, textAlign: 'center', color: 'blue' }}>Mentions légales</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </Animated.View >
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    random: state.a.number
})

export default connect(mapStateToProps)(Home);
