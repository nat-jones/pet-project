import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Icon } from "native-base";
import { Actions } from "react-native-router-flux";
import { NAV_BAR_HEIGHT } from '../layoutConsts';

const windowWidth = Dimensions.get('window').width;
const passiveOptionWidth = windowWidth * .18;
const activeOptionWidth = windowWidth * .28;
console.log(windowWidth);


export default function NavBar(props) {

    const anims = {
        home: useRef(new Animated.Value(activeOptionWidth)).current,
        pet: useRef(new Animated.Value(passiveOptionWidth)).current,
        shop: useRef(new Animated.Value(passiveOptionWidth)).current,
        friends: useRef(new Animated.Value(passiveOptionWidth)).current,
        games: useRef(new Animated.Value(passiveOptionWidth)).current,
    };

    const [lastExpanded, setLastExpanded] = useState('home');

    useEffect(() => {
        if (props.activePage !== lastExpanded) {
            changePage(props.activePage)
        }
    })

    const iconStyle = (page) => page === props.activePage ? styles.activeIcon : styles.passiveIcon

    const changePage = async (newPage) => {
        console.log('changePage(' + newPage + ')');
        if (newPage === lastExpanded) {
            return;
        }

        shrink(lastExpanded);
        expand(newPage);
        setLastExpanded(newPage);
        newPage !== props.activePage && props.setActivePage(newPage);

    }

    const expand = (animation) => {
        Animated.timing(anims[animation], {
            toValue: activeOptionWidth,
            duration: 100,
            useNativeDriver: false,
        }).start();
    };

    const shrink = (animation) => {

        Animated.timing(anims[animation], {
            toValue: passiveOptionWidth,
            duration: 100,
            useNativeDriver: false,
        }).start();
    };

    return (

        <View style={styles.barWrapper}>
            <TouchableWithoutFeedback onPress={() => changePage('pet')}>
                <Animated.View
                    style={[styles.barOption, { width: anims.pet }]}

                >

                    <Icon
                        type="MaterialCommunityIcons"
                        name="dog"
                        style={iconStyle('pet')}
                    />

                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => changePage('games')}>
                <Animated.View
                    style={[styles.barOption, { width: anims.games }]}

                >
                    <Icon type="FontAwesome5" name="dice" style={iconStyle('games')} />

                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => changePage('home')}>
                <Animated.View
                    style={[styles.barOption, { width: anims.home }]}
                >
                    <Icon type="FontAwesome5" name="home" style={iconStyle('home')} />
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => changePage('shop')}>
                <Animated.View
                    style={[styles.barOption, { width: anims.shop }]}
                >
                    <Icon type="FontAwesome5" name="coins" style={iconStyle('shop')} />

                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {
                changePage('friends')

            }
            }>
                <Animated.View
                    style={[styles.barOption, { width: anims.friends }]}
                >
                    <Icon
                        type="FontAwesome5"
                        name="user-friends"
                        style={iconStyle('friends')}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>


        </View >
    );
}

const styles = StyleSheet.create(
    {
        barWrapper: {
            width: "100%",
            height: NAV_BAR_HEIGHT,
            position: "absolute",
            bottom: 0,
            left: 0,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center"
        },
        barOption: {
            height: "100%",
            borderColor: "#ffe866",
            borderLeftWidth: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "#ffd700"
        },
        activeBarOption: {
            width: '28%',

        },
        passiveBarOption: {
            width: '18%',

        },
        passiveIcon: {
            color: "#998200",
            marginTop: 20
        },
        activeIcon: {
            color: '#ffec80',
            marginTop: 20
        }
    }
)